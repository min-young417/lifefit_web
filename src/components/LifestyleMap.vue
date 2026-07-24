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
      loadError: ''
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
      if (next?.lat != null && next?.lng != null && this.map) {
        this.map.panTo(new this.kakaoMaps.LatLng(next.lat, next.lng))
      }
    },
    prefs: {
      deep: true,
      handler() {
        this.refreshHeat()
      }
    },
    showHeat(v) {
      this.setHeatVisible(v)
    },
    showFacilities() {
      this.refreshFacilities()
    }
  },
  mounted() {
    this.initMap()
  },
  beforeUnmount() {
    this.clearPins()
    this.clearHeat()
    this.clearFacilities()
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
        this.mapReady = true
        this.refreshHeat()
        this.refreshPins()
        this.refreshFacilities()
        if (this.selected?.lat != null) {
          this.map.panTo(new maps.LatLng(this.selected.lat, this.selected.lng))
        }
      } catch (err) {
        this.loadError = err?.message || String(err)
      }
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

      heatZones.forEach((z) => {
        const intensity = zoneIntensity(z, this.prefs)
        const radius = Math.round(z.radiusMeters * (0.7 + intensity * 0.5))
        const circle = new maps.Circle({
          center: new maps.LatLng(z.lat, z.lng),
          radius,
          strokeWeight: 0,
          fillColor: '#ff6b4a',
          fillOpacity: 0.18 + intensity * 0.35
        })
        if (this.showHeat) circle.setMap(this.map)
        this.heatCircles.push(circle)
      })
    },

    setHeatVisible(visible) {
      if (!this.heatCircles) return
      this.heatCircles.forEach((c) => c.setMap(visible ? this.map : null))
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
      const items = this.selected.nearby.slice(0, 4)

      items.forEach((f, i) => {
        const angle = (i / 4) * Math.PI * 2 - Math.PI / 3
        const dist = 450 + (i % 2) * 180
        const { lat, lng } = offsetLatLng(
          baseLat,
          baseLng,
          Math.cos(angle) * dist,
          Math.sin(angle) * dist
        )
        const content = document.createElement('div')
        content.className = 'kakao-fac'
        content.innerHTML = `<i class="kakao-fac__dot"></i><span>${f.name}</span>`

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
