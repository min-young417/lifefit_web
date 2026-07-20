<template>
  <div v-if="housing" class="drawer-root">
    <div class="drawer-backdrop" @click="$emit('close')" />
    <aside class="drawer" role="dialog" aria-labelledby="ai-report-title">
      <header class="drawer__head">
        <div class="drawer__title-wrap">
          <img :src="assets.guide04" alt="" class="drawer__hero-ico">
          <div>
            <p class="drawer__eyebrow">AI 생활권 리포트</p>
            <h2 id="ai-report-title">{{ housing.name }}</h2>
          </div>
        </div>
        <button type="button" class="drawer__close" aria-label="닫기" @click="$emit('close')">
          <img :src="assets.icoClose" alt="">
        </button>
      </header>

      <div class="drawer__score">
        <div class="ring">
          <strong>{{ housing.matchScore }}</strong>
          <span>%</span>
        </div>
        <div>
          <p class="drawer__summary">{{ housing.summary }}</p>
          <p class="drawer__sub">
            {{ housing.district }} · {{ typeLabel }} · {{ housing.builtYear }}년 준공
          </p>
        </div>
      </div>

      <section class="drawer__block">
        <h3>추천 이유</h3>
        <ul class="bullet-list">
          <li v-for="(r, i) in housing.matchReasons || []" :key="i">
            <img :src="assets.icoBullet" alt="">
            <span>{{ r }}</span>
          </li>
          <li v-for="(h, i) in housing.highlights" :key="'h' + i">
            <img :src="assets.icoBullet" alt="">
            <span>{{ h }}</span>
          </li>
        </ul>
      </section>

      <section class="drawer__block">
        <h3>인프라 적합도</h3>
        <div class="bars">
          <div v-for="row in infraRows" :key="row.key" class="bar-row">
            <span>{{ row.label }}</span>
            <div class="bar-track">
              <div class="bar-fill" :style="{ width: row.value + '%' }" />
            </div>
            <em>{{ row.value }}</em>
          </div>
        </div>
        <svg class="radar" viewBox="0 0 120 120" aria-hidden="true">
          <polygon
            points="60,18 102,45 90,95 30,95 18,45"
            fill="none"
            stroke="#ddd"
            stroke-width="1"
          />
          <polygon
            :points="radarPoints"
            fill="rgba(0,119,141,0.25)"
            stroke="#00778d"
            stroke-width="1.5"
          />
        </svg>
      </section>

      <section class="drawer__block two-col">
        <div>
          <h3>장점</h3>
          <ul class="pros">
            <li v-for="(p, i) in housing.pros" :key="i">{{ p }}</li>
          </ul>
        </div>
        <div>
          <h3>아쉬운 점</h3>
          <ul class="cons">
            <li v-for="(c, i) in housing.cons" :key="i">{{ c }}</li>
          </ul>
        </div>
      </section>

      <section class="drawer__block">
        <h3>유사한 생활 환경</h3>
        <p class="similar">{{ housing.similarEnv }}</p>
      </section>

      <section class="drawer__block">
        <h3>주변 시설</h3>
        <ul class="near">
          <li v-for="(n, i) in housing.nearby" :key="i">
            <span>{{ n.name }}</span>
            <em>{{ n.dist }}</em>
          </li>
        </ul>
      </section>

      <footer class="drawer__foot">
        <a
          class="bmc-btn bmc-btn-primary"
          href="https://apply.bmc.busan.kr/co/coa/selectMainView.do"
          target="_blank"
          rel="noopener noreferrer"
        >
          BMC 청약공고 보기
          <img :src="assets.icoArrow" alt="" class="drawer__cta-arrow">
        </a>
      </footer>
    </aside>
  </div>
</template>

<script>
import { HOUSING_TYPES } from '../data/mockHousings'
import { assets } from '../assets/images'

const INFRA_LABELS = [
  { key: 'cafe', label: '카페' },
  { key: 'gym', label: '운동' },
  { key: 'culture', label: '문화' },
  { key: 'mart', label: '마트' },
  { key: 'transit', label: '교통' },
  { key: 'nature', label: '자연' }
]

export default {
  name: 'AiReportDrawer',
  props: {
    housing: { type: Object, default: null }
  },
  emits: ['close'],
  data() {
    return { assets }
  },
  computed: {
    typeLabel() {
      return HOUSING_TYPES.find((t) => t.id === this.housing?.type)?.label || ''
    },
    infraRows() {
      if (!this.housing) return []
      return INFRA_LABELS.map((row) => ({
        ...row,
        value: this.housing.infra[row.key] ?? 0
      }))
    },
    radarPoints() {
      if (!this.housing) return ''
      const keys = ['cafe', 'gym', 'culture', 'mart', 'transit']
      const cx = 60
      const cy = 60
      const maxR = 38
      return keys
        .map((k, i) => {
          const angle = -Math.PI / 2 + (i / keys.length) * Math.PI * 2
          const r = ((this.housing.infra[k] ?? 50) / 100) * maxR
          return `${cx + Math.cos(angle) * r},${cy + Math.sin(angle) * r}`
        })
        .join(' ')
    }
  }
}
</script>

