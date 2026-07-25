<template>
  <section class="landing">
    <div class="landing__bg" aria-hidden="true">
      <div class="landing__wash" />
      <div class="landing__grid" />
      <img class="landing__logo-mark" :src="assets.logoWhite" alt="">
    </div>

    <div class="landing__layout">
      <div class="landing__content">
        <p class="landing__eyebrow">부산도시공사 · 생활권 데이터 기반</p>
        <h1 class="landing__brand">라이프핏</h1>
        <p class="landing__headline">취향과 상권이 맞는 공공임대주택을 찾아드립니다</p>
        <p class="landing__desc">
          단순 면적·보증금 필터를 넘어, 카페·운동·문화·교통 등 생활권 인프라와
          시민 개개인의 라이프스타일을 매칭해 추천합니다.
        </p>

        <div class="landing__cta">
          <button type="button" class="bmc-btn bmc-btn-primary landing__btn" @click="$emit('start')">
            <img :src="assets.icoBtnPlusW" alt="" class="landing__btn-ico">
            맞춤 주택 찾기
          </button>
          <a
            class="bmc-btn bmc-btn-ghost landing__btn"
            href="https://apply.bmc.busan.kr/co/coa/selectMainView.do"
            target="_blank"
            rel="noopener noreferrer"
          >
            BMC 청약센터
            <img :src="assets.icoArrow" alt="" class="landing__btn-arrow">
          </a>
        </div>

        <ul class="landing__steps">
          <li v-for="step in steps" :key="step.title">
            <img :src="step.img" :alt="step.title" class="landing__step-img">
            <div>
              <strong>{{ step.title }}</strong>
              <span>{{ step.desc }}</span>
            </div>
          </li>
        </ul>
      </div>

      <aside class="landing__aside">
        <img
          class="landing__banner"
          :src="assets.mainSlide"
          alt="주택 임대차 계약 신고 안내"
        >
        <div class="landing__diffs">
          <div class="diff">
            <img :src="assets.icoBullet" alt="" class="diff__bullet">
            <div>
              <strong>Before</strong>
              <span>공급자 중심 · 조건 나열형 검색</span>
            </div>
          </div>
          <div class="diff">
            <img :src="assets.icoBullet" alt="" class="diff__bullet">
            <div>
              <strong>After</strong>
              <span>생활권 분석 · 취향 매칭 · AI 리포트</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>

<script>
import { assets } from '../assets/images'

export default {
  name: 'LandingHero',
  emits: ['start'],
  data() {
    return {
      assets,
      steps: [
        { title: '조건 입력', desc: '자격·상세조건 설정', img: assets.guide01 },
        { title: '생활권 매칭', desc: '상권·시설 데이터로 점수화', img: assets.guide04 },
        { title: 'AI 리포트', desc: '추천 이유·장단점 확인', img: assets.guide03 }
      ]
    }
  }
}
</script>

<style scoped>
.landing {
  position: relative;
  min-height: calc(100vh - var(--bmc-header-h));
  overflow: hidden;
}

.landing__bg {
  position: absolute;
  inset: 0;
}

.landing__wash {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(115deg, rgba(0, 119, 141, 0.94) 0%, rgba(18, 143, 177, 0.82) 48%, rgba(232, 244, 246, 0.55) 100%),
    linear-gradient(180deg, #004e5c 0%, #00778d 50%, #e8f4f6 100%);
}

.landing__grid {
  position: absolute;
  inset: 0;
  opacity: 0.1;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.4) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: linear-gradient(90deg, #000 0%, transparent 75%);
  animation: gridDrift 18s linear infinite;
}

.landing__logo-mark {
  position: absolute;
  right: 6%;
  top: 10%;
  width: min(280px, 32vw);
  opacity: 0.12;
  pointer-events: none;
  animation: floatY 8s ease-in-out infinite;
}

.landing__layout {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 28px 64px;
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr);
  gap: 36px;
  align-items: center;
  animation: riseIn 0.7s ease both;
}

.landing__content {
  color: #fff;
}

.landing__eyebrow {
  margin: 0 0 12px;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  opacity: 0.9;
}

.landing__brand {
  margin: 0;
  font-size: clamp(2.6rem, 5.5vw, 4rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.05;
  text-shadow: 0 6px 30px rgba(0, 40, 50, 0.25);
}

.landing__headline {
  margin: 18px 0 12px;
  font-size: clamp(1.1rem, 2vw, 1.4rem);
  font-weight: 600;
  line-height: 1.45;
  max-width: 36ch;
}

.landing__desc {
  margin: 0 0 28px;
  font-size: 1rem;
  line-height: 1.7;
  max-width: 48ch;
  color: rgba(255, 255, 255, 0.88);
}

.landing__cta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 28px;
}

.landing__btn {
  min-width: 168px;
}

.landing__btn-ico {
  width: 16px;
  height: 16px;
}

.landing__btn-arrow {
  width: 13px;
  height: 13px;
  filter: brightness(0) invert(1);
  opacity: 0.85;
}

.landing__btn.bmc-btn-primary {
  background: #fff;
  color: var(--bmc-primary);
  box-shadow: 0 8px 24px rgba(0, 40, 50, 0.2);
}

.landing__btn.bmc-btn-primary:hover {
  background: #f3fbfc;
}

.landing__btn.bmc-btn-primary .landing__btn-ico {
  filter: invert(35%) sepia(40%) saturate(800%) hue-rotate(145deg);
}

.landing__btn.bmc-btn-ghost {
  border-color: rgba(255, 255, 255, 0.7);
  color: #fff;
  background: transparent;
}

.landing__btn.bmc-btn-ghost:hover {
  background: rgba(255, 255, 255, 0.12);
}

.landing__steps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 10px;
}

.landing__steps li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(6px);
}

.landing__step-img {
  width: 52px;
  height: 52px;
  object-fit: contain;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.92);
  flex-shrink: 0;
}

.landing__steps strong {
  display: block;
  font-size: 0.9rem;
  margin-bottom: 2px;
}

.landing__steps span {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.85);
}

.landing__aside {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.landing__banner {
  width: 100%;
  border-radius: 18px;
  box-shadow: 0 16px 40px rgba(0, 40, 50, 0.28);
  background: #fff;
  animation: floatY 6.5s ease-in-out infinite;
}

.landing__diffs {
  display: grid;
  gap: 8px;
}

.diff {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  padding: 12px 14px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: var(--bmc-shadow);
}

.diff__bullet {
  width: 14px;
  height: 18px;
  margin-top: 2px;
  flex-shrink: 0;
}

.diff strong {
  display: block;
  font-size: 0.78rem;
  color: var(--bmc-primary);
  margin-bottom: 2px;
}

.diff span {
  font-size: 0.84rem;
  color: var(--bmc-text-muted);
  line-height: 1.4;
}

@keyframes riseIn {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes floatY {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}

@keyframes gridDrift {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 48px 48px;
  }
}

@media (max-width: 900px) {
  .landing__layout {
    grid-template-columns: 1fr;
    padding: 36px 20px 48px;
  }

  .landing__logo-mark {
    opacity: 0.08;
  }
}
</style>