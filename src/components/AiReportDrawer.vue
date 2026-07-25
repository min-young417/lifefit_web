<template>
  <div v-if="housing" class="modal-root">
    <div class="modal-backdrop" @click="$emit('close')" />
    <div class="modal" role="dialog" aria-labelledby="detail-title" aria-modal="true">
      <header class="modal__head">
        <div class="modal__title-wrap">
          <img :src="assets.guide04" alt="" class="modal__hero-ico">
          <div>
            <p class="modal__eyebrow">주택 상세 · 생활권 리포트</p>
            <h2 id="detail-title">{{ housing.name }}</h2>
          </div>
        </div>
        <button type="button" class="modal__close" aria-label="닫기" @click="$emit('close')">
          <img :src="assets.icoClose" alt="">
        </button>
      </header>

      <div class="modal__score">
        <div class="ring">
          <strong>{{ housing.matchScore }}</strong>
          <span>%</span>
        </div>
        <div>
          <p class="modal__summary">{{ housing.summary }}</p>
          <p class="modal__sub">
            {{ housing.district }} · {{ typeLabel }} · {{ housing.builtYear }}년 준공
            · 보증금 {{ housing.depositMin }}–{{ housing.depositMax }}만원
          </p>
        </div>
      </div>

      <div class="modal__body">
        <section class="modal__block">
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

        <div class="modal__grid">
          <!-- 주변 상권 -->
          <section class="modal__block">
            <h3>주변 상권 · 생활시설</h3>
            <p class="modal__walk-hint">도보 {{ walkMinutes }}분 이내</p>
            <ul class="commerce">
              <li v-for="(n, i) in commerceList" :key="i">
                <span class="commerce__kind">{{ kindLabel(n.kind) }}</span>
                <span class="commerce__name">{{ n.name }}</span>
                <em>{{ n.dist }}</em>
              </li>
            </ul>
            <p v-if="!commerceList.length" class="modal__empty">이 도보 거리 안 등록 시설이 없습니다.</p>
          </section>

          <!-- 4분면 가성비 -->
          <section class="modal__block">
            <h3>가성비 포지션 (보증금 × 매칭)</h3>
            <div class="quad">
              <svg class="quad__svg" viewBox="0 0 220 180" aria-label="가성비 4분면 그래프">
                <rect x="28" y="12" width="168" height="140" fill="#f7fafb" stroke="#e2e8ea" />
                <!-- 사분면 배경 -->
                <rect x="28" y="12" width="84" height="70" fill="rgba(121, 192, 147, 0.12)" />
                <rect x="112" y="12" width="84" height="70" fill="rgba(0, 119, 141, 0.06)" />
                <rect x="28" y="82" width="84" height="70" fill="rgba(255, 175, 0, 0.08)" />
                <rect x="112" y="82" width="84" height="70" fill="rgba(218, 56, 67, 0.06)" />
                <line x1="112" y1="12" x2="112" y2="152" stroke="#cfd8dc" stroke-dasharray="3 3" />
                <line x1="28" y1="82" x2="196" y2="82" stroke="#cfd8dc" stroke-dasharray="3 3" />

                <text x="70" y="28" text-anchor="middle" class="quad__q">가성비↑</text>
                <text x="154" y="28" text-anchor="middle" class="quad__q">프리미엄</text>
                <text x="70" y="144" text-anchor="middle" class="quad__q">저가·저적합</text>
                <text x="154" y="144" text-anchor="middle" class="quad__q">고가·저적합</text>

                <text x="112" y="170" text-anchor="middle" class="quad__axis">보증금 →</text>
                <text
                  x="14"
                  y="82"
                  text-anchor="middle"
                  class="quad__axis"
                  transform="rotate(-90 14 82)"
                >
                  매칭률 →
                </text>

                <circle
                  v-for="p in peerPoints"
                  :key="p.id"
                  :cx="p.cx"
                  :cy="p.cy"
                  r="4"
                  class="quad__peer"
                />
                <circle
                  v-if="focusPoint"
                  :cx="focusPoint.cx"
                  :cy="focusPoint.cy"
                  r="7"
                  class="quad__focus"
                />
                <text
                  v-if="focusPoint"
                  :x="focusPoint.cx"
                  :y="focusPoint.cy - 10"
                  text-anchor="middle"
                  class="quad__focus-label"
                >
                  이 주택
                </text>
              </svg>
              <p class="quad__caption">
                왼쪽 위(저보증금·고마칭)에 가까울수록 가성비가 높습니다.
                {{ peers.length }}개 후보와 비교한 위치입니다.
              </p>
            </div>
          </section>
        </div>

        <section class="modal__block two-col">
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

        <section class="modal__block">
          <h3>유사한 생활 환경</h3>
          <p class="similar">{{ housing.similarEnv }}</p>
        </section>
      </div>

      <footer class="modal__foot">
        <a
          class="bmc-btn bmc-btn-primary"
          href="https://apply.bmc.busan.kr/co/coa/selectMainView.do"
          target="_blank"
          rel="noopener noreferrer"
        >
          BMC 청약공고 보기
          <img :src="assets.icoArrow" alt="" class="modal__cta-arrow">
        </a>
      </footer>
    </div>
  </div>
