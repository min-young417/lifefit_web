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

          <!-- 취향 -->
          <template v-else-if="item.key === 'lifestyles'">
            <div class="chip-row">
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

          <!-- 인프라 -->
          <template v-else-if="item.key === 'infra'">
            <div
              v-for="row in infraItems"
              :key="row.key"
              class="slider-row"
            >
              <div class="slider-row__label">
                <span>{{ row.label }}</span>
                <strong>{{ local.infraWeights[row.key] }}%</strong>
              </div>
              <input
                v-model.number="local.infraWeights[row.key]"
                type="range"
                min="0"
                max="100"
                step="5"
              >
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
            <select v-model="local.commuteHub" class="filter-select">
              <option value="">선택 안 함</option>
              <option v-for="hub in commuteHubs" :key="hub.id" :value="hub.id">
                {{ hub.label }}
              </option>
            </select>
            <div v-if="local.commuteHub" class="slider-row" style="margin-top: 12px">
              <div class="slider-row__label">
                <span>희망 이동 시간</span>
                <strong>{{ local.commuteMinutes }}분 이내</strong>
              </div>
              <input v-model.number="local.commuteMinutes" type="range" min="10" max="60" step="5">
            </div>
          </template>
        </div>
      </div>

      <button type="button" class="bmc-btn bmc-btn-primary filter-bar__search" @click="submit">
        <img :src="assets.icoBtnPlusW" alt="" class="filter-bar__search-ico">
        검색
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
  HOUSING_TYPES,
  COMMUTE_HUBS
} from '../data/mockHousings'
import { assets } from '../assets/images'

const defaultPrefs = () => ({
  eligibility: ['youth'],
  types: [],
  lifestyles: ['leisure', 'culture'],
  infraWeights: { cafe: 80, gym: 70, culture: 50, mart: 40 },
  districts: [],
  depositMax: 2000,
  areaMin: 20,
  areaMax: 60,
  commuteHub: '',
  commuteMinutes: 30
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
      commuteHubs: COMMUTE_HUBS,
      infraItems: [
        { key: 'cafe', label: '카페·베이커리' },
        { key: 'gym', label: '피트니스·운동' },
        { key: 'culture', label: '문화공간' },
        { key: 'mart', label: '대형마트' }
      ]
    }
  },
  computed: {
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
      const hub = this.commuteHubs.find((h) => h.id === this.local.commuteHub)
      return [
        { key: 'eligibility', label: '자격', summary: elig, active: !!this.local.eligibility.length },
        { key: 'types', label: '주택유형', summary: types, active: !!this.local.types.length },
        { key: 'lifestyles', label: '취향', summary: life, active: !!this.local.lifestyles.length },
        { key: 'infra', label: '인프라', summary: '중요도', active: true },
        { key: 'districts', label: '지역', summary: districts, active: !!this.local.districts.length },
        {
          key: 'budget',
          label: '보증금·면적',
          summary: `${this.local.depositMax}만`,
          active: true
        },
        {
          key: 'commute',
          label: '통근',
          summary: hub ? hub.label : '선택',
          active: !!this.local.commuteHub
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
      const hub = COMMUTE_HUBS.find((h) => h.id === this.local.commuteHub)
      this.openKey = null
      this.$emit('search', {
        ...this.local,
        commuteHubLabel: hub?.label || ''
      })
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

.filter-dd__panel--districts {
  min-width: 340px;
}

.filter-dd__panel--infra,
.filter-dd__panel--budget {
  min-width: 280px;
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