<style scoped>
.drawer-root {
  position: fixed;
  inset: 0;
  z-index: 200;
}

.drawer-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(20, 40, 50, 0.35);
  animation: fade 0.2s ease;
}

.drawer {
  position: absolute;
  top: 0;
  right: 0;
  width: min(420px, 100%);
  height: 100%;
  background: var(--bmc-white);
  box-shadow: -8px 0 30px rgba(0, 40, 50, 0.18);
  display: flex;
  flex-direction: column;
  animation: slide 0.28s ease;
}

.drawer__head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 18px 18px 12px;
  border-bottom: 1px solid var(--bmc-border);
}

.drawer__title-wrap {
  display: flex;
  gap: 12px;
  align-items: center;
  min-width: 0;
}

.drawer__hero-ico {
  width: 56px;
  height: 56px;
  object-fit: contain;
  flex-shrink: 0;
  border-radius: 12px;
  background: var(--bmc-bg);
}

.drawer__eyebrow {
  margin: 0 0 4px;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--bmc-accent);
}

.drawer__head h2 {
  margin: 0;
  font-size: 1.15rem;
  color: var(--bmc-primary);
  line-height: 1.3;
}

.drawer__close {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  background: var(--bmc-bg);
  cursor: pointer;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.drawer__close img {
  width: 14px;
  height: 14px;
}

.bullet-list {
  list-style: none !important;
  padding-left: 0 !important;
}

.bullet-list li {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  margin-bottom: 6px;
}

.bullet-list img {
  width: 12px;
  height: 15px;
  margin-top: 2px;
  flex-shrink: 0;
}

.drawer__score {
  display: flex;
  gap: 14px;
  align-items: center;
  padding: 16px 18px;
  background: linear-gradient(120deg, rgba(0, 119, 141, 0.08), rgba(114, 195, 200, 0.12));
}

.ring {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  border: 4px solid var(--bmc-primary);
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 1px;
  background: #fff;
  flex-shrink: 0;
}

.ring strong {
  font-size: 1.5rem;
  color: var(--bmc-primary);
}

.ring span {
  font-size: 0.75rem;
  color: var(--bmc-text-muted);
}

.drawer__summary {
  margin: 0 0 4px;
  font-weight: 700;
  font-size: 0.92rem;
}

.drawer__sub {
  margin: 0;
  font-size: 0.78rem;
  color: var(--bmc-text-muted);
}

.drawer__block {
  padding: 14px 18px;
  border-bottom: 1px solid var(--bmc-border);
  overflow: auto;
}

.drawer__block h3 {
  margin: 0 0 8px;
  font-size: 0.88rem;
  color: var(--bmc-text);
}

.drawer__block ul {
  margin: 0;
  padding-left: 18px;
  font-size: 0.84rem;
  color: var(--bmc-text-muted);
  line-height: 1.55;
}

.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.pros li {
  color: #2f6b4f;
}

.cons li {
  color: #8a4b2a;
}

.similar {
  margin: 0;
  font-size: 0.86rem;
  line-height: 1.6;
  color: var(--bmc-text-muted);
}

.near {
  list-style: none;
  padding: 0 !important;
}

.near li {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px dashed var(--bmc-border);
  font-size: 0.84rem;
}

.near em {
  font-style: normal;
  font-weight: 700;
  color: var(--bmc-primary);
}

.bars {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 10px;
}

.bar-row {
  display: grid;
  grid-template-columns: 40px 1fr 28px;
  gap: 8px;
  align-items: center;
  font-size: 0.75rem;
  color: var(--bmc-text-muted);
}

.bar-track {
  height: 8px;
  border-radius: 999px;
  background: var(--bmc-bg-soft);
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--bmc-primary), var(--bmc-secondary));
  transition: width 0.4s ease;
}

.bar-row em {
  font-style: normal;
  font-weight: 700;
  color: var(--bmc-text);
  text-align: right;
}

.radar {
  width: 140px;
  height: 140px;
  display: block;
  margin: 0 auto;
}

.drawer__foot {
  margin-top: auto;
  padding: 14px 18px 20px;
}

.drawer__foot .bmc-btn {
  width: 100%;
}

.drawer__cta-arrow {
  width: 13px;
  height: 13px;
  filter: brightness(0) invert(1);
}

@keyframes slide {
  from {
    transform: translateX(24px);
    opacity: 0.6;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
