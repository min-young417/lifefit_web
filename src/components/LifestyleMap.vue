<template>
  <section class="map">
    <div class="map__toolbar">
      <label class="map__search">
        <span class="sr-only">주택명 검색</span>
        <input
          v-model="query"
          type="search"
          placeholder="주택명 검색"
          @input="$emit('query', query)"
        >
      </label>
      <div class="map__toggles">
        <button
          type="button"
          class="bmc-chip"
          :class="{ 'is-active': showHeat }"
          @click="showHeat = !showHeat"
        >
          생활권 히트맵
        </button>
        <button
          type="button"
          class="bmc-chip"
          :class="{ 'is-active': showFacilities }"
          @click="showFacilities = !showFacilities"
        >
          주변 시설
        </button>
      </div>
    </div>

    <div class="map__canvas">
      <div ref="mapEl" class="map__kakao" />

      <div v-if="loadError" class="map__error">
        <strong>지도를 불러오지 못했습니다</strong>
        <p>{{ loadError }}</p>
        <small>프로젝트 루트 .env에 VUE_APP_KAKAO_MAP_KEY를 넣고, 카카오 콘솔에 localhost:8080을 등록하세요.</small>
      </div>

      <div v-else-if="!mapReady" class="map__loading">
        지도 불러오는 중…
      </div>

      <div class="map__legend">
        <span><i class="dot heat" />생활권 적합 지역</span>
        <span><i class="dot walk" />도보 {{ walkMinutes }}분권</span>
        <span><i class="dot pin" />추천 주택</span>
        <span v-if="showFacilities"><i class="dot fac" />주변 시설</span>
      </div>
    </div>
  </section>
</template>

<script>
import { heatZones } from '../data/mockHousings'
import { zoneIntensity } from '../utils/matchScore'
import { loadKakaoMap } from '../utils/loadKakaoMap'
import {
  filterNearbyByWalk,
  parseDistMeters,
  walkMinutesToMeters
} from '../utils/walkRadius'

const BUSAN_CENTER = { lat: 35.1796, lng: 129.0756 }

/** 미터 오프셋 → lat/lng (부산 위도 기준 근사) */
function offsetLatLng(lat, lng, eastM, northM) {
  const dLat = northM / 111320
  const dLng = eastM / (111320 * Math.cos((lat * Math.PI) / 180))
  return { lat: lat + dLat, lng: lng + dLng }
}

