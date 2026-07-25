
const API_BASE = process.env.NODE_ENV === 'development' ? '/kakao-api' : 'https://dapi.kakao.com'
const TRANSIT_URL = `${API_BASE}/v2/routing/publictraffic`
const WALK_URL = `${API_BASE}/v2/routing/walk`

const TRANSIT_STATUS_LABEL = {
  STARTNODES_NULL: '출발지 주변에 대중교통으로 접근 가능한 지점이 없습니다',
  ENDNODES_NULL: '도착지 주변에 대중교통으로 접근 가능한 지점이 없습니다',
  EQUAL_POINTS: '출발지와 도착지가 동일합니다',
  INVALID_REQUEST: '잘못된 요청입니다',
  NO_RESULTS: '대중교통 경로를 찾지 못했습니다'
}

const WALK_STATUS_LABEL = {
  SAME_POINT: '출발지와 도착지가 동일합니다',
  START_LINK_NOT_FOUND: '출발지 주변 도로를 찾을 수 없습니다',
  END_LINK_NOT_FOUND: '도착지 주변 도로를 찾을 수 없습니다',
  TOO_MANY_SEARCH_LINK: '경로 탐색 범위가 너무 넓습니다',
  TOO_FAR_AWAY: '출발지와 도착지가 너무 멀리 떨어져 있습니다',
  ROUTE_RESULT_NOT_FOUND: '도보 경로를 찾지 못했습니다'
}

function restKey() {
  return process.env.VUE_APP_KAKAO_REST_API_KEY
}

function authHeader() {
  return { Authorization: `KakaoAK ${restKey()}` }
}

/** 실패 응답 본문에서 카카오가 내려주는 실제 사유(message/msg)를 최대한 뽑아냄 */
async function readErrorBody(res) {
  try {
    const body = await res.json()
    return body?.message || body?.msg || JSON.stringify(body)
  } catch (e) {
    return ''
  }
}

function flattenPoints(pointArrays) {
  const points = []
  pointArrays.forEach((pts) => {
    (pts || []).forEach(([x, y]) => points.push({ lat: y, lng: x }))
  })
  return points
}

/**
 * 대중교통 경로 중 가장 빠른 경로를 조회
 * @returns {Promise<{totalTime:number, totalDistance:number, transfers:number, type:string, fare:number|null, steps:object[], points:object[]}|null>}
 */
export async function fetchTransitRoute(origin, destination) {
  if (!restKey()) throw new Error('REST API 키(VUE_APP_KAKAO_REST_API_KEY)가 설정되지 않았습니다.')

  const params = new URLSearchParams({
    start_x: String(origin.lng),
    start_y: String(origin.lat),
    end_x: String(destination.lng),
    end_y: String(destination.lat),
    s_name: origin.name || '출발',
    e_name: destination.name || '도착'
  })

  const res = await fetch(`${TRANSIT_URL}?${params.toString()}`, { headers: authHeader() })
  if (!res.ok) {
    const detail = await readErrorBody(res)
    throw new Error(`대중교통 경로 조회 실패 (HTTP ${res.status})${detail ? ` — ${detail}` : ''}`)
  }
  const data = await res.json()
  if (data.status !== 'OK') {
    throw new Error(TRANSIT_STATUS_LABEL[data.status] || `대중교통 경로 조회 실패 (${data.status})`)
  }
  if (!data.routes?.length) return null

  const best = [...data.routes].sort((a, b) => a.properties.totalTime - b.properties.totalTime)[0]

  return {
    totalTime: best.properties.totalTime,
    totalDistance: best.properties.totalDistance,
    transfers: best.properties.transfers,
    type: best.properties.type,
    fare: best.properties.fare?.value ?? null,
    steps: (best.steps || []).map((s) => ({
      type: s.properties.type,
      guidance: s.properties.guidance,
      time: s.properties.time,
      distance: s.properties.distance
    })),
    points: flattenPoints((best.steps || []).map((s) => s.path?.points))
  }
}

/**
 * 도보 경로 조회
 * @returns {Promise<{totalTime:number, totalDistance:number, points:object[]}|null>}
 */
export async function fetchWalkRoute(origin, destination) {
  if (!restKey()) throw new Error('REST API 키(VUE_APP_KAKAO_REST_API_KEY)가 설정되지 않았습니다.')

  const params = new URLSearchParams({
    start_x: String(origin.lng),
    start_y: String(origin.lat),
    end_x: String(destination.lng),
    end_y: String(destination.lat),
    s_name: origin.name || '출발',
    e_name: destination.name || '도착'
  })

  const res = await fetch(`${WALK_URL}?${params.toString()}`, { headers: authHeader() })
  if (!res.ok) {
    const detail = await readErrorBody(res)
    throw new Error(`도보 경로 조회 실패 (HTTP ${res.status})${detail ? ` — ${detail}` : ''}`)
  }
  const data = await res.json()
  if (data.status !== 'OK') {
    throw new Error(WALK_STATUS_LABEL[data.status] || `도보 경로 조회 실패 (${data.status})`)
  }
  if (!data.route) return null

  const legs = data.route.legs || []
  const pointArrays = []
  legs.forEach((leg) => {
    (leg.steps || []).forEach((step) => {
      if (step.path?.points) pointArrays.push(step.path.points)
    })
  })

  return {
    totalTime: data.route.properties.totalTime,
    totalDistance: data.route.properties.totalDistance,
    points: flattenPoints(pointArrays)
  }
}

/** 초 → "N분" / "N시간 M분" */
export function formatDuration(seconds) {
  if (seconds == null || !Number.isFinite(seconds)) return ''
  const mins = Math.round(seconds / 60)
  if (mins < 60) return `${mins}분`
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return m ? `${h}시간 ${m}분` : `${h}시간`
}