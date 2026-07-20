/** 시안용 목 데이터 — 부산 공공임대주택 + 생활권 점수 */

export const DISTRICTS = [
  '중구', '서구', '동구', '영도구', '부산진구', '동래구',
  '남구', '북구', '해운대구', '사하구', '금정구', '강서구',
  '연제구', '수영구', '사상구', '기장군'
]

export const LIFESTYLE_TAGS = [
  { id: 'startup', label: '창업·직장', icon: '직' },
  { id: 'leisure', label: '여가·운동', icon: '운' },
  { id: 'shopping', label: '편의·쇼핑', icon: '쇼' },
  { id: 'culture', label: '문화·예술', icon: '문' },
  { id: 'nature', label: '자연·산책', icon: '산' },
  { id: 'transit', label: '교통·환승', icon: '교' }
]

export const ELIGIBILITY_OPTIONS = [
  { id: 'youth', label: '청년' },
  { id: 'newlywed', label: '신혼부부' },
  { id: 'senior', label: '고령자' },
  { id: 'general', label: '일반' }
]

export const HOUSING_TYPES = [
  { id: 'happy', label: '행복주택' },
  { id: 'national', label: '국민임대' },
  { id: 'public', label: '통합공공임대' },
  { id: 'purchase', label: '매입임대' }
]

export const COMMUTE_HUBS = [
  { id: 'centum', label: '센텀시티', x: 72, y: 38 },
  { id: 'seomyeon', label: '서면', x: 48, y: 48 },
  { id: 'haeundae', label: '해운대', x: 82, y: 36 },
  { id: 'nampo', label: '남포동', x: 38, y: 62 },
  { id: 'pnu', label: '부산대', x: 58, y: 28 }
]