export default {
  name: 'LifestyleMap',
  props: {
    housings: { type: Array, default: () => [] },
    prefs: { type: Object, default: () => ({}) },
    selected: { type: Object, default: null }
  },
  emits: ['select', 'query'],
  data() {
    return {
      query: '',
      showHeat: true,
      showFacilities: true,
      mapReady: false,
      loadError: '',
      /** 확대(가까이) 시 원형 오버레이 숨김 */
      circlesHiddenByZoom: false
    }
  },
  watch: {
    housings: {
      deep: true,
      handler() {
        this.refreshPins()
      }
    },
    selected(next) {
      this.refreshPins()
      this.refreshFacilities()
      this.refreshWalkCircle()
      if (next?.lat != null && next?.lng != null && this.map) {
        this.focusLivingArea(next)
      } else {
        this.clearWalkCircle()
      }
    },
    prefs: {
      deep: true,
      handler() {
        this.refreshHeat()
      }
    },
    'prefs.walkMinutes'() {
      this.refreshHeat()
      this.refreshFacilities()
      this.refreshWalkCircle()
      if (this.selected?.lat != null) this.focusLivingArea(this.selected)
    },
    showHeat() {
      this.applyCircleVisibility()
    },
    showFacilities() {
      this.refreshFacilities()
    }
  },
  mounted() {
    this.initMap()
  },
  computed: {
    walkMinutes() {
      return this.prefs?.walkMinutes || 10
    },
    walkRadiusM() {
      return walkMinutesToMeters(this.walkMinutes)
    }
  },
  beforeUnmount() {
    this.clearPins()
    this.clearHeat()
    this.clearFacilities()
    this.clearWalkCircle()
    this.map = null
    this.kakaoMaps = null
  },
  methods: {
    async initMap() {
      try {
        const maps = await loadKakaoMap()
        this.kakaoMaps = maps
        const center = new maps.LatLng(BUSAN_CENTER.lat, BUSAN_CENTER.lng)
        this.map = new maps.Map(this.$refs.mapEl, {
          center,
          level: 8
        })
        this.pinOverlays = new Map()
        this.heatCircles = []
        this.facilityOverlays = []
        this.walkCircle = null
        this.mapReady = true
        maps.event.addListener(this.map, 'zoom_changed', () => {
          this.onZoomChanged()
        })
        this.refreshHeat()
        this.refreshPins()
        this.refreshFacilities()
        this.refreshWalkCircle()
        this.onZoomChanged()
        if (this.selected?.lat != null) {
          this.focusLivingArea(this.selected)
        }
      } catch (err) {
        this.loadError = err?.message || String(err)
      }
    },

    /** level이 작을수록 확대. 가까이(≤4)면 히트/도보 원 숨김 */
    onZoomChanged() {
      if (!this.map) return
      const close = this.map.getLevel() <= 4
      if (close === this.circlesHiddenByZoom) {
        this.applyCircleVisibility()
        return
      }
      this.circlesHiddenByZoom = close
      this.applyCircleVisibility()
    },

    applyCircleVisibility() {
      const showHeat = this.showHeat && !this.circlesHiddenByZoom
      if (this.heatCircles) {
        this.heatCircles.forEach((c) => c.setMap(showHeat ? this.map : null))
      }
      if (this.walkCircle) {
        const showWalk = !this.circlesHiddenByZoom && !!this.selected
        this.walkCircle.setMap(showWalk ? this.map : null)
      }
    },

    /** 선택 주택 + 도보권 생활권이 보이도록 부드럽게 이동·확대 */
    focusLivingArea(housing) {
      if (!this.map || !this.kakaoMaps || housing?.lat == null || housing?.lng == null) return
      const maps = this.kakaoMaps
      const radiusM = this.walkRadiusM
      const points = [{ lat: housing.lat, lng: housing.lng }]

      filterNearbyByWalk(housing.nearby, this.walkMinutes).forEach((n) => {
        if (n.lat != null && n.lng != null) points.push({ lat: n.lat, lng: n.lng })
      })

      // 도보 반경 박스로 확대 범위 고정
      points.push(
        offsetLatLng(housing.lat, housing.lng, radiusM, radiusM),
        offsetLatLng(housing.lat, housing.lng, -radiusM, -radiusM)
      )

      const center = new maps.LatLng(housing.lat, housing.lng)
      const targetLevel = this.estimateLivingLevel(points, radiusM)
      const animate = { duration: 650 }

      if (typeof this.map.jump === 'function') {
        this.map.jump(center, targetLevel, { animate })
        return
      }

      const bounds = new maps.LatLngBounds()
      points.forEach((p) => bounds.extend(new maps.LatLng(p.lat, p.lng)))
      this.map.panTo(bounds, 56)
      this.map.setLevel(targetLevel, { anchor: center, animate })
    },

    /** 도보 반경·포인트 범위에 맞는 Kakao 지도 레벨 (작을수록 확대) */
    estimateLivingLevel(points, radiusM = 800) {
      const spanFromRadius = radiusM * 2
      let spanM = spanFromRadius
      if (points?.length) {
        let minLat = points[0].lat
        let maxLat = points[0].lat
        let minLng = points[0].lng
        let maxLng = points[0].lng
        points.forEach((p) => {
          minLat = Math.min(minLat, p.lat)
          maxLat = Math.max(maxLat, p.lat)
          minLng = Math.min(minLng, p.lng)
          maxLng = Math.max(maxLng, p.lng)
        })
        const dLatM = (maxLat - minLat) * 111320
        const dLngM = (maxLng - minLng) * 111320 * Math.cos((points[0].lat * Math.PI) / 180)
        spanM = Math.max(dLatM, dLngM, spanFromRadius)
      }
      if (spanM < 700) return 4
      if (spanM < 1200) return 5
      if (spanM < 2200) return 6
      if (spanM < 3500) return 7
      return 8
    },

    clearWalkCircle() {
      if (this.walkCircle) {
        this.walkCircle.setMap(null)
        this.walkCircle = null
      }
    },

    refreshWalkCircle() {
      if (!this.map || !this.kakaoMaps) return
      this.clearWalkCircle()
      if (!this.selected || this.selected.lat == null || this.selected.lng == null) return

      const maps = this.kakaoMaps
      this.walkCircle = new maps.Circle({
        center: new maps.LatLng(this.selected.lat, this.selected.lng),
        radius: this.walkRadiusM,
        strokeWeight: 2,
        strokeColor: '#1a7a8a',
        strokeOpacity: 0.55,
        strokeStyle: 'dashed',
        fillColor: '#2aa8bc',
        fillOpacity: 0.08
      })
      this.applyCircleVisibility()
    },

    clearPins() {
      if (!this.pinOverlays) return
      this.pinOverlays.forEach((overlay) => overlay.setMap(null))
      this.pinOverlays.clear()
    },

    refreshPins() {
      if (!this.map || !this.kakaoMaps) return
      const maps = this.kakaoMaps
      const ids = new Set(this.housings.map((h) => h.id))

      this.pinOverlays.forEach((overlay, id) => {
        if (!ids.has(id)) {
          overlay.setMap(null)
          this.pinOverlays.delete(id)
        }
      })

      this.housings.forEach((h) => {
        if (h.lat == null || h.lng == null) return
        const active = this.selected?.id === h.id
        const dim = this.selected && !active
        const content = this.buildPinContent(h, active, dim)

        let overlay = this.pinOverlays.get(h.id)
        if (overlay) {
          overlay.setContent(content)
          overlay.setPosition(new maps.LatLng(h.lat, h.lng))
          this.bindPinClick(content, h)
        } else {
          overlay = new maps.CustomOverlay({
            position: new maps.LatLng(h.lat, h.lng),
            content,
            yAnchor: 1,
            zIndex: active ? 20 : 10
          })
          overlay.setMap(this.map)
          this.pinOverlays.set(h.id, overlay)
          this.bindPinClick(content, h)
        }
        overlay.setZIndex(active ? 20 : 10)
      })
    },

    buildPinContent(housing, active, dim) {
      const el = document.createElement('button')
      el.type = 'button'
      el.className = 'kakao-pin'
      if (active) el.classList.add('is-active')
      if (dim) el.classList.add('is-dim')
      el.innerHTML = `
        <span class="kakao-pin__score">${housing.matchScore ?? 0}%</span>
        <span class="kakao-pin__halo"></span>
        <span class="kakao-pin__dot"></span>
      `
      return el
    },

    bindPinClick(el, housing) {
      el.onclick = (e) => {
        e.stopPropagation()
        this.$emit('select', housing)
      }
    },

    clearHeat() {
      if (!this.heatCircles) return
      this.heatCircles.forEach((c) => c.setMap(null))
      this.heatCircles = []
    },

    refreshHeat() {
      if (!this.map || !this.kakaoMaps) return
      this.clearHeat()
      const maps = this.kakaoMaps
      // 도보 10분(800m) 기준 → 입력 도보권에 비례해 빨간 원 반경 조절
      const walkScale = this.walkRadiusM / 800

      heatZones.forEach((z) => {
        const intensity = zoneIntensity(z, this.prefs)
        const base = z.radiusMeters * (0.55 + intensity * 0.45)
        const radius = Math.round(Math.max(280, base * walkScale))
        const circle = new maps.Circle({
          center: new maps.LatLng(z.lat, z.lng),
          radius,
          strokeWeight: 0,
          fillColor: '#ff6b4a',
          fillOpacity: 0.18 + intensity * 0.35
        })
        this.heatCircles.push(circle)
      })
      this.applyCircleVisibility()
    },

    clearFacilities() {
      if (!this.facilityOverlays) return
      this.facilityOverlays.forEach((o) => o.setMap(null))
      this.facilityOverlays = []
    },

    refreshFacilities() {
      if (!this.map || !this.kakaoMaps) return
      this.clearFacilities()
      if (!this.showFacilities || !this.selected?.nearby?.length) return
      if (this.selected.lat == null || this.selected.lng == null) return

      const maps = this.kakaoMaps
      const baseLat = this.selected.lat
      const baseLng = this.selected.lng
      const items = filterNearbyByWalk(this.selected.nearby, this.walkMinutes).slice(0, 8)

      items.forEach((f, i) => {
        let lat = f.lat
        let lng = f.lng
        if (lat == null || lng == null) {
          const angle = (i / Math.max(items.length, 1)) * Math.PI * 2 - Math.PI / 3
          const distM = parseDistMeters(f.dist) || Math.min(this.walkRadiusM * 0.7, 450 + (i % 2) * 120)
          ;({ lat, lng } = offsetLatLng(
            baseLat,
            baseLng,
            Math.cos(angle) * distM,
            Math.sin(angle) * distM
          ))
        }
        const content = document.createElement('div')
        content.className = 'kakao-fac'
        const distLabel = f.dist ? ` · ${f.dist}` : ''
        content.innerHTML = `<i class="kakao-fac__dot"></i><span>${f.name}${distLabel}</span>`

        const overlay = new maps.CustomOverlay({
          position: new maps.LatLng(lat, lng),
          content,
          yAnchor: 0.5,
          xAnchor: 0,
          zIndex: 5
        })
        overlay.setMap(this.map)
        this.facilityOverlays.push(overlay)
      })
    }
  }
}
</script>

