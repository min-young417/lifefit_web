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

      <div class="workspace__main">
        <RecommendList
          class="workspace__list"
          :items="filteredResults"
          :loading="loading"
          :searched="searched"
          :selected-id="selected?.id"
          :compare-ids="compareIds"
          :no-filters-active="noFiltersActive"
          @select="selectHousing"
          @toggle-compare="toggleCompare"
        />

        <LifestyleMap
          class="workspace__map"
          :housings="filteredResults"
          :prefs="activePrefs"
          :selected="selected"
          :commute-destination="activePrefs.commuteDestination"
          @select="selectHousing"
          @query="onMapQuery"
          @commute-route="onCommuteRoute"
          @nearby-places="nearbyPlaces = $event"
        />

        <SelectedInsight
          class="workspace__insight"
          :housing="selected"
          :walk-minutes="activePrefs.walkMinutes"
          :lifestyles="activePrefs.lifestyles"
          :nearby-places="nearbyPlaces"
          :commute-destination="activePrefs.commuteDestination"
          :commute-route="commuteRoute"
          :commute-route-loading="commuteRouteLoading"
          @open-report="openReport"
        />
      </div>
    </main>

    <AiReportDrawer
      :housing="reportHousing"
      :peers="filteredResults"
      :walk-minutes="activePrefs.walkMinutes"
      @close="reportHousing = null"
    />

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
import SelectedInsight from './components/SelectedInsight.vue'
import AiReportDrawer from './components/AiReportDrawer.vue'
import CompareBar from './components/CompareBar.vue'
import { realHousings } from './data/realHousings'
import { rankHousings } from './utils/matchScore'
import { assets } from './assets/images'

const initialPrefs = () => ({
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
  name: 'App',
  components: {
    AppHeader,
    LandingHero,
    PreferencePanel,
    LifestyleMap,
    RecommendList,
    SelectedInsight,
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
      showTop: false,
      commuteRoute: null,
      commuteRouteLoading: false,
      nearbyPlaces: []
    }
  },
  watch: {
    'prefs.walkMinutes'(v) {
      // 도보권은 검색 전에도 지도·패널에 즉시 반영
      this.activePrefs = { ...this.activePrefs, walkMinutes: v }
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
    noFiltersActive() {
      const p = this.activePrefs
      return !p.eligibility?.length &&
        !p.types?.length &&
        !p.lifestyles?.length &&
        !p.districts?.length &&
        p.depositMax === 5000 &&
        p.areaMin === 0 &&
        p.areaMax === 120 &&
        !p.commuteDestination
    },
    compareItems() {
      return this.compareIds
        .map((id) => this.results.find((h) => h.id === id) || realHousings.find((h) => h.id === id))
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
      this.activePrefs = { ...prefs }
      this.loading = true
      this.searched = true
      this.selected = null
      clearTimeout(this.searchTimer)
      this.searchTimer = setTimeout(() => {
        this.results = rankHousings(realHousings, this.activePrefs)
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
    onCommuteRoute({ loading, transit, walk, error }) {
      this.commuteRouteLoading = loading
      if (!loading) this.commuteRoute = { transit, walk, error }
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