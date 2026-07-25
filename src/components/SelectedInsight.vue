<template>
  <aside class="insight">
    <header class="insight__head">
      <h2>선택 주택</h2>
      <p>지도·목록에서 고른 주택의 입지 요약</p>
    </header>

    <div v-if="!housing" class="insight__empty">
      <p>주택을 선택하면<br>이름·매칭·위치가 여기에 표시됩니다.</p>
    </div>

    <template v-else>
      <div class="insight__card">
        <div class="insight__score-row">
          <span class="insight__badge">매칭</span>
          <strong class="insight__score">{{ housing.matchScore }}%</strong>
        </div>
        <h3 class="insight__name">{{ housing.name }}</h3>
        <p class="insight__summary">{{ housing.summary }}</p>
        <p class="insight__meta">
          <span>{{ housing.district }}</span>
          <span>보증금 {{ housing.depositMin }}–{{ housing.depositMax }}만원</span>
          <span>{{ housing.areaMin }}–{{ housing.areaMax }}㎡</span>
        </p>
        <p v-if="housing.competitionRate != null" class="insight__competition">
          최근 경쟁률 <strong>{{ housing.competitionRate }}:1</strong>
          <span :class="'level-' + competitionLevelId">{{ competitionLevelLabel }}</span>
          <em>({{ housing.competitionDate }} 모집 기준)</em>
        </p>
        <p v-else class="insight__competition insight__competition--none">경쟁률 정보 없음</p>
      </div>

      <section class="insight__radar-block">
        <h4>입지 성향</h4>
        <svg class="insight__radar" viewBox="0 0 160 160" aria-label="선택 주택 입지 레이더">
          <g class="radar-grid">
            <polygon
              v-for="(poly, i) in radarGuides"
              :key="'g' + i"
              :points="poly"
              fill="none"
              stroke="#e2e8ea"
              stroke-width="1"
            />
            <line
              v-for="(line, i) in radarAxes"
              :key="'a' + i"
              :x1="80"
              :y1="80"
              :x2="line.x"
              :y2="line.y"
              stroke="#e2e8ea"
              stroke-width="1"
            />
          </g>
          <polygon
            :points="radarPoints"
            fill="rgba(0,119,141,0.22)"
            stroke="#00778d"
            stroke-width="2"
          />
          <circle
            v-for="(p, i) in radarDots"
            :key="'d' + i"
            :cx="p.x"
            :cy="p.y"
            r="3"
            fill="#00778d"
          />
          <text
            v-for="(lb, i) in radarLabels"
            :key="'l' + i"
            :x="lb.x"
            :y="lb.y"
            text-anchor="middle"
            class="radar-label"
          >
            {{ lb.text }}
          </text>
        </svg>
      </section>

      <section v-if="commuteDestination" class="insight__commute">
        <h4>{{ commuteDestination.name }}까지</h4>
        <p v-if="commuteRouteLoading" class="insight__commute-loading">경로 계산 중…</p>
        <template v-else>
          <p v-if="commuteRoute?.transit" class="insight__commute-row">
            <span class="insight__commute-icon">🚌</span>
            대중교통 {{ formatDuration(commuteRoute.transit.totalTime) }}
            <em>{{ commuteRoute.transit.transfers ? `환승 ${commuteRoute.transit.transfers}회` : '환승 없음' }}</em>
          </p>
          <p v-if="walkVisible" class="insight__commute-row">
            <span class="insight__commute-icon">🚶</span>
            도보 {{ formatDuration(commuteRoute.walk.totalTime) }}
          </p>
          <p v-if="!commuteRoute?.transit && !walkVisible" class="insight__commute-empty">
            {{ commuteEmptyMessage }}
          </p>
        </template>
      </section>

      <p class="insight__walk">도보 {{ walkMinutes }}분권 · {{ nearbyList.length }}곳</p>
      <ul class="insight__near">
        <li v-for="(n, i) in nearbyList.slice(0, 8)" :key="i">
          <span>{{ n.name }}</span>
          <em>{{ n.dist }}</em>
        </li>
        <li v-if="!nearbyList.length && !lifestyles.length" class="insight__near-empty">
          <span>상세조건을 선택하면 실제 상권이 표시됩니다</span>
        </li>
        <li v-else-if="!nearbyList.length" class="insight__near-empty">
          <span>이 도보 거리 안에 해당 시설이 없습니다</span>
        </li>
      </ul>

      <button type="button" class="insight__detail" @click="$emit('open-report', housing)">
        상세 리포트 보기
      </button>
    </template>
  </aside>
</template>

<script>
import { formatDuration } from '../utils/kakaoRouting'
import { tagScore, competitionLevel, COMPETITION_LEVEL_LABEL } from '../utils/matchScore'
import { LIFESTYLE_TAGS } from '../data/mockHousings'

