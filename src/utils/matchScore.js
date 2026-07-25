/**
 * 사용자 취향·필터와 주택 생활권 데이터를 매칭해 점수 계산
 */
import { LIFESTYLE_TAGS } from '../data/mockHousings'

const TAG_LABELS = LIFESTYLE_TAGS.reduce((acc, t) => {
  acc[t.id] = t.label
  return acc
}, {})

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n))
}

/** 경쟁률(낮을수록 좋음, 대략 1~10배 범위)을 0~99점으로 환산. 정보 없으면 중립값 */
export function competitionScore(housing) {
  const rate = housing.competitionRate
  if (rate == null) return 50
  return Math.round(clamp(110 - rate * 10, 5, 99))
}

/** 경쟁률 등급: 3:1 미만 낮음 / 3~6:1 보통 / 6:1 초과 높음 */
export function competitionLevel(housing) {
  const rate = housing.competitionRate
  if (rate == null) return null
  if (rate < 3) return 'low'
  if (rate <= 6) return 'mid'
  return 'high'
}

export const COMPETITION_LEVEL_LABEL = { low: '낮음', mid: '보통', high: '높음' }

/** 태그 하나에 대한 주택의 점수. 'lowCompetition'은 인프라가 아니라 경쟁률 기반 */
export function tagScore(housing, tag) {
  if (tag === 'lowCompetition') return competitionScore(housing)
  return housing.infra?.[tag] ?? 50
}

/**
 * @param {object} housing
 * @param {object} prefs
 * @returns {{ score: number, reasons: string[] }}
 */
export function scoreHousing(housing, prefs) {
  const reasons = []
  const tags = prefs.lifestyles || []
  const infra = housing.infra || {}

  // 1) 선택한 조건(태그) 기준 평균 점수. 선택 없으면 전체 인프라 평균
  let base
  if (tags.length) {
    const vals = tags.map((tag) => tagScore(housing, tag))
    base = vals.reduce((a, b) => a + b, 0) / vals.length
    reasons.push('선택하신 조건과 생활권 인프라가 잘 맞습니다')
  } else {
    const allVals = Object.values(infra)
    base = allVals.length ? allVals.reduce((a, b) => a + b, 0) / allVals.length : 50
  }

  // 2) 하드 필터 페널티/보너스
  if (tags.includes('lowCompetition') && housing.competitionRate == null) {
    return { score: 0, reasons: ['경쟁률 정보 없음'], filtered: true }
  }

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

  // 4) 선택 조건 중 가장 우수한 항목을 이유로 표시
  if (tags.length) {
    const top = tags
      .map((tag) => ({ tag, v: tagScore(housing, tag) }))
      .sort((a, b) => b.v - a.v)[0]
    if (top && top.v >= 70) {
      if (top.tag === 'lowCompetition') {
        reasons.push('상대적으로 경쟁률이 낮은 편입니다')
      } else {
        reasons.push(`${TAG_LABELS[top.tag] || top.tag} 조건이 특히 우수한 생활권입니다 (${top.v}점)`)
      }
    }
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
 * 히트맵 존 강도 (0~1). 선택한 조건(태그)에 해당하는 존은 진하게, 아니면 기본값
 */
export function zoneIntensity(zone, prefs) {
  const tags = prefs.lifestyles || []
  const intensity = tags.includes(zone.focus) ? 0.85 : 0.4
  return clamp(intensity, 0.15, 1)
}