<style scoped>
.map {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  background: #e3eef1;
}

.map__toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  background: rgba(255, 255, 255, 0.92);
  border-bottom: 1px solid var(--bmc-border);
}

.map__search input {
  width: min(260px, 50vw);
  height: 38px;
  padding: 0 14px;
  border: 1px solid var(--bmc-border);
  border-radius: 999px;
  background: var(--bmc-white);
  font-size: 0.875rem;
}

.map__toggles {
  display: flex;
  gap: 8px;
}

.map__canvas {
  position: relative;
  flex: 1;
  min-height: 320px;
  overflow: hidden;
}

.map__kakao {
  width: 100%;
  height: 100%;
  min-height: 320px;
}

.map__loading,
.map__error {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 24px;
  text-align: center;
  background: rgba(227, 238, 241, 0.92);
  z-index: 2;
  font-size: 0.875rem;
  color: var(--bmc-text-muted);
}

.map__error strong {
  color: var(--bmc-primary);
  font-size: 0.95rem;
}

.map__error p {
  margin: 0;
  color: var(--bmc-text);
  max-width: 360px;
}

.map__error small {
  max-width: 380px;
  line-height: 1.4;
}

.map__legend {
  position: absolute;
  left: 12px;
  bottom: 12px;
  z-index: 3;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.92);
  font-size: 0.75rem;
  color: var(--bmc-text-muted);
  box-shadow: var(--bmc-shadow);
  pointer-events: none;
}

