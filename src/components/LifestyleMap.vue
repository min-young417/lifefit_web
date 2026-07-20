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
      <svg class="map__svg" viewBox="0 0 100 80" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="sea" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#d7eef2" />
            <stop offset="100%" stop-color="#b9dde4" />
          </linearGradient>
          <radialGradient id="heatGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#ff6b4a" stop-opacity="0.75" />
            <stop offset="55%" stop-color="#ffaf00" stop-opacity="0.35" />
            <stop offset="100%" stop-color="#ffaf00" stop-opacity="0" />
          </radialGradient>
          <filter id="soft">
            <feGaussianBlur stdDeviation="1.2" />
          </filter>
        </defs>

        <!-- 부산 실루엣 느낌의 배경 -->
        <rect width="100" height="80" fill="url(#sea)" />
        <path
          class="land"
          d="M8,18 C18,10 28,12 38,8 C48,4 58,6 70,10 C82,14 92,12 97,20
             L96,36 C90,42 88,50 84,58 C78,68 68,72 55,74 C42,76 30,70 22,62
             C14,54 8,42 6,30 Z"
          fill="#eef6f4"
          stroke="#9bb8b8"
          stroke-width="0.35"
        />
        <path
          d="M40,62 C46,58 52,60 58,64 C62,67 66,66 70,62"
          fill="none"
          stroke="#72c3c8"
          stroke-width="0.6"
          stroke-dasharray="1.2 1"
          opacity="0.7"
        />

        <!-- 히트존 -->
        <g v-if="showHeat" class="heat-layer">
          <circle
            v-for="z in enrichedZones"
            :key="z.id"
            :cx="z.x"
            :cy="z.y"
            :r="z.r * (0.7 + z.intensity * 0.5)"
            fill="url(#heatGrad)"
            :opacity="0.35 + z.intensity * 0.55"
            filter="url(#soft)"
            class="heat-blob"
          />
        </g>

        <!-- 주변 시설 (선택 주택 기준) -->
        <g v-if="showFacilities && selected && selected.nearby">
          <g v-for="(f, i) in facilityPoints" :key="i">
            <circle :cx="f.x" :cy="f.y" r="1.1" fill="#004ea2" opacity="0.85" />
            <text :x="f.x + 1.6" :y="f.y + 0.6" class="fac-label">{{ f.name }}</text>
          </g>
        </g>

        <!-- 주택 핀 -->
        <g
          v-for="h in housings"
          :key="h.id"
          class="pin"
          :class="{ 'is-active': selected?.id === h.id, 'is-dim': selected && selected.id !== h.id }"
          @click="$emit('select', h)"
        >
          <circle :cx="h.x" :cy="h.y" r="2.4" class="pin__halo" />
          <circle :cx="h.x" :cy="h.y" r="1.45" class="pin__dot" />
          <text :x="h.x" :y="h.y - 3.2" text-anchor="middle" class="pin__score">
            {{ h.matchScore }}%
          </text>
        </g>
      </svg>

      <div class="map__legend">
        <span><i class="dot heat" />생활권 적합 지역</span>
        <span><i class="dot pin" />추천 주택</span>
        <span v-if="showFacilities"><i class="dot fac" />주변 시설</span>
      </div>

      <div v-if="selected" class="map__popup">
        <strong>{{ selected.name }}</strong>
        <p>{{ selected.summary }}</p>
        <small>{{ selected.district }} · 매칭 {{ selected.matchScore }}%</small>
      </div>
    </div>
  </section>
</template>

<script>
import { heatZones } from '../data/mockHousings'
import { zoneIntensity } from '../utils/matchScore'

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
      showFacilities: true
    }
  },
  computed: {
    enrichedZones() {
      return heatZones.map((z) => ({
        ...z,
        intensity: zoneIntensity(z, this.prefs)
      }))
    },
    facilityPoints() {
      if (!this.selected?.nearby) return []
      const baseX = this.selected.x
      const baseY = this.selected.y
      return this.selected.nearby.slice(0, 4).map((f, i) => {
        const angle = (i / 4) * Math.PI * 2 - Math.PI / 3
        const dist = 5 + (i % 2) * 2
        return {
          name: f.name,
          x: baseX + Math.cos(angle) * dist,
          y: baseY + Math.sin(angle) * dist
        }
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

.map__svg {
  width: 100%;
  height: 100%;
  display: block;
}

.heat-blob {
  animation: pulse 3.2s ease-in-out infinite;
  transform-origin: center;
  transform-box: fill-box;
}

.heat-blob:nth-child(2n) {
  animation-delay: -1.2s;
}

.pin {
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.pin.is-dim {
  opacity: 0.35;
}

.pin__halo {
  fill: rgba(0, 119, 141, 0.18);
}

.pin__dot {
  fill: var(--bmc-primary);
  stroke: #fff;
  stroke-width: 0.35;
}

.pin.is-active .pin__dot {
  fill: var(--bmc-accent);
}

.pin.is-active .pin__halo {
  fill: rgba(255, 175, 0, 0.28);
}

.pin__score {
  font-size: 2.2px;
  font-weight: 700;
  fill: var(--bmc-text);
  pointer-events: none;
}

.fac-label {
  font-size: 1.8px;
  fill: var(--bmc-link);
  font-weight: 600;
}

.map__legend {
  position: absolute;
  left: 12px;
  bottom: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.92);
  font-size: 0.75rem;
  color: var(--bmc-text-muted);
  box-shadow: var(--bmc-shadow);
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

.map__popup {
  position: absolute;
  right: 12px;
  top: 12px;
  width: min(240px, 70%);
  padding: 12px 14px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: var(--bmc-shadow);
  border-left: 4px solid var(--bmc-primary);
  animation: popIn 0.25s ease;
}

.map__popup strong {
  display: block;
  font-size: 0.9rem;
  color: var(--bmc-primary);
  margin-bottom: 4px;
}

.map__popup p {
  margin: 0 0 6px;
  font-size: 0.8rem;
  color: var(--bmc-text);
  line-height: 1.4;
}

.map__popup small {
  color: var(--bmc-text-muted);
  font-size: 0.72rem;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.55;
  }
  50% {
    opacity: 0.95;
  }
}

@keyframes popIn {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
