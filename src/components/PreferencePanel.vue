<template>
  <div class="filter-bar" @keydown.esc="openKey = null">
    <div class="filter-bar__row">
      <p class="filter-bar__label">맞춤 필터</p>

      <div
        v-for="item in menuItems"
        :key="item.key"
        class="filter-dd"
        :class="{ 'is-open': openKey === item.key }"
      >
        <button
          type="button"
          class="filter-dd__btn"
          :class="{ 'is-active': openKey === item.key || item.active }"
          @click="toggleMenu(item.key)"
        >
          <span>{{ item.label }}</span>
          <em v-if="item.summary">{{ item.summary }}</em>
          <svg class="filter-dd__caret" viewBox="0 0 12 12" aria-hidden="true">
            <path d="M2.5 4.5 L6 8 L9.5 4.5" fill="none" stroke="currentColor" stroke-width="1.5" />
          </svg>
        </button>

        <div v-if="openKey === item.key" class="filter-dd__panel" :class="'filter-dd__panel--' + item.key">
          <!-- 자격 -->
          <template v-if="item.key === 'eligibility'">
            <div class="chip-row">
              <button
                v-for="opt in eligibilityOptions"
                :key="opt.id"
                type="button"
                class="bmc-chip"
                :class="{ 'is-active': local.eligibility.includes(opt.id) }"
                @click="toggle('eligibility', opt.id)"
              >
                {{ opt.label }}
              </button>
            </div>
          </template>

          <!-- 주택 유형 -->
          <template v-else-if="item.key === 'types'">
            <div class="type-row">
              <button
                v-for="opt in housingTypes"
                :key="opt.id"
                type="button"
                class="type-pill"
                :class="{ 'is-active': local.types.includes(opt.id) }"
                @click="toggle('types', opt.id)"
              >
                {{ opt.label }}
              </button>
            </div>
          </template>

          <!-- 상세조건 -->
          <template v-else-if="item.key === 'lifestyles'">
            <div class="chip-row chip-row--wrap">
              <button
                v-for="tag in lifestyleTags"
                :key="tag.id"
                type="button"
                class="bmc-chip"
                :class="{ 'is-active': local.lifestyles.includes(tag.id) }"
                @click="toggle('lifestyles', tag.id)"
              >
                {{ tag.label }}
              </button>
            </div>
          </template>

          <!-- 지역 -->
          <template v-else-if="item.key === 'districts'">
            <div class="chip-row chip-row--wrap">
              <button
                v-for="d in districts"
                :key="d"
                type="button"
                class="bmc-chip"
                :class="{ 'is-active': local.districts.includes(d) }"
                @click="toggle('districts', d)"
              >
                {{ d }}
              </button>
            </div>
          </template>

          <!-- 보증금·면적 -->
          <template v-else-if="item.key === 'budget'">
            <div class="slider-row">
              <div class="slider-row__label">
                <span>최대 보증금</span>
                <strong>{{ local.depositMax.toLocaleString() }}만원</strong>
              </div>
              <input v-model.number="local.depositMax" type="range" min="300" max="5000" step="100">
            </div>
            <div class="area-fields">
              <label>
                최소 면적(㎡)
                <input v-model.number="local.areaMin" type="number" min="0" max="100">
              </label>
              <label>
                최대 면적(㎡)
                <input v-model.number="local.areaMax" type="number" min="0" max="120">
              </label>
            </div>
          </template>

          <!-- 통근 -->
          <template v-else-if="item.key === 'commute'">
            <label class="commute-search">
              <input
                v-model="destQuery"
                type="text"
                placeholder="직장, 학교 등 목적지 검색"
                @keydown.enter.prevent="searchDestination"
              >
              <button type="button" class="bmc-btn bmc-btn-primary" @click="searchDestination">
                검색
              </button>
            </label>

            <ul v-if="destResults.length" class="commute-results">
              <li v-for="r in destResults" :key="r.id">
                <button type="button" @click="pickDestination(r)">
                  <strong>{{ r.name }}</strong>
                  <span>{{ r.address }}</span>
                </button>
              </li>
            </ul>
            <p v-else-if="destSearched" class="filter-hint">검색 결과가 없습니다.</p>

            <div v-if="local.commuteDestination" class="commute-selected">
              <span>{{ local.commuteDestination.name }}</span>
              <button type="button" aria-label="목적지 삭제" @click="clearDestination">×</button>
            </div>
          </template>

          <!-- 도보 생활권 -->
          <template v-else-if="item.key === 'walk'">
            <div class="slider-row">
              <div class="slider-row__label">
                <span>도보 가능 거리</span>
                <strong>{{ local.walkMinutes }}분 · 약 {{ walkMetersLabel }}</strong>
              </div>
              <input v-model.number="local.walkMinutes" type="range" min="5" max="20" step="1">
            </div>
            <p class="filter-hint">선택 주택 주변 시설·지도 확대 범위에 반영됩니다.</p>
          </template>
        </div>
      </div>

      <button type="button" class="bmc-btn bmc-btn-primary filter-bar__search" @click="submit">
        <img :src="assets.icoBtnPlusW" alt="" class="filter-bar__search-ico">
        검색
      </button>
    </div>

    <div v-if="selectedLifestyleTags.length" class="filter-bar__applied">
      <span
        v-for="tag in selectedLifestyleTags"
        :key="tag.id"
        class="applied-tag"
      >
        {{ tag.label }}
        <button type="button" :aria-label="`${tag.label} 제거`" @click="toggle('lifestyles', tag.id)">×</button>
      </span>
      <button type="button" class="applied-tag applied-tag--clear" @click="local.lifestyles = []">
        전체 해제
      </button>
    </div>

    <div v-if="openKey" class="filter-bar__scrim" @click="openKey = null" />
  </div>
