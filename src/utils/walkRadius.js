/** 도보 생활권 반경 유틸 (평균 보행속도 ≈ 4.8km/h → 80m/분) */

export const WALK_SPEED_M_PER_MIN = 80

/** 도보 분 → 미터 */
export function walkMinutesToMeters(minutes) {
  const m = Number(minutes)
  const mins = Number.isFinite(m) && m > 0 ? m : 15
  return Math.round(mins * WALK_SPEED_M_PER_MIN)
}

/** "500m" | "1.2km" | 숫자 → 미터 */
export function parseDistMeters(dist) {
  if (typeof dist === 'number' && Number.isFinite(dist)) return dist
  if (dist == null) return null
  const s = String(dist).trim()
  const km = s.match(/^([\d.]+)\s*km$/i)
  if (km) return Math.round(parseFloat(km[1]) * 1000)
  const m = s.match(/^([\d.]+)\s*m$/i)
  if (m) return Math.round(parseFloat(m[1]))
  const n = Number(s.replace(/,/g, ''))
  return Number.isFinite(n) ? n : null
}

/** nearby를 도보 분 이내로 필터 */
export function filterNearbyByWalk(nearby, walkMinutes) {
  const maxM = walkMinutesToMeters(walkMinutes)
  return (nearby || []).filter((n) => {
    const d = parseDistMeters(n.dist)
    if (d == null) return false
    return d <= maxM
  })
}

export function formatWalkRadius(walkMinutes) {
  const meters = walkMinutesToMeters(walkMinutes)
  if (meters >= 1000) return `도보 ${walkMinutes}분 · 약 ${(meters / 1000).toFixed(1)}km`
  return `도보 ${walkMinutes}분 · 약 ${meters}m`
}