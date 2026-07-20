<template>
  <aside class="pref">
    <header class="pref__head" :style="{ backgroundImage: `url(${assets.lnbBg})` }">
      <h2>취향에 맞는 동네를 찾아드릴게요!</h2>
      <p>자격·지역·생활권을 입력하여 검색하세요.</p>
    </header>

    <div class="pref__scroll">
      <section class="pref__block">
        <h3 class="bmc-section-title">자격 퀵체크</h3>
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
      </section>

      <section class="pref__block">
        <h3 class="bmc-section-title">주택 유형</h3>
        <div class="type-grid">
          <button
            v-for="opt in housingTypes"
            :key="opt.id"
            type="button"
            class="type-card"
            :class="{ 'is-active': local.types.includes(opt.id) }"
            @click="toggle('types', opt.id)"
          >
            <img
              :src="typeIcon(opt.id, local.types.includes(opt.id))"
              :alt="opt.label"
              class="type-card__ico"
            >
            <span>{{ opt.label }}</span>
          </button>
        </div>
      </section>

      <section class="pref__block">
        <h3 class="bmc-section-title">시민 취향 설정</h3>
        <div class="life-grid">
          <button
            v-for="tag in lifestyleTags"
            :key="tag.id"
            type="button"
            class="life-card"
            :class="{ 'is-active': local.lifestyles.includes(tag.id) }"
            @click="toggle('lifestyles', tag.id)"
          >
            <img
              class="life-card__icon"
              :src="lifestyleIcons[tag.id]"
              :alt="tag.label"
            >
            <span>{{ tag.label }}</span>
          </button>
        </div>
      </section>

      <section class="pref__block">
        <h3 class="bmc-section-title">인프라 중요도</h3>
        <div
          v-for="item in infraItems"
          :key="item.key"
          class="slider-row"
        >
          <div class="slider-row__label">
            <span>{{ item.label }}</span>
            <strong>{{ local.infraWeights[item.key] }}%</strong>
          </div>
          <input
            v-model.number="local.infraWeights[item.key]"
            type="range"
            min="0"
            max="100"
            step="5"
          >
        </div>
      </section>

      <section class="pref__block">
        <h3 class="bmc-section-title">희망 지역 (구)</h3>
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
      </section>

      <section class="pref__block">
        <h3 class="bmc-section-title">보증금 (만원)</h3>
        <div class="slider-row">
          <div class="slider-row__label">
            <span>최대 보증금</span>
            <strong>{{ local.depositMax.toLocaleString() }}만원</strong>
          </div>
          <input v-model.number="local.depositMax" type="range" min="300" max="5000" step="100">
        </div>
      </section>

      <section class="pref__block">
        <h3 class="bmc-section-title">희망 면적 (㎡)</h3>
        <div class="area-fields">
          <label>
            최소
            <input v-model.number="local.areaMin" type="number" min="0" max="100">
          </label>
          <label>
            최대
            <input v-model.number="local.areaMax" type="number" min="0" max="120">
          </label>
        </div>
      </section>

      <section class="pref__block">
        <h3 class="bmc-section-title">출퇴근·통학 기준</h3>
        <select v-model="local.commuteHub" class="pref__select">
          <option value="">선택 안 함</option>
          <option v-for="hub in commuteHubs" :key="hub.id" :value="hub.id">
            {{ hub.label }}
          </option>
        </select>
        <div v-if="local.commuteHub" class="slider-row" style="margin-top: 10px">
          <div class="slider-row__label">
            <span>희망 이동 시간</span>
            <strong>{{ local.commuteMinutes }}분 이내</strong>
          </div>
          <input v-model.number="local.commuteMinutes" type="range" min="10" max="60" step="5">
        </div>
      </section>
    </div>

    <footer class="pref__foot">
      <button type="button" class="bmc-btn bmc-btn-primary pref__submit" @click="submit">
        <img :src="assets.icoBtnPlusW" alt="" class="pref__submit-ico">
        맞춤 주택 검색
      </button>
    </footer>
  </aside>
</template>

<script>
import {
  DISTRICTS,
  LIFESTYLE_TAGS,
  ELIGIBILITY_OPTIONS,
  HOUSING_TYPES,
  COMMUTE_HUBS
} from '../data/mockHousings'
import { assets, housingTypeIcons, lifestyleIcons } from '../assets/images'

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
      lifestyleIcons,
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
  watch: {
    local: {
      deep: true,
      handler(val) {
        this.$emit('update:modelValue', { ...val })
      }
    }
  },
  methods: {
    typeIcon(id, active) {
      const set = housingTypeIcons[id]
      if (!set) return assets.subapp01
      return active ? set.active : set.idle
    },
    toggle(field, id) {
      const list = this.local[field]
      const idx = list.indexOf(id)
      if (idx >= 0) list.splice(idx, 1)
      else list.push(id)
    },
    submit() {
      const hub = COMMUTE_HUBS.find((h) => h.id === this.local.commuteHub)
      this.$emit('search', {
        ...this.local,
        commuteHubLabel: hub?.label || ''
      })
    }
  }
}
</script>

<style scoped>
.pref {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--bmc-white);
  border-right: 1px solid var(--bmc-border);
}

.pref__head {
  padding: 18px 18px 14px;
  border-bottom: 1px solid var(--bmc-border);
  background-color: var(--bmc-primary);
  background-size: cover;
  background-position: center bottom;
  color: #fff;
}

.pref__head h2 {
  margin: 0 0 6px;
  font-size: 1.05rem;
  color: #fff;
  line-height: 1.35;
}

.pref__head p {
  margin: 0;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.88);
}

.type-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.type-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 10px 6px;
  border: 1px solid var(--bmc-border);
  border-radius: var(--bmc-radius);
  background: var(--bmc-bg);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--bmc-text-muted);
  cursor: pointer;
  transition: all 0.15s ease;
}

.type-card__ico {
  width: 28px;
  height: 28px;
}

.type-card.is-active {
  border-color: var(--bmc-primary);
  background: rgba(0, 119, 141, 0.08);
  color: var(--bmc-primary);
}

.pref__scroll {
  flex: 1;
  overflow: auto;
  padding: 14px 18px 20px;
}

.pref__block {
  margin-bottom: 20px;
}

.chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.life-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.life-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px 8px;
  border: 1px solid var(--bmc-border);
  border-radius: var(--bmc-radius);
  background: var(--bmc-bg);
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--bmc-text-muted);
  cursor: pointer;
  transition: all 0.15s ease;
}

.life-card__icon {
  width: 28px;
  height: 28px;
  display: block;
}

.life-card.is-active {
  border-color: var(--bmc-primary);
  background: rgba(0, 119, 141, 0.1);
  color: var(--bmc-primary);
  box-shadow: inset 0 0 0 1px var(--bmc-primary);
}

.slider-row {
  margin-bottom: 12px;
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
}

.area-fields label {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 0.78rem;
  color: var(--bmc-text-muted);
}

.area-fields input,
.pref__select {
  height: 40px;
  padding: 0 10px;
  border: 1px solid var(--bmc-border);
  border-radius: 8px;
  background: var(--bmc-white);
  font-size: 0.9rem;
}

.pref__select {
  width: 100%;
}

.pref__foot {
  padding: 14px 18px 18px;
  border-top: 1px solid var(--bmc-border);
  background: var(--bmc-white);
}

.pref__submit {
  width: 100%;
}

.pref__submit-ico {
  width: 16px;
  height: 16px;
}
</style>