</template>

<script>
import {
  DISTRICTS,
  LIFESTYLE_TAGS,
  ELIGIBILITY_OPTIONS,
  HOUSING_TYPES
} from '../data/mockHousings'
import { assets } from '../assets/images'
import { walkMinutesToMeters } from '../utils/walkRadius'
import { loadKakaoMap } from '../utils/loadKakaoMap'

const defaultPrefs = () => ({
  eligibility: [],
  types: [],
  lifestyles: [],
  districts: [],
  depositMax: 5000,
  areaMin: 0,
  areaMax: 120,
  commuteDestination: null,
  walkMinutes: 15
})

export default {
  name: 'PreferencePanel',
  props: {
    modelValue: {
      type: Object,
      default: null
    }
  },
  emits: ['update:modelValue', 'search'],
  data() {
    return {
      assets,
      openKey: null,
      local: this.modelValue
        ? JSON.parse(JSON.stringify(this.modelValue))
        : defaultPrefs(),
      districts: DISTRICTS,
      lifestyleTags: LIFESTYLE_TAGS,
      eligibilityOptions: ELIGIBILITY_OPTIONS,
      housingTypes: HOUSING_TYPES,
      destQuery: '',
      destResults: [],
      destSearched: false
    }
  },
  computed: {
    selectedLifestyleTags() {
      return this.lifestyleTags.filter((t) => this.local.lifestyles.includes(t.id))
    },
    walkMetersLabel() {
      const m = walkMinutesToMeters(this.local.walkMinutes)
      return m >= 1000 ? `${(m / 1000).toFixed(1)}km` : `${m}m`
    },
    menuItems() {
      const elig = this.local.eligibility.length
        ? this.eligibilityOptions
          .filter((o) => this.local.eligibility.includes(o.id))
          .map((o) => o.label)
          .slice(0, 2)
          .join('·')
        : '전체'
      const types = this.local.types.length
        ? `${this.local.types.length}개 선택`
        : '전체'
      const life = this.local.lifestyles.length
        ? `${this.local.lifestyles.length}개`
        : '선택'
      const districts = this.local.districts.length
        ? `${this.local.districts.length}개 구`
        : '전체'
      const walk = this.local.walkMinutes || 15
      return [
        { key: 'eligibility', label: '자격', summary: elig, active: !!this.local.eligibility.length },
        { key: 'types', label: '주택유형', summary: types, active: !!this.local.types.length },
        { key: 'lifestyles', label: '상세조건', summary: life, active: !!this.local.lifestyles.length },
        { key: 'districts', label: '지역', summary: districts, active: !!this.local.districts.length },
        {
          key: 'budget',
          label: '보증금·면적',
          summary: `${this.local.depositMax}만`,
          active: true
        },
        {
          key: 'walk',
          label: '도보권',
          summary: `${walk}분`,
          active: true
        },
        {
          key: 'commute',
          label: '통근',
          summary: this.local.commuteDestination ? this.local.commuteDestination.name : '선택',
          active: !!this.local.commuteDestination
        }
      ]
    }
  },
  watch: {
    local: {
      deep: true,
      handler(val) {
        this.$emit('update:modelValue', { ...val })
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.onDocClick)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.onDocClick)
  },
  methods: {
    onDocClick(e) {
      if (!this.$el.contains(e.target)) this.openKey = null
    },
    toggleMenu(key) {
      this.openKey = this.openKey === key ? null : key
    },
    toggle(field, id) {
      const list = this.local[field]
      const idx = list.indexOf(id)
      if (idx >= 0) list.splice(idx, 1)
      else list.push(id)
    },
    submit() {
      this.openKey = null
      this.$emit('search', { ...this.local })
    },
    async searchDestination() {
      const q = this.destQuery.trim()
      if (!q) return
      this.destSearched = true
      try {
        const maps = await loadKakaoMap()
        const places = new maps.services.Places()
        places.keywordSearch(q, (data, status) => {
          if (status === maps.services.Status.OK) {
            this.destResults = data.slice(0, 5).map((d) => ({
              id: d.id,
              name: d.place_name,
              address: d.road_address_name || d.address_name,
              lat: Number(d.y),
              lng: Number(d.x)
            }))
          } else {
            this.destResults = []
          }
        })
      } catch (err) {
        this.destResults = []
      }
    },
    pickDestination(r) {
      this.local.commuteDestination = { name: r.name, lat: r.lat, lng: r.lng }
      this.destResults = []
      this.destQuery = ''
      this.destSearched = false
    },
    clearDestination() {
      this.local.commuteDestination = null
    }
  }
}
</script>