/** 레이더에 6칸이 다 안 찰 때 채워 넣을 우선순위(필수 생활 인프라 위주) */
const FALLBACK_PRIORITY = [
  'transit', 'mart', 'hospital', 'cafe', 'convenience', 'culture', 'bank', 'market', 'childcare', 'gym', 'parking'
]

const SHORT_LABEL = {
  cafe: '카페', hotplace: '핫플', gym: '헬스', pilates: '필라테스', culture: '문화',
  convenience: '편의점', daiso: '다이소', mart: '마트', hospital: '병원', pharmacy: '약국',
  market: '시장', parking: '주차', transit: '교통', childcare: '육아', bank: '은행',
  lowCompetition: '경쟁률'
}

const TAG_IDS = new Set(LIFESTYLE_TAGS.map((t) => t.id))

/** 통근 도보 경로는 30분을 넘으면 화면에 표시하지 않음 */
const MAX_WALK_COMMUTE_SECONDS = 30 * 60

function polar(i, total, r, cx = 80, cy = 80) {
  const angle = -Math.PI / 2 + (i / total) * Math.PI * 2
  return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r }
}

export default {
  name: 'SelectedInsight',
  props: {
    housing: { type: Object, default: null },
    walkMinutes: { type: Number, default: 15 },
    lifestyles: { type: Array, default: () => [] },
    nearbyPlaces: { type: Array, default: () => [] },
    commuteDestination: { type: Object, default: null },
    commuteRoute: { type: Object, default: null },
    commuteRouteLoading: { type: Boolean, default: false }
  },
  emits: ['open-report'],
  computed: {
    competitionLevelId() {
      return this.housing ? competitionLevel(this.housing) : null
    },
    competitionLevelLabel() {
      return this.competitionLevelId ? COMPETITION_LEVEL_LABEL[this.competitionLevelId] : ''
    },
    walkVisible() {
      return !!(this.commuteRoute?.walk && this.commuteRoute.walk.totalTime <= MAX_WALK_COMMUTE_SECONDS)
    },
    commuteEmptyMessage() {
      const walk = this.commuteRoute?.walk
      if (walk && walk.totalTime > MAX_WALK_COMMUTE_SECONDS) {
        return '도보로 30분 넘게 걸려 표시하지 않습니다'
      }
      return this.commuteRoute?.error || '경로를 찾을 수 없습니다'
    },
    /** 실제 카카오 장소검색 결과를 카테고리별 최단거리 1곳씩만 남겨 거리순 정렬 */
    nearbyList() {
      const sorted = [...this.nearbyPlaces].sort((a, b) => (a.distanceM ?? 9e9) - (b.distanceM ?? 9e9))
      const seenTags = new Set()
      const deduped = []
      sorted.forEach((p) => {
        if (seenTags.has(p.tag)) return
        seenTags.add(p.tag)
        deduped.push(p)
      })
      return deduped.map((p) => ({
        name: p.name,
        dist: p.distanceM != null
          ? (p.distanceM >= 1000 ? `${(p.distanceM / 1000).toFixed(1)}km` : `${Math.round(p.distanceM)}m`)
          : ''
      }))
    },
    /** 선택한 취향 태그를 레이더 축으로. 6개 미만이면 필수 인프라 우선순위로 채움 */
    radarKeys() {
      const selected = LIFESTYLE_TAGS
        .filter((t) => this.lifestyles.includes(t.id))
        .map((t) => t.id)

      const keys = selected.slice(0, 6)
      if (keys.length < 6) {
        for (const id of FALLBACK_PRIORITY) {
          if (keys.length >= 6) break
          if (TAG_IDS.has(id) && !keys.includes(id)) keys.push(id)
        }
      }
      return keys.map((id) => ({ key: id, label: SHORT_LABEL[id] || id }))
    },
    radarGuides() {
      return [0.35, 0.65, 1].map((scale) =>
        this.radarKeys.map((_, i) => {
          const p = polar(i, this.radarKeys.length, 52 * scale)
          return `${p.x},${p.y}`
        }).join(' ')
      )
    },
    radarAxes() {
      return this.radarKeys.map((_, i) => polar(i, this.radarKeys.length, 52))
    },
    radarPoints() {
      if (!this.housing) return ''
      return this.radarKeys.map((row, i) => {
        const v = tagScore(this.housing, row.key) / 100
        const p = polar(i, this.radarKeys.length, 52 * v)
        return `${p.x},${p.y}`
      }).join(' ')
    },
    radarDots() {
      if (!this.housing) return []
      return this.radarKeys.map((row, i) => {
        const v = tagScore(this.housing, row.key) / 100
        return polar(i, this.radarKeys.length, 52 * v)
      })
    },
    radarLabels() {
      return this.radarKeys.map((row, i) => {
        const p = polar(i, this.radarKeys.length, 68)
        return { ...p, text: row.label }
      })
    }
  },
  methods: {
    formatDuration
  }
}
</script>

<style scoped>
.insight {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--bmc-white);
  border-left: 1px solid var(--bmc-border);
  overflow: auto;
}