.map__legend .dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 4px;
}

.map__legend .dot.heat {
  background: #ff8a5c;
}

.map__legend .dot.walk {
  background: #2aa8bc;
  border: 1px dashed #1a7a8a;
  box-sizing: border-box;
}

.map__legend .dot.pin {
  background: var(--bmc-primary);
}

.map__legend .dot.fac {
  background: var(--bmc-link);
}

</style>

<!-- CustomOverlay는 map 밖에 붙어 scoped가 적용되지 않음 → 전역 핀/시설 스타일 -->
<style>
.kakao-pin {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  transform: translateY(-4px);
  transition: opacity 0.2s ease;
}

.kakao-pin.is-dim {
  opacity: 0.35;
}

.kakao-pin__score {
  font-size: 11px;
  font-weight: 700;
  color: var(--bmc-text, #1a2b2e);
  white-space: nowrap;
  text-shadow: 0 0 4px #fff, 0 1px 2px rgba(255, 255, 255, 0.9);
  pointer-events: none;
}

.kakao-pin__halo {
  position: absolute;
  bottom: -4px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(0, 119, 141, 0.18);
  pointer-events: none;
}

.kakao-pin.is-active .kakao-pin__halo {
  background: rgba(255, 175, 0, 0.28);
}

.kakao-pin__dot {
  position: relative;
  z-index: 1;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--bmc-primary, #00778d);
  border: 2px solid #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
}

.kakao-pin.is-active .kakao-pin__dot {
  background: var(--bmc-accent, #ffaf00);
  width: 16px;
  height: 16px;
}

.kakao-fac {
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
  font-size: 11px;
  font-weight: 600;
  color: var(--bmc-link, #004ea2);
  text-shadow: 0 0 3px #fff;
  pointer-events: none;
}

.kakao-fac__dot {
  display: block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #004ea2;
  opacity: 0.9;
  flex-shrink: 0;
}
</style>