<style scoped>
.filter-bar {
  position: relative;
  z-index: 40;
  background: var(--bmc-white);
  border-bottom: 1px solid var(--bmc-border);
}

.filter-bar__row {
  position: relative;
  z-index: 51;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
}

.filter-bar__label {
  margin: 0 6px 0 0;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--bmc-primary);
  white-space: nowrap;
}

.filter-dd {
  position: relative;
}

.filter-dd__btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 36px;
  padding: 0 12px;
  border: 1px solid var(--bmc-border);
  border-radius: 999px;
  background: var(--bmc-bg);
  color: var(--bmc-text);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.15s ease, background 0.15s ease;
}

.filter-dd__btn em {
  font-style: normal;
  font-weight: 500;
  color: var(--bmc-text-muted);
  max-width: 72px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.filter-dd__btn.is-active,
.filter-dd.is-open .filter-dd__btn {
  border-color: var(--bmc-primary);
  background: rgba(0, 119, 141, 0.08);
  color: var(--bmc-primary);
}

.filter-dd__caret {
  width: 10px;
  height: 10px;
  opacity: 0.7;
}

.filter-dd__panel {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  z-index: 50;
  min-width: 260px;
  max-width: min(420px, 92vw);
  padding: 14px;
  border: 1px solid var(--bmc-border);
  border-radius: 12px;
  background: var(--bmc-white);
  box-shadow: var(--bmc-shadow);
  animation: dropIn 0.16s ease;
}

.filter-dd__panel--districts,
.filter-dd__panel--lifestyles {
  min-width: 340px;
}

.filter-dd__panel--budget {
  min-width: 280px;
}

.filter-dd__panel--commute {
  min-width: 320px;
}

.filter-bar__applied {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  padding: 0 16px 10px;
}

.applied-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  padding: 0 6px 0 10px;
  border-radius: 999px;
  background: rgba(0, 119, 141, 0.1);
  color: var(--bmc-primary);
  font-size: 0.75rem;
  font-weight: 600;
}

