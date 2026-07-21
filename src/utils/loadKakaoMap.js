/** 카카오 지도 SDK 동적 로드 (`VUE_APP_KAKAO_MAP_KEY`) */

const SDK_URL = 'https://dapi.kakao.com/v2/maps/sdk.js'

let loadPromise = null

/**
 * 카카오 지도 SDK를 한 번만 로드하고 kakao.maps 네임스페이스를 반환합니다.
 * @returns {Promise<object>} kakao.maps
 */
export function loadKakaoMap() {
  if (typeof window !== 'undefined' && window.kakao?.maps?.LatLng) {
    return Promise.resolve(window.kakao.maps)
  }

  if (loadPromise) return loadPromise

  const appKey = process.env.VUE_APP_KAKAO_MAP_KEY
  if (!appKey) {
    return Promise.reject(
      new Error('VUE_APP_KAKAO_MAP_KEY가 없습니다. 프로젝트 루트 .env를 확인하세요.')
    )
  }

  loadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-kakao-maps]')
    if (existing) {
      existing.addEventListener('load', () => finish(resolve, reject))
      existing.addEventListener('error', () => reject(new Error('카카오 지도 SDK 로드 실패')))
      if (window.kakao?.maps) finish(resolve, reject)
      return
    }

    const script = document.createElement('script')
    script.src = `${SDK_URL}?autoload=false&appkey=${encodeURIComponent(appKey)}`
    script.async = true
    script.dataset.kakaoMaps = 'true'
    script.onload = () => finish(resolve, reject)
    script.onerror = () => {
      loadPromise = null
      reject(new Error('카카오 지도 SDK 로드 실패'))
    }
    document.head.appendChild(script)
  })

  return loadPromise
}

function finish(resolve, reject) {
  if (!window.kakao?.maps) {
    loadPromise = null
    reject(new Error('카카오 지도 SDK가 초기화되지 않았습니다.'))
    return
  }
  window.kakao.maps.load(() => resolve(window.kakao.maps))
}