.insight__head {
  padding: 14px 16px 12px;
  border-bottom: 1px solid var(--bmc-border);
}

.insight__head h2 {
  margin: 0 0 2px;
  font-size: 0.95rem;
  color: var(--bmc-primary);
}

.insight__head p {
  margin: 0;
  font-size: 0.72rem;
  color: var(--bmc-text-muted);
}

.insight__empty {
  flex: 1;
  display: grid;
  place-items: center;
  padding: 24px;
  text-align: center;
  font-size: 0.84rem;
  color: var(--bmc-text-muted);
  line-height: 1.55;
}

.insight__card {
  padding: 16px;
  background: linear-gradient(160deg, rgba(0, 119, 141, 0.07), rgba(114, 195, 200, 0.1));
  border-bottom: 1px solid var(--bmc-border);
}

.insight__score-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.insight__badge {
  display: inline-flex;
  align-items: center;
  height: 22px;
  padding: 0 8px;
  border-radius: 6px;
  background: var(--bmc-accent);
  color: #5a3d00;
  font-size: 0.68rem;
  font-weight: 800;
}

.insight__score {
  font-size: 1.35rem;
  color: var(--bmc-primary);
  line-height: 1;
}

.insight__name {
  margin: 0 0 6px;
  font-size: 1.05rem;
  color: var(--bmc-primary);
  line-height: 1.35;
  word-break: keep-all;
}

.insight__summary {
  margin: 0 0 10px;
  font-size: 0.84rem;
  font-weight: 600;
  color: var(--bmc-secondary-deep);
  line-height: 1.4;
}

.insight__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 10px;
  margin: 0;
  font-size: 0.72rem;
  color: var(--bmc-text-muted);
}

.insight__competition {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 8px 0 0;
  font-size: 0.75rem;
  color: var(--bmc-text);
}

.insight__competition strong {
  color: var(--bmc-primary);
}

.insight__competition em {
  font-style: normal;
  color: var(--bmc-text-muted);
  font-size: 0.7rem;
}

.insight__competition span {
  display: inline-flex;
  align-items: center;
  height: 18px;
  padding: 0 7px;
  border-radius: 999px;
  font-size: 0.68rem;
  font-weight: 700;
}

.insight__competition span.level-low {
  background: rgba(46, 158, 79, 0.15);
  color: #1f7a3d;
}

.insight__competition span.level-mid {
  background: rgba(255, 175, 0, 0.18);
  color: #8a5a00;
}

.insight__competition span.level-high {
  background: rgba(226, 62, 87, 0.14);
  color: #b5203a;
}

.insight__competition--none {
  color: var(--bmc-text-muted);
  font-size: 0.72rem;
}

.insight__radar-block {
  padding: 14px 12px 8px;
  text-align: center;
}

.insight__radar-block h4 {
  margin: 0 0 4px;
  font-size: 0.8rem;
  color: var(--bmc-text);
  text-align: left;
  padding: 0 4px;
}

.insight__radar {
  width: 200px;
  height: 200px;
}

.radar-label {
  font-size: 9px;
  fill: var(--bmc-text-muted);
  font-weight: 600;
}

.insight__commute {
  margin: 0 16px 12px;
  padding: 10px 12px;
  border-radius: 10px;
  background: rgba(0, 78, 162, 0.06);
  border: 1px solid rgba(0, 78, 162, 0.14);
}

.insight__commute h4 {
  margin: 0 0 6px;
  font-size: 0.78rem;
  color: var(--bmc-link, #004ea2);
}

.insight__commute-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0;
  padding: 3px 0;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--bmc-text);
}

.insight__commute-icon {
  font-size: 0.9rem;
}

.insight__commute-row em {
  font-style: normal;
  margin-left: auto;
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--bmc-text-muted);
}

.insight__commute-loading,
.insight__commute-empty {
  margin: 0;
  font-size: 0.78rem;
  color: var(--bmc-text-muted);
}

.insight__walk {
  margin: 0;
  padding: 0 16px 6px;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--bmc-primary);
}

.insight__near {
  margin: 0;
  padding: 0 16px 12px;
  list-style: none;
}

.insight__near-empty span {
  color: var(--bmc-text-muted);
}

.insight__near li {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  padding: 7px 0;
  border-bottom: 1px dashed var(--bmc-border);
  font-size: 0.78rem;
  color: var(--bmc-text-muted);
}

.insight__near em {
  font-style: normal;
  font-weight: 700;
  color: var(--bmc-primary);
  white-space: nowrap;
}

.insight__detail {
  margin: auto 16px 16px;
  height: 40px;
  border: 1px solid var(--bmc-primary);
  border-radius: 10px;
  background: rgba(0, 119, 141, 0.06);
  color: var(--bmc-primary);
  font-size: 0.84rem;
  font-weight: 700;
  cursor: pointer;
}

.insight__detail:hover {
  background: var(--bmc-primary);
  color: #fff;
}
</style>