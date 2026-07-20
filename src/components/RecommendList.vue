<template>
  <aside class="list">
    <header class="list__head">
      <h2>맞춤 추천 주택 목록</h2>
      <p v-if="!searched">좌측 조건을 설정한 뒤 검색해 주세요.</p>
      <p v-else-if="loading">생활권 데이터를 매칭하는 중…</p>
      <p v-else>{{ items.length }}건 · 매칭률 순</p>
    </header>

    <div class="list__body">
      <div v-if="loading" class="skel-wrap">
        <div v-for="n in 3" :key="n" class="skel" />
      </div>

      <div v-else-if="!searched" class="empty">
        <img :src="assets.guide01" alt="" class="empty__img">
        <p>취향·인프라 가중치를 반영한<br>맞춤 추천이 여기에 표시됩니다.</p>
      </div>

      <div v-else-if="!items.length" class="empty">
        <img :src="assets.guide03" alt="" class="empty__img">
        <p>조건에 맞는 주택이 없습니다.<br>필터를 조금 넓혀보세요.</p>
      </div>

      <template v-else>
        <article
          v-for="item in items"
          :key="item.id"
          class="card"
          :class="{ 'is-active': selectedId === item.id }"
          @click="$emit('select', item)"
        >
          <div class="card__media" :style="{ background: thumb(item) }">
            <img :src="assets.subappBg" alt="" class="card__house">
            <img
              v-if="typeIcon(item.type)"
              :src="typeIcon(item.type)"
              alt=""
              class="card__type"
            >
            <span class="card__score">{{ item.matchScore }}%</span>
            <span class="bmc-badge" :class="statusClass(item.status)">
              {{ statusLabel(item.status) }}
            </span>
          </div>

          <div class="card__body">
            <div class="card__top">
              <h3>{{ item.name }}</h3>
              <label class="card__check" @click.stop>
                <input
                  type="checkbox"
                  :checked="compareIds.includes(item.id)"
                  :disabled="!compareIds.includes(item.id) && compareIds.length >= 3"
                  @change="$emit('toggle-compare', item)"
                >
                비교
              </label>
            </div>

            <p class="card__summary">{{ item.summary }}</p>

            <ul class="card__near">
              <li v-for="(n, i) in item.nearby.slice(0, 3)" :key="i">
                <span class="card__near-name">
                  <img :src="assets.icoBullet" alt="" class="card__bullet">
                  {{ n.name }}
                </span>
                <em>{{ n.dist }}</em>
              </li>
            </ul>

            <div class="card__meta">
              <span>{{ item.district }}</span>
              <span>보증금 {{ item.depositMin }}–{{ item.depositMax }}만원</span>
              <span>{{ item.areaMin }}–{{ item.areaMax }}㎡</span>
            </div>

            <div class="card__tags">
              <span v-for="(h, i) in item.highlights.slice(0, 3)" :key="i">{{ h }}</span>
            </div>

            <button
              type="button"
              class="card__ai"
              @click.stop="$emit('open-report', item)"
            >
              AI 리포트 보기
              <img :src="assets.icoArrow" alt="" class="card__ai-arrow">
            </button>
          </div>
        </article>
      </template>
    </div>
  </aside>
</template>

<script>
import { assets, housingTypeIcons } from '../assets/images'

export default {
  name: 'RecommendList',
  props: {
    items: { type: Array, default: () => [] },
    loading: Boolean,
    searched: Boolean,
    selectedId: { type: String, default: null },
    compareIds: { type: Array, default: () => [] }
  },
  emits: ['select', 'open-report', 'toggle-compare'],
  data() {
    return { assets }
  },
  methods: {
    thumb(item) {
      return `linear-gradient(145deg, hsl(${item.imageHue}, 42%, 42%), hsl(${item.imageHue + 30}, 35%, 62%))`
    },
    typeIcon(type) {
      return housingTypeIcons[type]?.idle || null
    },
    statusLabel(s) {
      return { open: '모집중', soon: '모집예정', closed: '마감' }[s] || s
    },
    statusClass(s) {
      return s === 'open' ? 'bmc-badge-open' : 'bmc-badge-accent'
    }
  }
}
</script>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--bmc-white);
  border-left: 1px solid var(--bmc-border);
}