.applied-tag button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: var(--bmc-primary);
  font-size: 0.85rem;
  line-height: 1;
  cursor: pointer;
}

.applied-tag button:hover {
  background: rgba(0, 119, 141, 0.15);
}

.applied-tag--clear {
  background: transparent;
  border: 1px dashed var(--bmc-border);
  color: var(--bmc-text-muted);
  padding: 0 10px;
  cursor: pointer;
}

.filter-bar__scrim {
  position: fixed;
  inset: 0;
  z-index: 30;
  background: transparent;
}

.filter-bar__search {
  margin-left: auto;
  min-height: 36px;
  padding: 0 16px;
  font-size: 0.875rem;
  border-radius: 999px;
}

.filter-bar__search-ico {
  width: 14px;
  height: 14px;
}

.chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.type-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.type-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 36px;
  padding: 0 12px;
  border: 1px solid var(--bmc-border);
  border-radius: 999px;
  background: var(--bmc-bg);
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--bmc-text-muted);
  cursor: pointer;
}

.type-pill.is-active {
  border-color: var(--bmc-primary);
  background: rgba(0, 119, 141, 0.1);
  color: var(--bmc-primary);
}

.slider-row {
  margin-bottom: 12px;
}

.slider-row:last-child {
  margin-bottom: 0;
}

.slider-row__label {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  font-size: 0.8rem;
  color: var(--bmc-text-muted);
}

.slider-row__label strong {
  color: var(--bmc-primary);
}

.slider-row input[type='range'] {
  width: 100%;
  accent-color: var(--bmc-primary);
}

.area-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 4px;
}

.area-fields label {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 0.75rem;
  color: var(--bmc-text-muted);
}

.area-fields input,
.filter-select {
  height: 38px;
  padding: 0 10px;
  border: 1px solid var(--bmc-border);
  border-radius: 8px;
  background: var(--bmc-white);
  font-size: 0.875rem;
}

.filter-select {
  width: 100%;
}

.commute-search {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.commute-search input {
  flex: 1 1 auto;
  min-width: 0;
  height: 38px;
  padding: 0 10px;
  border: 1px solid var(--bmc-border);
  border-radius: 8px;
  background: var(--bmc-white);
  font-size: 0.875rem;
}

.commute-search .bmc-btn {
  flex: 0 0 auto;
  min-height: 38px;
  height: 38px;
  padding: 0 14px;
  font-size: 0.8rem;
  white-space: nowrap;
}

.commute-results {
  margin: 8px 0 0;
  padding: 0;
  list-style: none;
  max-height: 220px;
  overflow-y: auto;
  border: 1px solid var(--bmc-border);
  border-radius: 8px;
}

.commute-results li + li {
  border-top: 1px solid var(--bmc-border);
}

.commute-results button {
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;
  padding: 8px 10px;
  border: none;
  background: var(--bmc-white);
  text-align: left;
  cursor: pointer;
}

.commute-results button:hover {
  background: var(--bmc-bg);
}

.commute-results strong {
  font-size: 0.82rem;
  color: var(--bmc-text);
}

.commute-results span {
  font-size: 0.72rem;
  color: var(--bmc-text-muted);
}

.commute-selected {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 10px;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(0, 119, 141, 0.08);
  color: var(--bmc-primary);
  font-size: 0.82rem;
  font-weight: 700;
}

.commute-selected button {
  border: none;
  background: transparent;
  color: var(--bmc-primary);
  font-size: 1rem;
  line-height: 1;
  cursor: pointer;
}

.filter-hint {
  margin: 10px 0 0;
  font-size: 0.75rem;
  line-height: 1.4;
  color: var(--bmc-text-muted);
}

@keyframes dropIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 960px) {
  .filter-bar__label {
    width: 100%;
    margin-bottom: 2px;
  }

  .filter-bar__search {
    margin-left: 0;
    width: 100%;
  }
}
</style>