</template>

<script>
import { HOUSING_TYPES } from '../data/mockHousings'
import { assets } from '../assets/images'
import { filterNearbyByWalk } from '../utils/walkRadius'

const KIND_LABELS = {
  cafe: '카페',
  culture: '문화',
  nature: '자연',
  shopping: '쇼핑',
  mart: '마트',
  transit: '교통',
  gym: '운동',
  leisure: '여가'
}

export default {
  name: 'AiReportDrawer',
  props: {
    housing: { type: Object, default: null },
    peers: { type: Array, default: () => [] },
    walkMinutes: { type: Number, default: 15 }
  },
  emits: ['close'],
  data() {
    return { assets }
  },
  computed: {
    typeLabel() {
      return HOUSING_TYPES.find((t) => t.id === this.housing?.type)?.label || ''
    },
    commerceList() {
      return filterNearbyByWalk(this.housing?.nearby, this.walkMinutes)
    },
    plotSet() {
      const list = this.peers?.length ? this.peers : this.housing ? [this.housing] : []
      return list.filter((h) => h && h.depositMax != null)
    },
    peerPoints() {
      if (!this.housing) return []
      return this.plotSet
        .filter((h) => h.id !== this.housing.id)
        .map((h) => this.toQuadPoint(h))
    },
    focusPoint() {
      if (!this.housing) return null
      return this.toQuadPoint(this.housing)
    }
  },
  methods: {
    kindLabel(kind) {
      return KIND_LABELS[kind] || '생활'
    },
    toQuadPoint(h) {
      const deposits = this.plotSet.map((x) => x.depositMax)
      const scores = this.plotSet.map((x) => x.matchScore ?? 50)
      const minD = Math.min(...deposits, 300)
      const maxD = Math.max(...deposits, 3000)
      const minS = Math.min(...scores, 0)
      const maxS = Math.max(...scores, 100)
      const nx = maxD === minD ? 0.5 : (h.depositMax - minD) / (maxD - minD)
      const ny = maxS === minS ? 0.5 : ((h.matchScore ?? 50) - minS) / (maxS - minS)
      const cx = 28 + nx * 168
      const cy = 152 - ny * 140
      return { id: h.id, cx, cy }
    }
  }
}
</script>

<style scoped>
.modal-root {
  position: fixed;
  inset: 0;
  z-index: 220;
  display: grid;
  place-items: center;
  padding: 24px 16px;
}

.modal-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(20, 40, 50, 0.45);
  animation: fade 0.2s ease;
}

.modal {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: min(720px, 100%);
  max-height: min(88vh, 860px);
  background: var(--bmc-white);
  border-radius: 16px;
  box-shadow: 0 16px 48px rgba(0, 40, 50, 0.22);
  overflow: hidden;
  animation: pop 0.25s ease;
}

.modal__head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 18px 20px 12px;
  border-bottom: 1px solid var(--bmc-border);
}

.modal__title-wrap {
  display: flex;
  gap: 12px;
  align-items: center;
  min-width: 0;
}

.modal__hero-ico {
  width: 52px;
  height: 52px;
  object-fit: contain;
  flex-shrink: 0;
  border-radius: 12px;
  background: var(--bmc-bg);
}

.modal__eyebrow {
  margin: 0 0 4px;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--bmc-accent);
}