export const mockHousings = [
  {
    id: 'h1',
    name: '수영 청년 행복주택',
    district: '수영구',
    type: 'happy',
    eligibility: ['youth'],
    depositMin: 1200,
    depositMax: 1500,
    areaMin: 26,
    areaMax: 36,
    status: 'open',
    builtYear: 2022,
    x: 68,
    y: 44,
    imageHue: 190,
    lifestyleTags: ['culture', 'leisure', 'nature'],
    summary: '카페·헬스 밀집 + 해변 접근형',
    infra: { cafe: 92, gym: 88, culture: 86, mart: 70, transit: 78, nature: 90 },
    nearby: [
      { name: 'F1963 문화공간', dist: '1.2km', kind: 'culture' },
      { name: '광안리 해변', dist: '500m', kind: 'nature' },
      { name: '수영 전통시장', dist: '600m', kind: 'shopping' },
      { name: '스타벅스 광안점', dist: '350m', kind: 'cafe' }
    ],
    highlights: ['스타벅스 도보권', '대중교통 편리', '해변 산책'],
    commuteMinutes: { centum: 18, seomyeon: 25, haeundae: 22, nampo: 35, pnu: 40 },
    pros: ['문화·카페 인프라가 촘촘함', '광안리·민락 생활권', '신축에 가까운 시설'],
    cons: ['성수기 주차·혼잡', '보증금이 일부 단지보다 높은 편'],
    similarEnv: '해운대 우동·민락과 비슷한 ‘바다+카페’ 생활 리듬. 주말엔 산책·브런치 동선이 자연스럽습니다.'
  },
  {
    id: 'h2',
    name: '사상 스마트시티 행복주택',
    district: '사상구',
    type: 'happy',
    eligibility: ['youth', 'newlywed'],
    depositMin: 800,
    depositMax: 1200,
    areaMin: 24,
    areaMax: 39,
    status: 'open',
    builtYear: 2021,
    x: 36,
    y: 46,
    imageHue: 165,
    lifestyleTags: ['startup', 'transit', 'shopping'],
    summary: '직장·환승 중심 + 생활편의형',
    infra: { cafe: 74, gym: 68, culture: 55, mart: 85, transit: 94, nature: 48 },
    nearby: [
      { name: '사상역 환승센터', dist: '400m', kind: 'transit' },
      { name: '홈플러스 사상', dist: '700m', kind: 'mart' },
      { name: '사상 카페거리', dist: '550m', kind: 'cafe' }
    ],
    highlights: ['환승 최강', '대형마트 인접', '직장 접근성'],
    commuteMinutes: { centum: 35, seomyeon: 15, haeundae: 42, nampo: 28, pnu: 32 },
    pros: ['서면·사상 출퇴근이 수월', '장보기·편의시설 밀집', '상대적으로 부담 적은 보증'],
    cons: ['해변·자연 접근은 약함', '문화시설 밀도가 수영권보다 낮음'],
    similarEnv: '부산진 가야·개금과 비슷한 ‘직주근접·환승’형. 평일 루틴 중심 라이프에 잘 맞습니다.'
  },
  {
    id: 'h3',
    name: '금정 국민임대 단지',
    district: '금정구',
    type: 'national',
    eligibility: ['general', 'senior', 'newlywed'],
    depositMin: 500,
    depositMax: 900,
    areaMin: 36,
    areaMax: 49,
    status: 'open',
    builtYear: 2018,
    x: 58,
    y: 26,
    imageHue: 140,
    lifestyleTags: ['nature', 'leisure', 'culture'],
    summary: '캠퍼스·산책 + 한산한 주거형',
    infra: { cafe: 70, gym: 72, culture: 78, mart: 65, transit: 72, nature: 88 },
    nearby: [
      { name: '부산대 앞 상권', dist: '900m', kind: 'cafe' },
      { name: '금정산 둘레길', dist: '1.5km', kind: 'nature' },
      { name: '온천장역', dist: '1.1km', kind: 'transit' }
    ],
    highlights: ['자연 접근', '대학가 문화', '보증금 부담↓'],
    commuteMinutes: { centum: 40, seomyeon: 28, haeundae: 48, nampo: 38, pnu: 12 },
    pros: ['금정산·온천 생활권', '보증금·임대료 부담이 낮음', '조용한 주거 분위기'],
    cons: ['센텀·해운대 직행 출퇴근은 다소 김', '야간 상권은 한산'],
    similarEnv: '연제 연산·동래 온천과 비슷한 ‘생활형 주거+산책’ 환경입니다.'
  },
  {
    id: 'h4',
    name: '해운대 마린시티 매입임대',
    district: '해운대구',
    type: 'purchase',
    eligibility: ['youth', 'newlywed', 'general'],
    depositMin: 1500,
    depositMax: 2800,
    areaMin: 29,
    areaMax: 45,
    status: 'soon',
    builtYear: 2019,
    x: 84,
    y: 34,
    imageHue: 210,
    lifestyleTags: ['leisure', 'shopping', 'culture'],
    summary: '해변·쇼핑·여가 밀집형',
    infra: { cafe: 90, gym: 84, culture: 80, mart: 88, transit: 76, nature: 92 },
    nearby: [
      { name: '해운대 해수욕장', dist: '800m', kind: 'nature' },
      { name: '신세계 센텀', dist: '2.0km', kind: 'shopping' },
      { name: '달맞이길 카페', dist: '1.0km', kind: 'cafe' }
    ],
    highlights: ['해변 라이프', '쇼핑 인프라', '여가 최적'],
    commuteMinutes: { centum: 12, seomyeon: 38, haeundae: 8, nampo: 45, pnu: 50 },
    pros: ['여가·관광 인프라 최고 수준', '센텀 업무지구와 가까움'],
    cons: ['보증금 상단이 높음', '성수기 소음·유동인구'],
    similarEnv: '수영 광안·민락과 같은 ‘오션뷰 라이프’ 계열입니다.'
  },
  {
    id: 'h5',
    name: '연제 통합공공임대',
    district: '연제구',
    type: 'public',
    eligibility: ['general', 'newlywed', 'senior'],
    depositMin: 1000,
    depositMax: 1800,
    areaMin: 36,
    areaMax: 51,
    status: 'open',
    builtYear: 2020,
    x: 52,
    y: 42,
    imageHue: 175,
    lifestyleTags: ['transit', 'shopping', 'startup'],
    summary: '시청·환승 + 생활편의 균형형',
    infra: { cafe: 76, gym: 70, culture: 68, mart: 82, transit: 90, nature: 55 },
    nearby: [
      { name: '시청·연산역', dist: '500m', kind: 'transit' },
      { name: '롯데백화점 부산본점', dist: '1.8km', kind: 'shopping' },
      { name: '연산동 체육공원', dist: '1.0km', kind: 'gym' }
    ],
    highlights: ['시내 접근', '환승 편리', '생활 균형'],
    commuteMinutes: { centum: 28, seomyeon: 12, haeundae: 32, nampo: 22, pnu: 20 },
    pros: ['부산 전역 이동이 수월', '행정·의료 인프라 근접'],
    cons: ['해변·자연 감성은 약함', '단지 주변 녹지 한정적'],
    similarEnv: '부산진 전포·양정과 비슷한 ‘도심 균형형’ 생활권입니다.'
  },
  {
    id: 'h6',
    name: '남구 용호 행복주택',
    district: '남구',
    type: 'happy',
    eligibility: ['youth'],
    depositMin: 900,
    depositMax: 1400,
    areaMin: 24,
    areaMax: 36,
    status: 'open',
    builtYear: 2023,
    x: 62,
    y: 56,
    imageHue: 200,
    lifestyleTags: ['nature', 'leisure', 'culture'],
    summary: '오션뷰·공원 + 조용한 주거형',
    infra: { cafe: 68, gym: 75, culture: 72, mart: 60, transit: 65, nature: 94 },
    nearby: [
      { name: '이기대 해안산책로', dist: '700m', kind: 'nature' },
      { name: '용호만 유람선', dist: '1.2km', kind: 'leisure' },
      { name: '경성대·부경대 상권', dist: '2.5km', kind: 'cafe' }
    ],
    highlights: ['신축', '해안 산책', '한산한 주거'],
    commuteMinutes: { centum: 30, seomyeon: 22, haeundae: 35, nampo: 20, pnu: 45 },
    pros: ['신축 단지', '자연·산책 여건 우수', '상대적으로 한산'],
    cons: ['대형 쇼핑몰은 거리 있음', '심야 대중교통 선택지 제한'],
    similarEnv: '영도 절영·태종대 인근과 비슷한 ‘바닷가 조용한 주거’ 분위기입니다.'
  },
  {
    id: 'h7',
    name: '북구 화명 국민임대',
    district: '북구',
    type: 'national',
    eligibility: ['general', 'newlywed', 'senior'],
    depositMin: 400,
    depositMax: 800,
    areaMin: 39,
    areaMax: 59,
    status: 'closed',
    builtYear: 2015,
    x: 42,
    y: 22,
    imageHue: 120,
    lifestyleTags: ['shopping', 'nature', 'leisure'],
    summary: '신도시형 편의 + 가족 주거',
    infra: { cafe: 72, gym: 70, culture: 50, mart: 90, transit: 80, nature: 75 },
    nearby: [
      { name: '화명동 롯데마트', dist: '600m', kind: 'mart' },
      { name: '대천공원', dist: '900m', kind: 'nature' },
      { name: '화명역', dist: '800m', kind: 'transit' }
    ],
    highlights: ['가족 편의', '대형마트', '공원'],
    commuteMinutes: { centum: 45, seomyeon: 30, haeundae: 52, nampo: 40, pnu: 25 },
    pros: ['넓은 면적 선택지', '생활편의 인프라 탄탄', '보증금 부담 낮음'],
    cons: ['현재 모집 마감', '도심 문화·야경 접근은 약함'],
    similarEnv: '강서 명지·신호와 비슷한 ‘신도시형 생활권’입니다.'
  },
  {
    id: 'h8',
    name: '기장 일광 행복주택',
    district: '기장군',
    type: 'happy',
    eligibility: ['youth', 'newlywed'],
    depositMin: 700,
    depositMax: 1100,
    areaMin: 26,
    areaMax: 39,
    status: 'open',
    builtYear: 2024,
    x: 92,
    y: 18,
    imageHue: 195,
    lifestyleTags: ['nature', 'leisure', 'startup'],
    summary: '해변 신도시 + 워케이션형',
    infra: { cafe: 80, gym: 62, culture: 58, mart: 55, transit: 50, nature: 96 },
    nearby: [
      { name: '일광해수욕장', dist: '1.0km', kind: 'nature' },
      { name: '일광역', dist: '1.3km', kind: 'transit' },
      { name: '오션뷰 카페촌', dist: '800m', kind: 'cafe' }
    ],
    highlights: ['신축', '오션 감성', '한적함'],
    commuteMinutes: { centum: 35, seomyeon: 55, haeundae: 28, nampo: 60, pnu: 55 },
    pros: ['최신 시설', '자연·바다 접근 탁월', '조용한 환경'],
    cons: ['시내 출퇴근 시간 소요', '대형 문화시설까지 거리'],
    similarEnv: '해운대 송정·기장 동부와 같은 ‘슬로 오션 라이프’에 가깝습니다.'
  }
]

export const heatZones = [
  { id: 'z1', x: 68, y: 44, r: 14, focus: 'cafe' },
  { id: 'z2', x: 84, y: 34, r: 12, focus: 'nature' },
  { id: 'z3', x: 48, y: 48, r: 11, focus: 'transit' },
  { id: 'z4', x: 36, y: 46, r: 10, focus: 'mart' },
  { id: 'z5', x: 58, y: 28, r: 9, focus: 'culture' },
  { id: 'z6', x: 92, y: 18, r: 10, focus: 'nature' }
]
