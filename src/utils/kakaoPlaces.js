/**
 * 선택된 취향 태그를 카카오 장소검색(카테고리/키워드)으로 매핑해
 * 실제 위치의 상권 데이터를 가져옵니다. (지도 SDK의 services 라이브러리 사용,
 * REST 직접호출이 아니라서 CORS 문제 없음)
 */
import { loadKakaoMap } from './loadKakaoMap'

/** 태그 → 카카오 카테고리 그룹코드 또는 키워드. 카테고리 코드가 없는 업종은 키워드 검색으로 대체 */
const TAG_SEARCH = {
  cafe: { type: 'category', code: 'CE7' },
  gym: { type: 'keyword', q: '헬스장' },
  culture: { type: 'category', code: 'CT1' },
  convenience: { type: 'category', code: 'CS2' },
  mart: { type: 'category', code: 'MT1' },
  hospital: { type: 'category', code: 'HP8' },
  market: { type: 'keyword', q: '전통시장' },
  transit: { type: 'category', code: 'SW8' },
  childcare: { type: 'category', code: 'PS3' },
  bank: { type: 'category', code: 'BK9' }
  // parking(주차 여유)은 건물 자체 데이터라 장소검색 대상에서 제외
}

/** 태그별 지도 마커 색상 (주택 핀 색상과 겹치지 않게) */
export const TAG_COLORS = {
  cafe: '#8B5E3C',
  gym: '#E23E57',
  culture: '#7B61FF',
  convenience: '#FF8A00',
  mart: '#2E86DE',
  hospital: '#EE4266',
  market: '#2E9E4F',
  transit: '#1B4965',
  childcare: '#00B8A9',
  bank: '#4A4E69'
}

function runSearch(maps, places, tag, center, radius) {
  const cfg = TAG_SEARCH[tag]
  if (!cfg) return Promise.resolve([])
  return new Promise((resolve) => {
    const callback = (data, status) => {
      if (status === maps.services.Status.OK) {
        resolve(data.map((d) => ({
          tag,
          name: d.place_name,
          lat: Number(d.y),
          lng: Number(d.x),
          distanceM: d.distance ? Number(d.distance) : null
        })))
      } else {
        resolve([])
      }
    }
    const opts = { location: center, radius, sort: maps.services.SortBy.DISTANCE }
    if (cfg.type === 'category') {
      places.categorySearch(cfg.code, callback, opts)
    } else {
      places.keywordSearch(cfg.q, callback, opts)
    }
  })
}

/**
 * @param {{lat:number, lng:number}} centerPoint 검색 중심(선택 주택)
 * @param {number} radiusM 검색 반경(도보권 미터)
 * @param {string[]} tags 선택된 취향 태그 id 목록
 * @param {number} perTag 태그당 최대 결과 수
 * @returns {Promise<Array>} tag/name/lat/lng/distanceM
 */
export async function searchNearbyByTags(centerPoint, radiusM, tags, perTag = 3) {
  const maps = await loadKakaoMap()
  const places = new maps.services.Places()
  const center = new maps.LatLng(centerPoint.lat, centerPoint.lng)
  const validTags = (tags || []).filter((t) => TAG_SEARCH[t])
  if (!validTags.length) return []

  const resultsByTag = await Promise.all(
    validTags.map((t) => runSearch(maps, places, t, center, radiusM))
  )

  const merged = []
  resultsByTag.forEach((list) => {
    list.slice(0, perTag).forEach((item) => merged.push(item))
  })
  return merged
}