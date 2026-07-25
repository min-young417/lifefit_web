<template>
  <aside class="list">
    <header class="list__head">
      <h2>맞춤 추천 목록</h2>
      <p v-if="!searched">상단 필터로 조건을 설정한 뒤 검색해 주세요.</p>
      <p v-else-if="loading">생활권 데이터를 매칭하는 중…</p>
      <p v-else>{{ items.length }}건 · 매칭률 순</p>
    </header>

    <div class="list__body">
      <div v-if="loading" class="skel-wrap">
        <div v-for="n in 3" :key="n" class="skel" />
      </div>

      <div v-else-if="!searched" class="empty">
        <img :src="assets.guide01" alt="" class="empty__img">
        <p>상세조건을 반영한<br>맞춤 추천이 여기에 표시됩니다.</p>
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

            <div class="card__meta">
              <span>{{ item.district }}</span>
              <span>보증금 {{ item.depositMin }}–{{ item.depositMax }}만원</span>
            </div>

            <div class="card__tags">
              <span v-for="(h, i) in item.highlights.slice(0, 2)" :key="i">{{ h }}</span>
            </div>
          </div>
        </article>
      </template>
    </div>
  </aside>
</template>

<script>
import { assets } from '../assets/images'

export default {
  name: 'RecommendList',
  props: {
    items: { type: Array, default: () => [] },
    loading: Boolean,
    searched: Boolean,
    selectedId: { type: String, default: null },
    compareIds: { type: Array, default: () => [] }
  },
  emits: ['select', 'toggle-compare'],
  data() {
    return { assets }
  },
  methods: {
    thumb(item) {
      return `linear-gradient(145deg, hsl(${item.imageHue}, 42%, 42%), hsl(${item.imageHue + 30}, 35%, 62%))`
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
  border-right: 1px solid var(--bmc-border);
}

.list__head {
  padding: 14px 14px 10px;
  border-bottom: 1px solid var(--bmc-border);
}

.list__head h2 {
  margin: 0 0 2px;
  font-size: 0.95rem;
  color: var(--bmc-primary);
}

.list__head p {
  margin: 0;
  font-size: 0.72rem;
  color: var(--bmc-text-muted);
}

.list__body {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px 10px 96px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.empty {
  margin-top: 28px;
  text-align: center;
  color: var(--bmc-text-muted);
  font-size: 0.85rem;
  line-height: 1.6;
}

.empty__img {
  width: 72px;
  height: 72px;
  object-fit: contain;
  margin-bottom: 10px;
}

.skel {
  height: 140px;
  border-radius: 12px;
  background: linear-gradient(90deg, #eee, #f7f7f7, #eee);
  background-size: 200% 100%;
  animation: shimmer 1.2s infinite;
}

.card {
  flex: 0 0 auto;
  border: 1px solid var(--bmc-border);
  border-radius: 12px;
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
  height: 100px;
  overflow: hidden;
}

.card__house {
  position: absolute;
  left: 50%;
  top: 54%;
  transform: translate(-50%, -50%);
  width: 48px;
  height: 50px;
  opacity: 0.35;
  filter: brightness(0) invert(1);
}

.card__score {
  position: absolute;
  right: 8px;
  top: 8px;
  min-width: 44px;
  padding: 4px 6px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.95);
  color: var(--bmc-primary);
  font-weight: 800;
  font-size: 0.88rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}

.card__media .bmc-badge {
  position: absolute;
  left: 8px;
  top: 8px;
}

.card__body {
  padding: 10px 12px 12px;
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
  font-size: 0.88rem;
  line-height: 1.35;
  word-break: keep-all;
}

.card__check {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.7rem;
  color: var(--bmc-text-muted);
  white-space: nowrap;
  cursor: pointer;
}

.card__summary {
  margin: 4px 0 6px;
  font-size: 0.75rem;
  color: var(--bmc-secondary-deep);
  font-weight: 600;
}

.card__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 10px;
  margin-bottom: 6px;
  font-size: 0.7rem;
  color: var(--bmc-text-muted);
}

.card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 8px;
}

.card__tags span {
  padding: 2px 7px;
  border-radius: 999px;
  background: var(--bmc-bg);
  font-size: 0.66rem;
  color: var(--bmc-text-muted);
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