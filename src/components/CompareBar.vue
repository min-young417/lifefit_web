<template>
  <div v-if="items.length" class="compare">
    <div class="compare__inner">
      <div class="compare__label">
        <strong>비교함</strong>
        <span>{{ items.length }}/3</span>
      </div>

      <div class="compare__cards">
        <div v-for="item in items" :key="item.id" class="compare__card">
          <div>
            <strong>{{ item.name }}</strong>
            <small>매칭 {{ item.matchScore }}% · {{ item.district }}</small>
          </div>
          <button type="button" class="compare__x" aria-label="제거" @click="$emit('remove', item.id)">
            <img :src="assets.icoClose" alt="">
          </button>
        </div>
      </div>

      <button
        type="button"
        class="bmc-btn bmc-btn-primary compare__btn"
        :disabled="items.length < 2"
        @click="$emit('open')"
      >
        비교하기
      </button>
    </div>

    <div v-if="open" class="compare-modal">
      <div class="compare-modal__backdrop" @click="$emit('close')" />
      <div class="compare-modal__panel" role="dialog" aria-label="주택 비교">
        <header>
          <h3>
            <img :src="assets.guide03" alt="" class="compare__title-ico">
            선택 주택 비교
          </h3>
          <button type="button" class="compare__close-btn" @click="$emit('close')">
            <img :src="assets.icoClose" alt="">
            닫기
          </button>
        </header>
        <div class="compare-table-wrap">
          <table>
            <thead>
              <tr>
                <th>항목</th>
                <th v-for="item in items" :key="item.id">{{ item.name }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>매칭률</th>
                <td v-for="item in items" :key="item.id + 's'">
                  <strong>{{ item.matchScore }}%</strong>
                </td>
              </tr>
              <tr>
                <th>지역</th>
                <td v-for="item in items" :key="item.id + 'd'">{{ item.district }}</td>
              </tr>
              <tr>
                <th>보증금</th>
                <td v-for="item in items" :key="item.id + 'p'">
                  {{ item.depositMin }}–{{ item.depositMax }}만원
                </td>
              </tr>
              <tr>
                <th>면적</th>
                <td v-for="item in items" :key="item.id + 'a'">
                  {{ item.areaMin }}–{{ item.areaMax }}㎡
                </td>
              </tr>
              <tr>
                <th>생활권</th>
                <td v-for="item in items" :key="item.id + 'u'">{{ item.summary }}</td>
              </tr>
              <tr>
                <th>카페</th>
                <td v-for="item in items" :key="item.id + 'c'">{{ item.infra.cafe }}</td>
              </tr>
              <tr>
                <th>운동</th>
                <td v-for="item in items" :key="item.id + 'g'">{{ item.infra.gym }}</td>
              </tr>
              <tr>
                <th>교통</th>
                <td v-for="item in items" :key="item.id + 't'">{{ item.infra.transit }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { assets } from '../assets/images'

export default {
  name: 'CompareBar',
  props: {
    items: { type: Array, default: () => [] },
    open: Boolean
  },
  emits: ['remove', 'open', 'close'],
  data() {
    return { assets }
  }
}
</script>

<style scoped>
.compare {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 150;
  padding: 0 16px 16px;
  pointer-events: none;
}

.compare__inner {
  pointer-events: auto;
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.97);
  border: 1px solid var(--bmc-border);
  box-shadow: 0 -4px 28px rgba(0, 50, 70, 0.16);
}

.compare__label {
  display: flex;
  flex-direction: column;
  min-width: 64px;
}

.compare__label strong {
  color: var(--bmc-primary);
  font-size: 0.9rem;
}

.compare__label span {
  font-size: 0.72rem;
  color: var(--bmc-text-muted);
}

.compare__cards {
  display: flex;
  flex: 1;
  gap: 8px;
  overflow: auto;
}

.compare__card {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 180px;
  padding: 8px 10px;
  border-radius: 10px;
  background: var(--bmc-bg);
}

.compare__card strong {
  display: block;
  font-size: 0.8rem;
  line-height: 1.3;
}

.compare__card small {
  font-size: 0.7rem;
  color: var(--bmc-text-muted);
}

.compare__x {
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 4px;
  display: grid;
  place-items: center;
}

.compare__x img {
  width: 12px;
  height: 12px;
  opacity: 0.65;
}

.compare__title-ico {
  width: 28px;
  height: 28px;
  vertical-align: middle;
  margin-right: 6px;
}

.compare__close-btn {
  display: inline-flex !important;
  align-items: center;
  gap: 6px;
}

.compare__close-btn img {
  width: 12px;
  height: 12px;
}

.compare__btn {
  min-height: 42px;
  white-space: nowrap;
}

.compare__btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.compare-modal {
  pointer-events: auto;
}

.compare-modal__backdrop {
  position: fixed;
  inset: 0;
  background: rgba(20, 40, 50, 0.4);
}

.compare-modal__panel {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: min(860px, calc(100% - 32px));
  max-height: min(80vh, 640px);
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
}

.compare-modal__panel header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 18px;
  border-bottom: 1px solid var(--bmc-border);
}

.compare-modal__panel h3 {
  margin: 0;
  color: var(--bmc-primary);
  display: inline-flex;
  align-items: center;
}

.compare-modal__panel header button {
  border: none;
  background: var(--bmc-bg);
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

.compare-table-wrap {
  overflow: auto;
  padding: 8px 12px 16px;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.84rem;
}

th,
td {
  padding: 10px 12px;
  border-bottom: 1px solid var(--bmc-border);
  text-align: left;
  vertical-align: top;
}

thead th {
  background: rgba(0, 119, 141, 0.06);
  color: var(--bmc-primary);
}

tbody th {
  width: 88px;
  color: var(--bmc-text-muted);
  font-weight: 600;
  background: #fafbfc;
}

@media (max-width: 800px) {
  .compare__inner {
    flex-wrap: wrap;
  }

  .compare__btn {
    width: 100%;
  }
}
</style>
