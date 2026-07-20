/**
 * 사용자 취향·필터와 주택 생활권 데이터를 매칭해 점수 계산
 */

const INFRA_KEYS = ['cafe', 'gym', 'culture', 'mart']

const LIFESTYLE_TO_INFRA = {
  startup: ['transit', 'cafe'],
  leisure: ['gym', 'nature'],
  shopping: ['mart', 'cafe'],
  culture: ['culture', 'cafe'],
  nature: ['nature'],
  transit: ['transit']
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n))
}

/**
 * @param {object} housing
 * @param {object} prefs
 * @returns {{ score: number, reasons: string[] }}
 */
export function scoreHousing(housing, prefs) {
  const reasons = []
  let score = 0
  let weightSum = 0

  // 1) 인프라 가중치 (카페/헬스/문화/마트)
  const weights = prefs.infraWeights || {}
  INFRA_KEYS.forEach((key) => {
    const w = (weights[key] ?? 50) / 100
    const v = housing.infra[key] ?? 50
    score += v * w
    weightSum += w
  })

  // 자연·교통도 라이프스타일 선택 시 반영
  const tags = prefs.lifestyles || []
  if (tags.length) {
    let lifeScore = 0
    tags.forEach((tag) => {
      const keys = LIFESTYLE_TO_INFRA[tag] || []
      keys.forEach((k) => {
        lifeScore += housing.infra[k] ?? 50
      })
      if (housing.lifestyleTags?.includes(tag)) {
        lifeScore += 12
      }
    })
    const lifeAvg = lifeScore / Math.max(1, tags.length * 2)
    score += lifeAvg * 0.9
    weightSum += 0.9
    reasons.push(`선택하신 라이프스타일과 생활권 패턴이 잘 맞습니다`)
  }

  let base = weightSum > 0 ? score / weightSum : 50

  // 2) 하드 필터 페널티/보너스
  if (prefs.districts?.length && !prefs.districts.includes(housing.district)) {
    return { score: 0, reasons: ['선택 지역 외'], filtered: true }
  }

  if (prefs.eligibility?.length) {
    const ok = prefs.eligibility.some((e) => housing.eligibility.includes(e))
    if (!ok) return { score: 0, reasons: ['자격 조건 불일치'], filtered: true }
  }

  if (prefs.types?.length && !prefs.types.includes(housing.type)) {
    return { score: 0, reasons: ['주택 유형 불일치'], filtered: true }
  }

  const depMax = prefs.depositMax ?? 5000
  if (housing.depositMin > depMax) {
    return { score: 0, reasons: ['보증금 범위 초과'], filtered: true }
  }
  if (housing.depositMax <= depMax * 0.7) {
    base += 3
    reasons.push('희망 보증금 대비 부담이 낮은 편입니다')
  }

  const areaMin = prefs.areaMin ?? 0
  const areaMax = prefs.areaMax ?? 100
  const overlap = housing.areaMax >= areaMin && housing.areaMin <= areaMax
  if (!overlap) {
    return { score: 0, reasons: ['면적 범위 불일치'], filtered: true }
  }

  // 3) 출퇴근
  if (prefs.commuteHub && prefs.commuteMinutes) {
    const mins = housing.commuteMinutes?.[prefs.commuteHub]
    if (typeof mins === 'number') {
      if (mins > prefs.commuteMinutes) {
        base -= (mins - prefs.commuteMinutes) * 0.8
      } else {
        base += 6
        reasons.push(`${prefs.commuteHubLabel || '기준지'}까지 약 ${mins}분 권입니다`)
      }
    }
  }

  // 4) 인프라 상위 항목 이유
  const topInfra = INFRA_KEYS
    .map((k) => ({ k, v: housing.infra[k], w: weights[k] ?? 50 }))
    .sort((a, b) => b.w - a.w || b.v - a.v)[0]
  if (topInfra && topInfra.w >= 60) {
    const labels = { cafe: '카페·베이커리', gym: '피트니스', culture: '문화공간', mart: '대형마트' }
    reasons.push(`${labels[topInfra.k]} 밀집도가 높은 생활권입니다 (${topInfra.v}점)`)
  }

  if (housing.status === 'open') {
    base += 2
  } else if (housing.status === 'closed') {
    base -= 8
  }

  const finalScore = Math.round(clamp(base, 0, 99))
  if (!reasons.length) {
    reasons.push(housing.summary)
  }

  return { score: finalScore, reasons: reasons.slice(0, 3), filtered: false }
}

/**
 * @param {Array} housings
 * @param {object} prefs
 * @returns {Array}
 */
export function rankHousings(housings, prefs) {
  return housings
    .map((h) => {
      const result = scoreHousing(h, prefs)
      return { ...h, matchScore: result.score, matchReasons: result.reasons, filtered: result.filtered }
    })
    .filter((h) => !h.filtered && h.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)
}

/**
 * 히트맵 존 강도 (0~1)
 */
export function zoneIntensity(zone, prefs) {
  const w = prefs.infraWeights || {}
  const map = {
    cafe: w.cafe ?? 50,
    gym: w.gym ?? 50,
    culture: w.culture ?? 50,
    mart: w.mart ?? 50,
    nature: Math.max(w.cafe ?? 0, (prefs.lifestyles || []).includes('nature') ? 80 : 40),
    transit: (prefs.lifestyles || []).includes('transit') ? 85 : 50
  }
  return clamp((map[zone.focus] ?? 50) / 100, 0.15, 1)
}