.list__head {
  padding: 16px 16px 12px;
  border-bottom: 1px solid var(--bmc-border);
}

.list__head h2 {
  margin: 0 0 4px;
  font-size: 1rem;
  color: var(--bmc-primary);
}

.list__head p {
  margin: 0;
  font-size: 0.78rem;
  color: var(--bmc-text-muted);
}

.list__body {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 12px 12px 96px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.empty {
  margin-top: 32px;
  text-align: center;
  color: var(--bmc-text-muted);
  font-size: 0.9rem;
  line-height: 1.6;
}

.empty__img {
  width: 88px;
  height: 88px;
  object-fit: contain;
  margin-bottom: 12px;
}

.skel {
  height: 160px;
  border-radius: 12px;
  background: linear-gradient(90deg, #eee, #f7f7f7, #eee);
  background-size: 200% 100%;
  animation: shimmer 1.2s infinite;
}

.card {
  flex: 0 0 auto;
  border: 1px solid var(--bmc-border);
  border-radius: 14px;
  overflow: hidden;
  background: var(--bmc-white);
  cursor: pointer;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.card:hover,
.card.is-active {
  border-color: var(--bmc-primary);
  box-shadow: var(--bmc-shadow);
}

.card__media {
  position: relative;
  height: 148px;
  overflow: hidden;
}

.card__house {
  position: absolute;
  left: 50%;
  top: 54%;
  transform: translate(-50%, -50%);
  width: 64px;
  height: 66px;
  opacity: 0.35;
  filter: brightness(0) invert(1);
}

.card__type {
  position: absolute;
  left: 12px;
  bottom: 12px;
  width: 30px;
  height: 30px;
}

.card__score {
  position: absolute;
  right: 10px;
  top: 10px;
  min-width: 52px;
  padding: 6px 8px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.95);
  color: var(--bmc-primary);
  font-weight: 800;
  font-size: 1rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}

.card__media .bmc-badge {
  position: absolute;
  left: 10px;
  top: 10px;
}

.card__body {
  padding: 14px 14px 16px;
}

.card__top {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: flex-start;
}

.card__top h3 {
  margin: 0;
  flex: 1;
  min-width: 0;
  font-size: 0.95rem;
  line-height: 1.35;
  word-break: keep-all;
  overflow-wrap: anywhere;
}

.card__check {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.72rem;
  color: var(--bmc-text-muted);
  white-space: nowrap;
  cursor: pointer;
}

.card__summary {
  margin: 6px 0 8px;
  font-size: 0.8rem;
  color: var(--bmc-secondary-deep);
  font-weight: 600;
}

.card__near {
  margin: 0 0 8px;
  padding: 0;
  list-style: none;
  font-size: 0.78rem;
  color: var(--bmc-text-muted);
}

.card__near li {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  padding: 2px 0;
  align-items: center;
}

.card__near-name {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
}

.card__bullet {
  width: 10px;
  height: 12px;
  flex-shrink: 0;
}

.card__near em {
  font-style: normal;
  color: var(--bmc-text);
  font-weight: 600;
}

.card__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 10px;
  margin-bottom: 8px;
  font-size: 0.72rem;
  color: var(--bmc-text-muted);
}

.card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 10px;
}

.card__tags span {
  padding: 3px 8px;
  border-radius: 999px;
  background: var(--bmc-bg);
  font-size: 0.7rem;
  color: var(--bmc-text-muted);
}

.card__ai {
  width: 100%;
  height: 36px;
  border: 1px solid var(--bmc-primary);
  border-radius: 10px;
  background: rgba(0, 119, 141, 0.06);
  color: var(--bmc-primary);
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.card__ai-arrow {
  width: 12px;
  height: 12px;
}

.card__ai:hover {
  background: var(--bmc-primary);
  color: #fff;
}

.card__ai:hover .card__ai-arrow {
  filter: brightness(0) invert(1);
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
