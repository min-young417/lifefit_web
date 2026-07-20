<template>
  <header class="app-header">
    <div class="app-header__inner">
      <button type="button" class="app-header__brand" @click="$emit('go-home')">
        <img
          class="app-header__logo"
          :src="assets.logo"
          alt="부산도시공사 BMC"
        >
        <span class="app-header__titles">
          <strong>라이프핏</strong>
          <small>생활권 맞춤 공공임대 추천</small>
        </span>
      </button>

      <nav class="app-header__nav" aria-label="주요 메뉴">
        <button
          type="button"
          class="nav-link"
          :class="{ 'is-active': view === 'landing' }"
          @click="$emit('go-home')"
        >
          소개
        </button>
        <button
          type="button"
          class="nav-link"
          :class="{ 'is-active': view === 'workspace' }"
          @click="$emit('go-workspace')"
        >
          맞춤 추천
        </button>
        <a
          class="nav-link nav-link--ext"
          href="https://apply.bmc.busan.kr/co/coa/selectMainView.do"
          target="_blank"
          rel="noopener noreferrer"
        >
          BMC 청약센터
          <img :src="assets.icoArrow" alt="" class="nav-link__arrow">
        </a>
      </nav>

      <div class="app-header__meta">
        <span class="hotline">고객센터 051-810-1200</span>
      </div>
    </div>
  </header>
</template>

<script>
import { assets } from '../assets/images'

export default {
  name: 'AppHeader',
  props: {
    view: {
      type: String,
      default: 'landing'
    }
  },
  emits: ['go-home', 'go-workspace'],
  data() {
    return { assets }
  }
}
</script>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  height: var(--bmc-header-h);
  background: var(--bmc-white);
  border-bottom: 3px solid var(--bmc-primary);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
}

.app-header__inner {
  max-width: 1600px;
  height: 100%;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 24px;
}

.app-header__brand {
  display: flex;
  align-items: center;
  gap: 14px;
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  text-align: left;
}

.app-header__logo {
  height: 36px;
  width: auto;
  display: block;
  object-fit: contain;
}

.app-header__titles {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-left: 14px;
  border-left: 1px solid var(--bmc-border);
}

.app-header__titles strong {
  font-size: 1.05rem;
  color: var(--bmc-primary);
  line-height: 1.2;
}

.app-header__titles small {
  font-size: 0.72rem;
  color: var(--bmc-text-muted);
}

.app-header__nav {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 12px;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border: none;
  background: transparent;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--bmc-text-muted);
  cursor: pointer;
}

.nav-link:hover,
.nav-link.is-active {
  color: var(--bmc-primary);
  background: rgba(0, 119, 141, 0.08);
}

.nav-link--ext {
  text-decoration: none;
}

.nav-link__arrow {
  width: 12px;
  height: 12px;
  opacity: 0.7;
}

.app-header__meta {
  margin-left: auto;
}

.hotline {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--bmc-primary);
}

@media (max-width: 900px) {
  .app-header__nav,
  .app-header__meta {
    display: none;
  }

  .app-header__logo {
    height: 30px;
  }
}
</style>