.modal__head h2 {
  margin: 0;
  font-size: 1.2rem;
  color: var(--bmc-primary);
  line-height: 1.3;
}

.modal__close {
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

.modal__close img {
  width: 14px;
  height: 14px;
}

.modal__score {
  display: flex;
  gap: 14px;
  align-items: center;
  padding: 14px 20px;
  background: linear-gradient(120deg, rgba(0, 119, 141, 0.08), rgba(114, 195, 200, 0.12));
}

.ring {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  border: 4px solid var(--bmc-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  flex-shrink: 0;
}

.ring strong {
  font-size: 1.4rem;
  line-height: 1;
  color: var(--bmc-primary);
}

.ring span {
  font-size: 0.72rem;
  line-height: 1;
  margin-left: 1px;
  align-self: center;
  color: var(--bmc-text-muted);
}

.modal__summary {
  margin: 0 0 4px;
  font-weight: 700;
  font-size: 0.92rem;
}

.modal__sub {
  margin: 0;
  font-size: 0.76rem;
  color: var(--bmc-text-muted);
  line-height: 1.45;
}

.modal__body {
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding-bottom: 8px;
}

.modal__block {
  padding: 14px 20px;
  border-bottom: 1px solid var(--bmc-border);
}

.modal__block h3 {
  margin: 0 0 10px;
  font-size: 0.88rem;
  color: var(--bmc-text);
}

.modal__walk-hint {
  margin: -4px 0 10px;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--bmc-primary);
}

.modal__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
}

.modal__grid .modal__block {
  border-right: 1px solid var(--bmc-border);
}

.modal__grid .modal__block:last-child {
  border-right: none;
}

.bullet-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.bullet-list li {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  margin-bottom: 6px;
  font-size: 0.84rem;
  color: var(--bmc-text-muted);
}

.bullet-list img {
  width: 12px;
  height: 15px;
  margin-top: 2px;
  flex-shrink: 0;
}

.commerce {
  list-style: none;
  margin: 0;
  padding: 0;
}

.commerce li {
  display: grid;
  grid-template-columns: 44px 1fr auto;
  gap: 8px;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px dashed var(--bmc-border);
  font-size: 0.82rem;
}

.commerce__kind {
  display: inline-flex;
  justify-content: center;
  padding: 2px 0;
  border-radius: 4px;
  background: rgba(0, 78, 162, 0.08);
  color: var(--bmc-link);
  font-size: 0.68rem;
  font-weight: 700;
}

.commerce__name {
  color: var(--bmc-text);
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.commerce em {
  font-style: normal;
  font-weight: 700;
  color: var(--bmc-primary);
  white-space: nowrap;
}

.modal__empty {
  margin: 0;
  font-size: 0.8rem;
  color: var(--bmc-text-light);
}

.quad__svg {
  width: 100%;
  max-width: 280px;
  height: auto;
  display: block;
  margin: 0 auto;
}

.quad__q {
  font-size: 8px;
  fill: var(--bmc-text-light);
  font-weight: 600;
}

.quad__axis {
  font-size: 9px;
  fill: var(--bmc-text-muted);
  font-weight: 600;
}

.quad__peer {
  fill: #9bb8b8;
  opacity: 0.85;
}

.quad__focus {
  fill: var(--bmc-accent);
  stroke: #fff;
  stroke-width: 2;
}

.quad__focus-label {
  font-size: 9px;
  font-weight: 700;
  fill: var(--bmc-primary);
}

.quad__caption {
  margin: 8px 0 0;
  font-size: 0.72rem;
  color: var(--bmc-text-muted);
  line-height: 1.45;
  text-align: center;
}

.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.two-col ul {
  margin: 0;
  padding-left: 18px;
  font-size: 0.82rem;
  line-height: 1.55;
  color: var(--bmc-text-muted);
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

.modal__foot {
  padding: 12px 20px 18px;
  border-top: 1px solid var(--bmc-border);
  background: var(--bmc-white);
}

.modal__foot .bmc-btn {
  width: 100%;
}

.modal__cta-arrow {
  width: 13px;
  height: 13px;
  filter: brightness(0) invert(1);
}

@keyframes pop {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
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

@media (max-width: 720px) {
  .modal__grid,
  .two-col {
    grid-template-columns: 1fr;
  }

  .modal__grid .modal__block {
    border-right: none;
  }
}
</style>