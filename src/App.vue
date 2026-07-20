<template>
  <div class="app-shell" :class="{ 'is-workspace': view === 'workspace' }">
    <AppHeader
      :view="view"
      @go-home="view = 'landing'"
      @go-workspace="enterWorkspace"
    />

    <LandingHero v-if="view === 'landing'" @start="enterWorkspace" />

    <main v-else class="workspace">
      <PreferencePanel
        v-model="prefs"
        class="workspace__pref"
        @search="onSearch"
      />

      <LifestyleMap
        class="workspace__map"
        :housings="filteredResults"
        :prefs="activePrefs"
        :selected="selected"
        @select="selectHousing"
        @query="onMapQuery"
      />

      <RecommendList
        class="workspace__list"
        :items="filteredResults"
        :loading="loading"
        :searched="searched"
        :selected-id="selected?.id"
        :compare-ids="compareIds"
        @select="selectHousing"
        @open-report="openReport"
        @toggle-compare="toggleCompare"
      />
    </main>

    <AiReportDrawer :housing="reportHousing" @close="reportHousing = null" />

    <CompareBar
      :items="compareItems"
      :open="compareOpen"
      @remove="removeCompare"
      @open="compareOpen = true"
      @close="compareOpen = false"
    />

    <button
      v-show="showTop"
      type="button"
      class="to-top"
      aria-label="맨 위로"
      @click="scrollTop"
    >
      <img :src="assets.icoTop" alt="">
    </button>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import LandingHero from './components/LandingHero.vue'
import PreferencePanel from './components/PreferencePanel.vue'
import LifestyleMap from './components/LifestyleMap.vue'
import RecommendList from './components/RecommendList.vue'
import AiReportDrawer from './components/AiReportDrawer.vue'
import CompareBar from './components/CompareBar.vue'
import { mockHousings } from './data/mockHousings'
import { rankHousings } from './utils/matchScore'
import { assets } from './assets/images'

const initialPrefs = () => ({
  eligibility: ['youth'],
  types: [],
  lifestyles: ['leisure', 'culture'],
  infraWeights: { cafe: 80, gym: 70, culture: 50, mart: 40 },
  districts: [],
  depositMax: 2000,
  areaMin: 20,
  areaMax: 60,
  commuteHub: '',
  commuteMinutes: 30,
  commuteHubLabel: ''
})

export default {
  name: 'App',
  components: {
    AppHeader,
    LandingHero,
    PreferencePanel,
    LifestyleMap,
    RecommendList,
    AiReportDrawer,
    CompareBar
  },
  data() {
    return {
      assets,
      view: 'landing',
      prefs: initialPrefs(),
      activePrefs: initialPrefs(),
      results: [],
      loading: false,
      searched: false,
      selected: null,
      reportHousing: null,
      compareIds: [],
      compareOpen: false,
      nameQuery: '',
      searchTimer: null,
      showTop: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll, { passive: true })
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  },
  computed: {
    filteredResults() {
      const q = this.nameQuery.trim().toLowerCase()
      if (!q) return this.results
      return this.results.filter((h) => h.name.toLowerCase().includes(q))
    },
    compareItems() {
      return this.compareIds
        .map((id) => this.results.find((h) => h.id === id) || mockHousings.find((h) => h.id === id))
        .filter(Boolean)
        .map((h) => {
          const scored = this.results.find((r) => r.id === h.id)
          return scored || { ...h, matchScore: h.matchScore || 0 }
        })
    }
  },
  methods: {
    enterWorkspace() {
      this.view = 'workspace'
      if (!this.searched) {
        this.onSearch(this.prefs)
      }
    },
    onSearch(prefs) {
      this.activePrefs = { ...prefs, infraWeights: { ...prefs.infraWeights } }
      this.loading = true
      this.searched = true
      this.selected = null
      clearTimeout(this.searchTimer)
      this.searchTimer = setTimeout(() => {
        this.results = rankHousings(mockHousings, this.activePrefs)
        this.loading = false
        if (this.results.length) {
          this.selected = this.results[0]
        }
      }, 550)
    },
    selectHousing(housing) {
      this.selected = housing
    },
    openReport(housing) {
      this.selected = housing
      this.reportHousing = housing
    },
    onMapQuery(q) {
      this.nameQuery = q
    },
    toggleCompare(housing) {
      const idx = this.compareIds.indexOf(housing.id)
      if (idx >= 0) {
        this.compareIds.splice(idx, 1)
        return
      }
      if (this.compareIds.length >= 3) return
      this.compareIds.push(housing.id)
    },
    removeCompare(id) {
      this.compareIds = this.compareIds.filter((x) => x !== id)
      if (this.compareIds.length < 2) this.compareOpen = false
    },
    onScroll() {
      this.showTop = window.scrollY > 320
    },
    scrollTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}
</script>
