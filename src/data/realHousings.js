/** 부산 공공임대주택 실제 데이터 50건 — 이름/주소/보증금/면적/자격/준공연도는 공공데이터 CSV 기반(일부는 지역 특성으로 추정), 인프라 점수·주변시설·서술형 텍스트는 지역 특성 기반으로 추정 생성됨. competitionRate/competitionDate는 임의 추정치. 매입임대는 CSV상 건물명이 실제로 존재하는 항목만 선별함 */

export const realHousings = [
  {
    "id": "r1",
    "name": "동래행복주택",
    "district": "동래구",
    "type": "happy",
    "eligibility": [
      "general",
      "newlywed",
      "senior",
      "youth"
    ],
    "depositMin": 1974,
    "depositMax": 4860,
    "areaMin": 19.3,
    "areaMax": 36.7,
    "status": "open",
    "builtYear": 2019,
    "lat": 35.196408,
    "lng": 129.094172,
    "imageHue": 186,
    "lifestyleTags": [
      "culture",
      "transit"
    ],
    "summary": "동래구 온천장·전통 문화형",
    "infra": {
      "cafe": 69,
      "gym": 68,
      "culture": 70,
      "mart": 75,
      "transit": 72,
      "nature": 52,
      "convenience": 69,
      "hospital": 77,
      "market": 84,
      "childcare": 71,
      "bank": 71,
      "parking": 48
    },
    "nearby": [
      {
        "name": "오일장터",
        "dist": "231m",
        "kind": "market"
      },
      {
        "name": "내과·이비인후과 밀집 상가",
        "dist": "414m",
        "kind": "hospital"
      },
      {
        "name": "슈퍼마켓",
        "dist": "542m",
        "kind": "mart"
      },
      {
        "name": "마을버스 정류장",
        "dist": "729m",
        "kind": "transit"
      },
      {
        "name": "국공립어린이집",
        "dist": "953m",
        "kind": "childcare"
      }
    ],
    "highlights": [
      "동래구 생활권",
      "culture·transit 인프라",
      "395세대 규모"
    ],
    "commuteMinutes": {
      "centum": 20,
      "seomyeon": 22,
      "haeundae": 27,
      "nampo": 38,
      "pnu": 20
    },
    "pros": [
      "장보기·생활편의 인프라가 탄탄함",
      "버스·지하철 환승이 편리함",
      "동래구 온천장·전통 문화형 생활권"
    ],
    "cons": [
      "주차 여건이 넉넉하지 않은 편",
      "대형 쇼핑시설까지는 다소 거리가 있음"
    ],
    "similarEnv": "동래구 일대의 전형적인 \"온천장·전통 문화형\" 생활 리듬을 따릅니다.",
    "households": 395
  },
  {
    "id": "r2",
    "name": "더 파크 이기대",
    "district": "남구",
    "type": "happy",
    "eligibility": [
      "general",
      "newlywed",
      "senior",
      "youth"
    ],
    "depositMin": 2439,
    "depositMax": 5364,
    "areaMin": 26.0,
    "areaMax": 44.1,
    "status": "open",
    "builtYear": 2022,
    "lat": 35.1264,
    "lng": 129.0953,
    "imageHue": 175,
    "lifestyleTags": [
      "nature",
      "leisure"
    ],
    "summary": "남구 이기대·경성대 문화형",
    "infra": {
      "cafe": 74,
      "gym": 62,
      "culture": 71,
      "mart": 66,
      "transit": 68,
      "nature": 83,
      "convenience": 72,
      "hospital": 74,
      "market": 58,
      "childcare": 79,
      "bank": 68,
      "parking": 99
    },
    "nearby": [
      {
        "name": "인근 편의시설",
        "dist": "396m",
        "kind": "parking"
      },
      {
        "name": "근린공원",
        "dist": "564m",
        "kind": "nature"
      },
      {
        "name": "육아종합지원센터",
        "dist": "517m",
        "kind": "childcare"
      },
      {
        "name": "로컬 베이커리카페",
        "dist": "949m",
        "kind": "cafe"
      },
      {
        "name": "동네약국",
        "dist": "1.1km",
        "kind": "hospital"
      }
    ],
    "highlights": [
      "남구 생활권",
      "nature·leisure 인프라",
      "68세대 규모"
    ],
    "commuteMinutes": {
      "centum": 23,
      "seomyeon": 21,
      "haeundae": 26,
      "nampo": 25,
      "pnu": 38
    },
    "pros": [
      "공원·산책로 등 자연 접근성이 좋음",
      "카페·베이커리 밀집도가 높아 일상 동선이 편함",
      "남구 이기대·경성대 문화형 생활권"
    ],
    "cons": [
      "주차 여건이 넉넉하지 않은 편",
      "대형 쇼핑시설까지는 다소 거리가 있음"
    ],
    "similarEnv": "남구 일대의 전형적인 \"이기대·경성대 문화형\" 생활 리듬을 따릅니다.",
    "households": 68,
    "competitionRate": 1.8,
    "competitionDate": "2026-02"
  },
  {
    "id": "r3",
    "name": "시청앞 행복주택 1단지",
    "district": "연제구",
    "type": "happy",
    "eligibility": [
      "general",
      "newlywed",
      "senior",
      "youth"
    ],
    "depositMin": 3207,
    "depositMax": 6952,
    "areaMin": 26.4,
    "areaMax": 45.0,
    "status": "open",
    "builtYear": 2025,
    "lat": 35.179792,
    "lng": 129.088928,
    "imageHue": 168,
    "lifestyleTags": [
      "transit",
      "shopping",
      "startup"
    ],
    "summary": "연제구 시청·행정 중심 균형형",
    "infra": {
      "cafe": 79,
      "gym": 69,
      "culture": 70,
      "mart": 79,
      "transit": 91,
      "nature": 45,
      "convenience": 75,
      "hospital": 79,
      "market": 58,
      "childcare": 71,
      "bank": 91,
      "parking": 67
    },
    "nearby": [
      {
        "name": "버스환승정류장",
        "dist": "139m",
        "kind": "transit"
      },
      {
        "name": "은행 지점",
        "dist": "323m",
        "kind": "bank"
      },
      {
        "name": "프랜차이즈 커피전문점",
        "dist": "574m",
        "kind": "cafe"
      },
      {
        "name": "동네 마트",
        "dist": "898m",
        "kind": "mart"
      },
      {
        "name": "내과·이비인후과 밀집 상가",
        "dist": "1.1km",
        "kind": "hospital"
      }
    ],
    "highlights": [
      "연제구 생활권",
      "transit·shopping·startup 인프라",
      "692세대 규모"
    ],
    "commuteMinutes": {
      "centum": 19,
      "seomyeon": 18,
      "haeundae": 26,
      "nampo": 34,
      "pnu": 24
    },
    "pros": [
      "버스·지하철 환승이 편리함",
      "카페·베이커리 밀집도가 높아 일상 동선이 편함",
      "연제구 시청·행정 중심 균형형 생활권"
    ],
    "cons": [
      "평일 야간 유동인구가 적은 편"
    ],
    "similarEnv": "연제구 일대의 전형적인 \"시청·행정 중심 균형형\" 생활 리듬을 따릅니다.",
    "households": 692
  },
  {
    "id": "r4",
    "name": "시청앞 행복주택 2단지",
    "district": "연제구",
    "type": "happy",
    "eligibility": [
      "general",
      "newlywed",
      "senior",
      "youth"
    ],
    "depositMin": 3140,
    "depositMax": 6952,
    "areaMin": 26.4,
    "areaMax": 45.0,
    "status": "open",
    "builtYear": 2023,
    "lat": 35.1703,
    "lng": 129.090836,
    "imageHue": 214,
    "lifestyleTags": [
      "transit",
      "shopping",
      "startup"
    ],
    "summary": "연제구 시청·행정 중심 균형형",
    "infra": {
      "cafe": 71,
      "gym": 78,
      "culture": 60,
      "mart": 86,
      "transit": 94,
      "nature": 61,
      "convenience": 87,
      "hospital": 87,
      "market": 48,
      "childcare": 81,
      "bank": 90,
      "parking": 73
    },
    "nearby": [
      {
        "name": "마을버스 정류장",
        "dist": "379m",
        "kind": "transit"
      },
      {
        "name": "은행 지점",
        "dist": "310m",
        "kind": "bank"
      },
      {
        "name": "올리브영",
        "dist": "630m",
        "kind": "convenience"
      },
      {
        "name": "내과·이비인후과 밀집 상가",
        "dist": "773m",
        "kind": "hospital"
      },
      {
        "name": "편의점",
        "dist": "1.2km",
        "kind": "mart"
      }
    ],
    "highlights": [
      "연제구 생활권",
      "transit·shopping·startup 인프라",
      "1108세대 규모"
    ],
    "commuteMinutes": {
      "centum": 18,
      "seomyeon": 17,
      "haeundae": 25,
      "nampo": 32,
      "pnu": 26
    },
    "pros": [
      "버스·지하철 환승이 편리함",
      "장보기·생활편의 인프라가 탄탄함",
      "연제구 시청·행정 중심 균형형 생활권"
    ],
    "cons": [
      "성수기엔 주변 소음·혼잡이 있을 수 있음",
      "주차 여건이 넉넉하지 않은 편"
    ],
    "similarEnv": "연제구 일대의 전형적인 \"시청·행정 중심 균형형\" 생활 리듬을 따릅니다.",
    "households": 1108,
    "competitionRate": 5.5,
    "competitionDate": "2025-08"
  },
  {
    "id": "r5",
    "name": "경동 포레스트힐 행복주택 아미",
    "district": "서구",
    "type": "happy",
    "eligibility": [
      "general",
      "newlywed",
      "senior",
      "youth"
    ],
    "depositMin": 1776,
    "depositMax": 4520,
    "areaMin": 29.4,
    "areaMax": 60.0,
    "status": "open",
    "builtYear": 2023,
    "lat": 35.096768,
    "lng": 129.016644,
    "imageHue": 191,
    "lifestyleTags": [
      "culture",
      "transit"
    ],
    "summary": "서구 원도심 산복도로·병원 인접형",
    "infra": {
      "cafe": 58,
      "gym": 50,
      "culture": 53,
      "mart": 65,
      "transit": 61,
      "nature": 55,
      "convenience": 65,
      "hospital": 59,
      "market": 68,
      "childcare": 69,
      "bank": 69,
      "parking": 62
    },
    "nearby": [
      {
        "name": "국공립어린이집",
        "dist": "345m",
        "kind": "childcare"
      },
      {
        "name": "새마을금고",
        "dist": "497m",
        "kind": "bank"
      },
      {
        "name": "전통시장",
        "dist": "718m",
        "kind": "market"
      },
      {
        "name": "편의점",
        "dist": "881m",
        "kind": "mart"
      },
      {
        "name": "편의점 밀집구간",
        "dist": "1.1km",
        "kind": "convenience"
      }
    ],
    "highlights": [
      "서구 생활권",
      "culture·transit 인프라",
      "767세대 규모"
    ],
    "commuteMinutes": {
      "centum": 40,
      "seomyeon": 28,
      "haeundae": 44,
      "nampo": 13,
      "pnu": 47
    },
    "pros": [
      "장보기·생활편의 인프라가 탄탄함",
      "버스·지하철 환승이 편리함",
      "서구 원도심 산복도로·병원 인접형 생활권"
    ],
    "cons": [
      "성수기엔 주변 소음·혼잡이 있을 수 있음",
      "경사·계단이 있어 이동에 다소 불편할 수 있음"
    ],
    "similarEnv": "서구 일대의 전형적인 \"원도심 산복도로·병원 인접형\" 생활 리듬을 따릅니다.",
    "households": 767
  },
  {
    "id": "r6",
    "name": "금호 센트럴베이 행복주택 일광",
    "district": "기장군",
    "type": "happy",
    "eligibility": [
      "general",
      "newlywed",
      "senior",
      "youth"
    ],
    "depositMin": 2233,
    "depositMax": 7640,
    "areaMin": 19.6,
    "areaMax": 59.8,
    "status": "open",
    "builtYear": 2023,
    "lat": 35.255292,
    "lng": 129.230916,
    "imageHue": 187,
    "lifestyleTags": [
      "nature",
      "leisure",
      "startup"
    ],
    "summary": "기장군 일광 해변 신도시 워케이션형",
    "infra": {
      "cafe": 85,
      "gym": 58,
      "culture": 56,
      "mart": 54,
      "transit": 42,
      "nature": 99,
      "convenience": 63,
      "hospital": 48,
      "market": 54,
      "childcare": 71,
      "bank": 46,
      "parking": 80
    },
    "nearby": [
      {
        "name": "체육공원",
        "dist": "313m",
        "kind": "nature"
      },
      {
        "name": "로컬 베이커리카페",
        "dist": "560m",
        "kind": "cafe"
      },
      {
        "name": "인근 편의시설",
        "dist": "550m",
        "kind": "parking"
      },
      {
        "name": "육아종합지원센터",
        "dist": "941m",
        "kind": "childcare"
      },
      {
        "name": "편의점 밀집구간",
        "dist": "963m",
        "kind": "convenience"
      }
    ],
    "highlights": [
      "기장군 생활권",
      "nature·leisure·startup 인프라",
      "999세대 규모"
    ],
    "commuteMinutes": {
      "centum": 40,
      "seomyeon": 54,
      "haeundae": 39,
      "nampo": 68,
      "pnu": 42
    },
    "pros": [
      "공원·산책로 등 자연 접근성이 좋음",
      "카페·베이커리 밀집도가 높아 일상 동선이 편함",
      "기장군 일광 해변 신도시 워케이션형 생활권"
    ],
    "cons": [
      "대형 쇼핑시설까지는 다소 거리가 있음"
    ],
    "similarEnv": "기장군 일대의 전형적인 \"일광 해변 신도시 워케이션형\" 생활 리듬을 따릅니다.",
    "households": 999,
    "competitionRate": 1.6,
    "competitionDate": "2025-11"
  },
  {
    "id": "r7",
    "name": "금사 행복주택",
    "district": "금정구",
    "type": "happy",
    "eligibility": [
      "general",
      "newlywed",
      "senior",
      "youth"
    ],
    "depositMin": 2916,
    "depositMax": 6088,
    "areaMin": 36.8,
    "areaMax": 60.0,
    "status": "soon",
    "builtYear": 2023,
    "lat": 35.249348,
    "lng": 129.095948,
    "imageHue": 210,
    "lifestyleTags": [
      "culture",
      "nature"
    ],
    "summary": "금정구 부산대 캠퍼스·산책형",
    "infra": {
      "cafe": 73,
      "gym": 66,
      "culture": 80,
      "mart": 57,
      "transit": 62,
      "nature": 74,
      "convenience": 66,
      "hospital": 62,
      "market": 68,
      "childcare": 67,
      "bank": 67,
      "parking": 60
    },
    "nearby": [
      {
        "name": "작은도서관",
        "dist": "361m",
        "kind": "culture"
      },
      {
        "name": "산책로",
        "dist": "334m",
        "kind": "nature"
      },
      {
        "name": "동네 카페거리",
        "dist": "567m",
        "kind": "cafe"
      },
      {
        "name": "전통시장",
        "dist": "976m",
        "kind": "market"
      },
      {
        "name": "육아종합지원센터",
        "dist": "1.2km",
        "kind": "childcare"
      }
    ],
    "highlights": [
      "금정구 생활권",
      "culture·nature 인프라",
      "42세대 규모"
    ],
    "commuteMinutes": {
      "centum": 32,
      "seomyeon": 35,
      "haeundae": 37,
      "nampo": 51,
      "pnu": 15
    },
    "pros": [
      "도서관·문화시설이 가까움",
      "공원·산책로 등 자연 접근성이 좋음",
      "금정구 부산대 캠퍼스·산책형 생활권"
    ],
    "cons": [
      "대형 쇼핑시설까지는 다소 거리가 있음",
      "초행길엔 골목이 헷갈릴 수 있음"
    ],
    "similarEnv": "금정구 일대의 전형적인 \"부산대 캠퍼스·산책형\" 생활 리듬을 따릅니다.",
    "households": 42
  },
  {
    "id": "r8",
    "name": "우동2 GS자이",
    "district": "해운대구",
    "type": "redevelop",
    "eligibility": [
      "youth",
      "newlywed"
    ],
    "depositMin": 4114,
    "depositMax": 5610,
    "areaMin": 37.4,
    "areaMax": 37.4,
    "status": "open",
    "builtYear": 2013,
    "lat": 35.172612,
    "lng": 129.166408,
    "imageHue": 178,
    "lifestyleTags": [
      "leisure",
      "shopping",
      "culture"
    ],
    "summary": "해운대구 해변·관광 인프라 최상급형",
    "infra": {
      "cafe": 99,
      "gym": 79,
      "culture": 68,
      "mart": 84,
      "transit": 67,
      "nature": 94,
      "convenience": 92,
      "hospital": 76,
      "market": 55,
      "childcare": 90,
      "bank": 72,
      "parking": 99
    },
    "nearby": [
      {
        "name": "동네 카페거리",
        "dist": "144m",
        "kind": "cafe"
      },
      {
        "name": "인근 편의시설",
        "dist": "379m",
        "kind": "parking"
      },
      {
        "name": "산책로",
        "dist": "465m",
        "kind": "nature"
      },
      {
        "name": "다이소",
        "dist": "742m",
        "kind": "convenience"
      },
      {
        "name": "육아종합지원센터",
        "dist": "1.0km",
        "kind": "childcare"
      }
    ],
    "highlights": [
      "해운대구 생활권",
      "leisure·shopping·culture 인프라",
      "50세대 규모"
    ],
    "commuteMinutes": {
      "centum": 17,
      "seomyeon": 33,
      "haeundae": 14,
      "nampo": 44,
      "pnu": 34
    },
    "pros": [
      "카페·베이커리 밀집도가 높아 일상 동선이 편함",
      "공원·산책로 등 자연 접근성이 좋음",
      "해운대구 해변·관광 인프라 최상급형 생활권"
    ],
    "cons": [
      "성수기엔 주변 소음·혼잡이 있을 수 있음",
      "평일 야간 유동인구가 적은 편"
    ],
    "similarEnv": "해운대구 일대의 전형적인 \"해변·관광 인프라 최상급형\" 생활 리듬을 따릅니다.",
    "households": 50,
    "competitionRate": 8.6,
    "competitionDate": "2026-01"
  },
  {
    "id": "r9",
    "name": "일광 통합공공임대주택",
    "district": "기장군",
    "type": "public",
    "eligibility": [
      "general"
    ],
    "depositMin": 426,
    "depositMax": 6274,
    "areaMin": 39.9,
    "areaMax": 60.0,
    "status": "open",
    "builtYear": 2025,
    "lat": 35.253732,
    "lng": 129.217956,
    "imageHue": 208,
    "lifestyleTags": [
      "nature",
      "leisure",
      "startup"
    ],
    "summary": "기장군 일광 해변 신도시 워케이션형",
    "infra": {
      "cafe": 85,
      "gym": 61,
      "culture": 61,
      "mart": 56,
      "transit": 60,
      "nature": 89,
      "convenience": 64,
      "hospital": 58,
      "market": 53,
      "childcare": 72,
      "bank": 56,
      "parking": 99
    },
    "nearby": [
      {
        "name": "인근 편의시설",
        "dist": "361m",
        "kind": "parking"
      },
      {
        "name": "체육공원",
        "dist": "338m",
        "kind": "nature"
      },
      {
        "name": "로컬 베이커리카페",
        "dist": "668m",
        "kind": "cafe"
      },
      {
        "name": "유치원",
        "dist": "857m",
        "kind": "childcare"
      },
      {
        "name": "올리브영",
        "dist": "1.0km",
        "kind": "convenience"
      }
    ],
    "highlights": [
      "기장군 생활권",
      "nature·leisure·startup 인프라",
      "1134세대 규모"
    ],
    "commuteMinutes": {
      "centum": 38,
      "seomyeon": 51,
      "haeundae": 37,
      "nampo": 66,
      "pnu": 39
    },
    "pros": [
      "공원·산책로 등 자연 접근성이 좋음",
      "카페·베이커리 밀집도가 높아 일상 동선이 편함",
      "기장군 일광 해변 신도시 워케이션형 생활권"
    ],
    "cons": [
      "초행길엔 골목이 헷갈릴 수 있음",
      "대형 쇼핑시설까지는 다소 거리가 있음"
    ],
    "similarEnv": "기장군 일대의 전형적인 \"일광 해변 신도시 워케이션형\" 생활 리듬을 따릅니다.",
    "households": 1134
  },
  {
    "id": "r10",
    "name": "민락1 포스코센텀포레",
    "district": "수영구",
    "type": "redevelop",
    "eligibility": [
      "youth",
      "newlywed"
    ],
    "depositMin": 4332,
    "depositMax": 5946,
    "areaMin": 39.4,
    "areaMax": 39.6,
    "status": "open",
    "builtYear": 2014,
    "lat": 35.153976,
    "lng": 129.123128,
    "imageHue": 185,
    "lifestyleTags": [
      "leisure",
      "culture",
      "nature"
    ],
    "summary": "수영구 광안리·민락 카페거리형",
    "infra": {
      "cafe": 82,
      "gym": 97,
      "culture": 87,
      "mart": 69,
      "transit": 70,
      "nature": 94,
      "convenience": 76,
      "hospital": 63,
      "market": 62,
      "childcare": 83,
      "bank": 69,
      "parking": 99
    },
    "nearby": [
      {
        "name": "인근 편의시설",
        "dist": "273m",
        "kind": "parking"
      },
      {
        "name": "헬스클럽",
        "dist": "369m",
        "kind": "gym"
      },
      {
        "name": "산책로",
        "dist": "721m",
        "kind": "nature"
      },
      {
        "name": "주민센터 문화강좌실",
        "dist": "751m",
        "kind": "culture"
      },
      {
        "name": "유치원",
        "dist": "1.1km",
        "kind": "childcare"
      }
    ],
    "highlights": [
      "수영구 생활권",
      "leisure·culture·nature 인프라",
      "86세대 규모"
    ],
    "commuteMinutes": {
      "centum": 14,
      "seomyeon": 23,
      "haeundae": 18,
      "nampo": 34,
      "pnu": 32
    },
    "pros": [
      "헬스장·운동시설 접근성이 좋음",
      "공원·산책로 등 자연 접근성이 좋음",
      "수영구 광안리·민락 카페거리형 생활권"
    ],
    "cons": [
      "초행길엔 골목이 헷갈릴 수 있음",
      "평일 야간 유동인구가 적은 편"
    ],
    "similarEnv": "수영구 일대의 전형적인 \"광안리·민락 카페거리형\" 생활 리듬을 따릅니다.",
    "households": 86,
    "competitionRate": 3.7,
    "competitionDate": "2026-07"
  },
  {
    "id": "r11",
    "name": "우동1 두산위브",
    "district": "해운대구",
    "type": "redevelop",
    "eligibility": [
      "newlywed"
    ],
    "depositMin": 4390,
    "depositMax": 7965,
    "areaMin": 39.9,
    "areaMax": 53.1,
    "status": "closed",
    "builtYear": 2014,
    "lat": 35.164488,
    "lng": 129.168412,
    "imageHue": 222,
    "lifestyleTags": [
      "leisure",
      "shopping",
      "culture"
    ],
    "summary": "해운대구 해변·관광 인프라 최상급형",
    "infra": {
      "cafe": 99,
      "gym": 87,
      "culture": 86,
      "mart": 92,
      "transit": 66,
      "nature": 90,
      "convenience": 93,
      "hospital": 72,
      "market": 50,
      "childcare": 94,
      "bank": 78,
      "parking": 99
    },
    "nearby": [
      {
        "name": "로컬 베이커리카페",
        "dist": "228m",
        "kind": "cafe"
      },
      {
        "name": "인근 편의시설",
        "dist": "507m",
        "kind": "parking"
      },
      {
        "name": "유치원",
        "dist": "685m",
        "kind": "childcare"
      },
      {
        "name": "올리브영",
        "dist": "728m",
        "kind": "convenience"
      },
      {
        "name": "편의점",
        "dist": "942m",
        "kind": "mart"
      }
    ],
    "highlights": [
      "해운대구 생활권",
      "leisure·shopping·culture 인프라",
      "50세대 규모"
    ],
    "commuteMinutes": {
      "centum": 18,
      "seomyeon": 33,
      "haeundae": 12,
      "nampo": 43,
      "pnu": 35
    },
    "pros": [
      "카페·베이커리 밀집도가 높아 일상 동선이 편함",
      "장보기·생활편의 인프라가 탄탄함",
      "해운대구 해변·관광 인프라 최상급형 생활권"
    ],
    "cons": [
      "경사·계단이 있어 이동에 다소 불편할 수 있음",
      "주차 여건이 넉넉하지 않은 편"
    ],
    "similarEnv": "해운대구 일대의 전형적인 \"해변·관광 인프라 최상급형\" 생활 리듬을 따릅니다.",
    "households": 50
  },
  {
    "id": "r12",
    "name": "중동3 삼성래미안",
    "district": "해운대구",
    "type": "redevelop",
    "eligibility": [
      "youth"
    ],
    "depositMin": 4358,
    "depositMax": 6882,
    "areaMin": 39.6,
    "areaMax": 45.9,
    "status": "open",
    "builtYear": 2014,
    "lat": 35.169876,
    "lng": 129.152884,
    "imageHue": 144,
    "lifestyleTags": [
      "leisure",
      "shopping",
      "culture"
    ],
    "summary": "해운대구 해변·관광 인프라 최상급형",
    "infra": {
      "cafe": 94,
      "gym": 73,
      "culture": 82,
      "mart": 75,
      "transit": 66,
      "nature": 86,
      "convenience": 90,
      "hospital": 78,
      "market": 49,
      "childcare": 85,
      "bank": 65,
      "parking": 99
    },
    "nearby": [
      {
        "name": "인근 편의시설",
        "dist": "376m",
        "kind": "parking"
      },
      {
        "name": "프랜차이즈 커피전문점",
        "dist": "345m",
        "kind": "cafe"
      },
      {
        "name": "올리브영",
        "dist": "731m",
        "kind": "convenience"
      },
      {
        "name": "산책로",
        "dist": "867m",
        "kind": "nature"
      },
      {
        "name": "육아종합지원센터",
        "dist": "1.1km",
        "kind": "childcare"
      }
    ],
    "highlights": [
      "해운대구 생활권",
      "leisure·shopping·culture 인프라",
      "745세대 규모"
    ],
    "commuteMinutes": {
      "centum": 15,
      "seomyeon": 30,
      "haeundae": 13,
      "nampo": 41,
      "pnu": 32
    },
    "pros": [
      "카페·베이커리 밀집도가 높아 일상 동선이 편함",
      "공원·산책로 등 자연 접근성이 좋음",
      "해운대구 해변·관광 인프라 최상급형 생활권"
    ],
    "cons": [
      "경사·계단이 있어 이동에 다소 불편할 수 있음",
      "평일 야간 유동인구가 적은 편"
    ],
    "similarEnv": "해운대구 일대의 전형적인 \"해변·관광 인프라 최상급형\" 생활 리듬을 따릅니다.",
    "households": 745,
    "competitionRate": 5.1,
    "competitionDate": "2025-11"
  },
  {
    "id": "r13",
    "name": "금곡2 벽산블루밍",
    "district": "북구",
    "type": "redevelop",
    "eligibility": [
      "newlywed"
    ],
    "depositMin": 4346,
    "depositMax": 5926,
    "areaMin": 39.5,
    "areaMax": 39.5,
    "status": "open",
    "builtYear": 2014,
    "lat": 35.190548,
    "lng": 129.007592,
    "imageHue": 158,
    "lifestyleTags": [
      "shopping",
      "nature"
    ],
    "summary": "북구 화명·구포 신도시 가족형",
    "infra": {
      "cafe": 74,
      "gym": 58,
      "culture": 57,
      "mart": 91,
      "transit": 72,
      "nature": 74,
      "convenience": 82,
      "hospital": 87,
      "market": 70,
      "childcare": 81,
      "bank": 82,
      "parking": 99
    },
    "nearby": [
      {
        "name": "인근 편의시설",
        "dist": "230m",
        "kind": "parking"
      },
      {
        "name": "동네 마트",
        "dist": "423m",
        "kind": "mart"
      },
      {
        "name": "내과·이비인후과 밀집 상가",
        "dist": "686m",
        "kind": "hospital"
      },
      {
        "name": "다이소",
        "dist": "723m",
        "kind": "convenience"
      },
      {
        "name": "ATM 코너",
        "dist": "1.1km",
        "kind": "bank"
      }
    ],
    "highlights": [
      "북구 생활권",
      "shopping·nature 인프라",
      "51세대 규모"
    ],
    "commuteMinutes": {
      "centum": 36,
      "seomyeon": 24,
      "haeundae": 43,
      "nampo": 34,
      "pnu": 29
    },
    "pros": [
      "장보기·생활편의 인프라가 탄탄함",
      "카페·베이커리 밀집도가 높아 일상 동선이 편함",
      "북구 화명·구포 신도시 가족형 생활권"
    ],
    "cons": [
      "대형 쇼핑시설까지는 다소 거리가 있음",
      "주차 여건이 넉넉하지 않은 편"
    ],
    "similarEnv": "북구 일대의 전형적인 \"화명·구포 신도시 가족형\" 생활 리듬을 따릅니다.",
    "households": 51
  },
  {
    "id": "r14",
    "name": "대연1 롯데캐슬",
    "district": "남구",
    "type": "redevelop",
    "eligibility": [
      "general"
    ],
    "depositMin": 4375,
    "depositMax": 5966,
    "areaMin": 39.8,
    "areaMax": 39.8,
    "status": "soon",
    "builtYear": 2015,
    "lat": 35.14044,
    "lng": 129.11186,
    "imageHue": 209,
    "lifestyleTags": [
      "nature",
      "leisure"
    ],
    "summary": "남구 이기대·경성대 문화형",
    "infra": {
      "cafe": 74,
      "gym": 70,
      "culture": 74,
      "mart": 70,
      "transit": 63,
      "nature": 72,
      "convenience": 77,
      "hospital": 66,
      "market": 52,
      "childcare": 64,
      "bank": 69,
      "parking": 99
    },
    "nearby": [
      {
        "name": "인근 편의시설",
        "dist": "426m",
        "kind": "parking"
      },
      {
        "name": "편의점 밀집구간",
        "dist": "296m",
        "kind": "convenience"
      },
      {
        "name": "동네 카페거리",
        "dist": "528m",
        "kind": "cafe"
      },
      {
        "name": "작은도서관",
        "dist": "771m",
        "kind": "culture"
      },
      {
        "name": "근린공원",
        "dist": "986m",
        "kind": "nature"
      }
    ],
    "highlights": [
      "남구 생활권",
      "nature·leisure 인프라",
      "50세대 규모"
    ],
    "commuteMinutes": {
      "centum": 18,
      "seomyeon": 22,
      "haeundae": 21,
      "nampo": 30,
      "pnu": 35
    },
    "pros": [
      "카페·베이커리 밀집도가 높아 일상 동선이 편함",
      "도서관·문화시설이 가까움",
      "남구 이기대·경성대 문화형 생활권"
    ],
    "cons": [
      "경사·계단이 있어 이동에 다소 불편할 수 있음",
      "주차 여건이 넉넉하지 않은 편"
    ],
    "similarEnv": "남구 일대의 전형적인 \"이기대·경성대 문화형\" 생활 리듬을 따릅니다.",
    "households": 50,
    "competitionRate": 1.8,
    "competitionDate": "2026-03"
  },
  {
    "id": "r15",
    "name": "서대신3 한신휴플러스",
    "district": "서구",
    "type": "redevelop",
    "eligibility": [
      "newlywed"
    ],
    "depositMin": 4328,
    "depositMax": 5902,
    "areaMin": 39.4,
    "areaMax": 39.4,
    "status": "open",
    "builtYear": 2014,
    "lat": 35.0924,
    "lng": 129.019284,
    "imageHue": 184,
    "lifestyleTags": [
      "culture",
      "transit"
    ],
    "summary": "서구 원도심 산복도로·병원 인접형",
    "infra": {
      "cafe": 49,
      "gym": 51,
      "culture": 57,
      "mart": 52,
      "transit": 66,
      "nature": 49,
      "convenience": 51,
      "hospital": 51,
      "market": 75,
      "childcare": 52,
      "bank": 63,
      "parking": 99
    },
    "nearby": [
      {
        "name": "인근 편의시설",
        "dist": "322m",
        "kind": "parking"
      },
      {
        "name": "오일장터",
        "dist": "281m",
        "kind": "market"
      },
      {
        "name": "마을버스 정류장",
        "dist": "654m",
        "kind": "transit"
      },
      {
        "name": "새마을금고",
        "dist": "904m",
        "kind": "bank"
      },
      {
        "name": "문화의집",
        "dist": "946m",
        "kind": "culture"
      }
    ],
    "highlights": [
      "서구 생활권",
      "culture·transit 인프라",
      "30세대 규모"
    ],
    "commuteMinutes": {
      "centum": 41,
      "seomyeon": 29,
      "haeundae": 44,
      "nampo": 13,
      "pnu": 48
    },
    "pros": [
      "버스·지하철 환승이 편리함",
      "도서관·문화시설이 가까움",
      "서구 원도심 산복도로·병원 인접형 생활권"
    ],
    "cons": [
      "성수기엔 주변 소음·혼잡이 있을 수 있음",
      "평일 야간 유동인구가 적은 편"
    ],
    "similarEnv": "서구 일대의 전형적인 \"원도심 산복도로·병원 인접형\" 생활 리듬을 따릅니다.",
    "households": 30
  },
  {
    "id": "r16",
    "name": "장전1-2 벽산블루밍",
    "district": "금정구",
    "type": "redevelop",
    "eligibility": [
      "senior"
    ],
    "depositMin": 4377,
    "depositMax": 5968,
    "areaMin": 39.8,
    "areaMax": 39.8,
    "status": "open",
    "builtYear": 2012,
    "lat": 35.246048,
    "lng": 129.091832,
    "imageHue": 223,
    "lifestyleTags": [
      "culture",
      "nature"
    ],
    "summary": "금정구 부산대 캠퍼스·산책형",
    "infra": {
      "cafe": 62,
      "gym": 65,
      "culture": 74,
      "mart": 66,
      "transit": 67,
      "nature": 82,
      "convenience": 61,
      "hospital": 72,
      "market": 73,
      "childcare": 66,
      "bank": 72,
      "parking": 99
    },
    "nearby": [
      {
        "name": "인근 편의시설",
        "dist": "332m",
        "kind": "parking"
      },
      {
        "name": "산책로",
        "dist": "396m",
        "kind": "nature"
      },
      {
        "name": "작은도서관",
        "dist": "671m",
        "kind": "culture"
      },
      {
        "name": "오일장터",
        "dist": "941m",
        "kind": "market"
      },
      {
        "name": "내과·이비인후과 밀집 상가",
        "dist": "1.1km",
        "kind": "hospital"
      }
    ],
    "highlights": [
      "금정구 생활권",
      "culture·nature 인프라",
      "143세대 규모"
    ],
    "commuteMinutes": {
      "centum": 31,
      "seomyeon": 34,
      "haeundae": 37,
      "nampo": 50,
      "pnu": 14
    },
    "pros": [
      "공원·산책로 등 자연 접근성이 좋음",
      "도서관·문화시설이 가까움",
      "금정구 부산대 캠퍼스·산책형 생활권"
    ],
    "cons": [
      "평일 야간 유동인구가 적은 편",
      "대형 쇼핑시설까지는 다소 거리가 있음"
    ],
    "similarEnv": "금정구 일대의 전형적인 \"부산대 캠퍼스·산책형\" 생활 리듬을 따릅니다.",
    "households": 143,
    "competitionRate": 4.5,
    "competitionDate": "2026-07"
  },
  {
    "id": "r17",
    "name": "당리1 대우푸르지오",
    "district": "사하구",
    "type": "redevelop",
    "eligibility": [
      "youth"
    ],
    "depositMin": 3889,
    "depositMax": 7398,
    "areaMin": 35.4,
    "areaMax": 49.3,
    "status": "open",
    "builtYear": 2013,
    "lat": 35.106472,
    "lng": 128.9834,
    "imageHue": 228,
    "lifestyleTags": [
      "shopping",
      "nature"
    ],
    "summary": "사하구 낙동강·하단 생활형",
    "infra": {
      "cafe": 65,
      "gym": 53,
      "culture": 57,
      "mart": 83,
      "transit": 61,
      "nature": 60,
      "convenience": 84,
      "hospital": 79,
      "market": 78,
      "childcare": 82,
      "bank": 62,
      "parking": 99
    },
    "nearby": [
      {
        "name": "인근 편의시설",
        "dist": "326m",
        "kind": "parking"
      },
      {
        "name": "편의점 밀집구간",
        "dist": "313m",
        "kind": "convenience"
      },
      {
        "name": "편의점",
        "dist": "651m",
        "kind": "mart"
      },
      {
        "name": "육아종합지원센터",
        "dist": "950m",
        "kind": "childcare"
      },
      {
        "name": "치과의원",
        "dist": "1.1km",
        "kind": "hospital"
      }
    ],
    "highlights": [
      "사하구 생활권",
      "shopping·nature 인프라",
      "48세대 규모"
    ],
    "commuteMinutes": {
      "centum": 45,
      "seomyeon": 31,
      "haeundae": 49,
      "nampo": 20,
      "pnu": 48
    },
    "pros": [
      "장보기·생활편의 인프라가 탄탄함",
      "카페·베이커리 밀집도가 높아 일상 동선이 편함",
      "사하구 낙동강·하단 생활형 생활권"
    ],
    "cons": [
      "성수기엔 주변 소음·혼잡이 있을 수 있음",
      "초행길엔 골목이 헷갈릴 수 있음"
    ],
    "similarEnv": "사하구 일대의 전형적인 \"낙동강·하단 생활형\" 생활 리듬을 따릅니다.",
    "households": 48
  },
  {
    "id": "r18",
    "name": "명륜3 현대아이파크",
    "district": "동래구",
    "type": "redevelop",
    "eligibility": [
      "youth",
      "newlywed"
    ],
    "depositMin": 2662,
    "depositMax": 5216,
    "areaMin": 24.2,
    "areaMax": 34.8,
    "status": "open",
    "builtYear": 2013,
    "lat": 35.19426,
    "lng": 129.082244,
    "imageHue": 181,
    "lifestyleTags": [
      "culture",
      "transit"
    ],
    "summary": "동래구 온천장·전통 문화형",
    "infra": {
      "cafe": 71,
      "gym": 58,
      "culture": 73,
      "mart": 78,
      "transit": 88,
      "nature": 70,
      "convenience": 78,
      "hospital": 82,
      "market": 86,
      "childcare": 70,
      "bank": 77,
      "parking": 99
    },
    "nearby": [
      {
        "name": "인근 편의시설",
        "dist": "237m",
        "kind": "parking"
      },
      {
        "name": "마을버스 정류장",
        "dist": "469m",
        "kind": "transit"
      },
      {
        "name": "오일장터",
        "dist": "738m",
        "kind": "market"
      },
      {
        "name": "치과의원",
        "dist": "967m",
        "kind": "hospital"
      },
      {
        "name": "슈퍼마켓",
        "dist": "977m",
        "kind": "mart"
      }
    ],
    "highlights": [
      "동래구 생활권",
      "culture·transit 인프라",
      "124세대 규모"
    ],
    "commuteMinutes": {
      "centum": 22,
      "seomyeon": 20,
      "haeundae": 29,
      "nampo": 37,
      "pnu": 20
    },
    "pros": [
      "버스·지하철 환승이 편리함",
      "장보기·생활편의 인프라가 탄탄함",
      "동래구 온천장·전통 문화형 생활권"
    ],
    "cons": [
      "평일 야간 유동인구가 적은 편",
      "경사·계단이 있어 이동에 다소 불편할 수 있음"
    ],
    "similarEnv": "동래구 일대의 전형적인 \"온천장·전통 문화형\" 생활 리듬을 따릅니다.",
    "households": 124,
    "competitionRate": 1.7,
    "competitionDate": "2026-04"
  },
  {
    "id": "r19",
    "name": "재송1 포스코센텀누리",
    "district": "해운대구",
    "type": "redevelop",
    "eligibility": [
      "general",
      "senior"
    ],
    "depositMin": 3673,
    "depositMax": 5008,
    "areaMin": 33.4,
    "areaMax": 33.4,
    "status": "open",
    "builtYear": 2014,
    "lat": 35.156736,
    "lng": 129.152116,
    "imageHue": 189,
    "lifestyleTags": [
      "leisure",
      "shopping",
      "culture"
    ],
    "summary": "해운대구 해변·관광 인프라 최상급형",
    "infra": {
      "cafe": 86,
      "gym": 75,
      "culture": 78,
      "mart": 76,
      "transit": 75,
      "nature": 94,
      "convenience": 74,
      "hospital": 79,
      "market": 49,
      "childcare": 83,
      "bank": 73,
      "parking": 99
    },
    "nearby": [
      {
        "name": "인근 편의시설",
        "dist": "214m",
        "kind": "parking"
      },
      {
        "name": "체육공원",
        "dist": "292m",
        "kind": "nature"
      },
      {
        "name": "동네 카페거리",
        "dist": "668m",
        "kind": "cafe"
      },
      {
        "name": "국공립어린이집",
        "dist": "904m",
        "kind": "childcare"
      },
      {
        "name": "치과의원",
        "dist": "1.2km",
        "kind": "hospital"
      }
    ],
    "highlights": [
      "해운대구 생활권",
      "leisure·shopping·culture 인프라",
      "32세대 규모"
    ],
    "commuteMinutes": {
      "centum": 15,
      "seomyeon": 29,
      "haeundae": 12,
      "nampo": 39,
      "pnu": 35
    },
    "pros": [
      "공원·산책로 등 자연 접근성이 좋음",
      "카페·베이커리 밀집도가 높아 일상 동선이 편함",
      "해운대구 해변·관광 인프라 최상급형 생활권"
    ],
    "cons": [
      "초행길엔 골목이 헷갈릴 수 있음",
      "대형 쇼핑시설까지는 다소 거리가 있음"
    ],
    "similarEnv": "해운대구 일대의 전형적인 \"해변·관광 인프라 최상급형\" 생활 리듬을 따릅니다.",
    "households": 32
  },
  {
    "id": "r20",
    "name": "서정빌라 B동",
    "district": "영도구",
    "type": "purchase",
    "eligibility": [
      "youth"
    ],
    "depositMin": 213,
    "depositMax": 213,
    "areaMin": 33.0,
    "areaMax": 45.0,
    "status": "open",
    "builtYear": 2021,
    "lat": 35.102724,
    "lng": 129.070292,
    "imageHue": 159,
    "lifestyleTags": [
      "nature",
      "culture"
    ],
    "summary": "영도구 바닷가·감성카페 골목형",
    "infra": {
      "cafe": 71,
      "gym": 39,
      "culture": 61,
      "mart": 42,
      "transit": 59,
      "nature": 74,
      "convenience": 59,
      "hospital": 46,
      "market": 64,
      "childcare": 53,
      "bank": 48,
      "parking": 38
    },
    "nearby": [
      {
        "name": "산책로",
        "dist": "338m",
        "kind": "nature"
      },
      {
        "name": "동네 카페거리",
        "dist": "460m",
        "kind": "cafe"
      },
      {
        "name": "전통시장",
        "dist": "663m",
        "kind": "market"
      },
      {
        "name": "주민센터 문화강좌실",
        "dist": "784m",
        "kind": "culture"
      },
      {
        "name": "버스환승정류장",
        "dist": "997m",
        "kind": "transit"
      }
    ],
    "highlights": [
      "영도구 생활권",
      "nature·culture 인프라",
      "9세대 규모"
    ],
    "commuteMinutes": {
      "centum": 31,
      "seomyeon": 24,
      "haeundae": 34,
      "nampo": 18,
      "pnu": 44
    },
    "pros": [
      "공원·산책로 등 자연 접근성이 좋음",
      "카페·베이커리 밀집도가 높아 일상 동선이 편함",
      "영도구 바닷가·감성카페 골목형 생활권"
    ],
    "cons": [
      "성수기엔 주변 소음·혼잡이 있을 수 있음",
      "초행길엔 골목이 헷갈릴 수 있음"
    ],
    "similarEnv": "영도구 일대의 전형적인 \"바닷가·감성카페 골목형\" 생활 리듬을 따릅니다.",
    "households": 9,
    "competitionRate": 2.3,
    "competitionDate": "2025-12"
  },
  {
    "id": "r21",
    "name": "동삼그린힐아파트",
    "district": "영도구",
    "type": "purchase",
    "eligibility": [
      "general",
      "senior"
    ],
    "depositMin": 422,
    "depositMax": 422,
    "areaMin": 22.0,
    "areaMax": 33.0,
    "status": "soon",
    "builtYear": 2017,
    "lat": 35.08824,
    "lng": 129.065252,
    "imageHue": 215,
    "lifestyleTags": [
      "nature",
      "culture"
    ],
    "summary": "영도구 바닷가·감성카페 골목형",
    "infra": {
      "cafe": 55,
      "gym": 48,
      "culture": 49,
      "mart": 40,
      "transit": 60,
      "nature": 80,
      "convenience": 53,
      "hospital": 46,
      "market": 69,
      "childcare": 61,
      "bank": 52,
      "parking": 18
    },
    "nearby": [
      {
        "name": "체육공원",
        "dist": "307m",
        "kind": "nature"
      },
      {
        "name": "오일장터",
        "dist": "302m",
        "kind": "market"
      },
      {
        "name": "국공립어린이집",
        "dist": "633m",
        "kind": "childcare"
      },
      {
        "name": "지하철역",
        "dist": "949m",
        "kind": "transit"
      },
      {
        "name": "동네 카페거리",
        "dist": "1.2km",
        "kind": "cafe"
      }
    ],
    "highlights": [
      "영도구 생활권",
      "nature·culture 인프라",
      "1세대 규모"
    ],
    "commuteMinutes": {
      "centum": 35,
      "seomyeon": 28,
      "haeundae": 37,
      "nampo": 17,
      "pnu": 47
    },
    "pros": [
      "공원·산책로 등 자연 접근성이 좋음",
      "버스·지하철 환승이 편리함",
      "영도구 바닷가·감성카페 골목형 생활권"
    ],
    "cons": [
      "주차 여건이 넉넉하지 않은 편",
      "성수기엔 주변 소음·혼잡이 있을 수 있음"
    ],
    "similarEnv": "영도구 일대의 전형적인 \"바닷가·감성카페 골목형\" 생활 리듬을 따릅니다.",
    "households": 1
  },
  {
    "id": "r22",
    "name": "행복하우스 1차",
    "district": "영도구",
    "type": "purchase",
    "eligibility": [
      "general",
      "senior"
    ],
    "depositMin": 556,
    "depositMax": 556,
    "areaMin": 16.5,
    "areaMax": 26.0,
    "status": "closed",
    "builtYear": 2023,
    "lat": 35.091984,
    "lng": 129.079148,
    "imageHue": 159,
    "lifestyleTags": [
      "nature",
      "culture"
    ],
    "summary": "영도구 바닷가·감성카페 골목형",
    "infra": {
      "cafe": 64,
      "gym": 48,
      "culture": 57,
      "mart": 49,
      "transit": 52,
      "nature": 72,
      "convenience": 62,
      "hospital": 57,
      "market": 68,
      "childcare": 61,
      "bank": 50,
      "parking": 38
    },
    "nearby": [
      {
        "name": "체육공원",
        "dist": "366m",
        "kind": "nature"
      },
      {
        "name": "전통시장",
        "dist": "319m",
        "kind": "market"
      },
      {
        "name": "프랜차이즈 커피전문점",
        "dist": "667m",
        "kind": "cafe"
      },
      {
        "name": "올리브영",
        "dist": "779m",
        "kind": "convenience"
      },
      {
        "name": "육아종합지원센터",
        "dist": "1.1km",
        "kind": "childcare"
      }
    ],
    "highlights": [
      "영도구 생활권",
      "nature·culture 인프라",
      "14세대 규모"
    ],
    "commuteMinutes": {
      "centum": 33,
      "seomyeon": 27,
      "haeundae": 34,
      "nampo": 20,
      "pnu": 46
    },
    "pros": [
      "공원·산책로 등 자연 접근성이 좋음",
      "카페·베이커리 밀집도가 높아 일상 동선이 편함",
      "영도구 바닷가·감성카페 골목형 생활권"
    ],
    "cons": [
      "주차 여건이 넉넉하지 않은 편",
      "성수기엔 주변 소음·혼잡이 있을 수 있음"
    ],
    "similarEnv": "영도구 일대의 전형적인 \"바닷가·감성카페 골목형\" 생활 리듬을 따릅니다.",
    "households": 14,
    "competitionRate": 1.4,
    "competitionDate": "2026-04"
  },
  {
    "id": "r23",
    "name": "대성캐슬2",
    "district": "사상구",
    "type": "purchase",
    "eligibility": [
      "youth",
      "newlywed"
    ],
    "depositMin": 5801,
    "depositMax": 5801,
    "areaMin": 33.0,
    "areaMax": 45.0,
    "status": "open",
    "builtYear": 2017,
    "lat": 35.154452,
    "lng": 128.9903,
    "imageHue": 203,
    "lifestyleTags": [
      "startup",
      "transit",
      "shopping"
    ],
    "summary": "사상구 사상역 환승·산업단지형",
    "infra": {
      "cafe": 68,
      "gym": 60,
      "culture": 62,
      "mart": 83,
      "transit": 92,
      "nature": 50,
      "convenience": 77,
      "hospital": 81,
      "market": 80,
      "childcare": 73,
      "bank": 91,
      "parking": 36
    },
    "nearby": [
      {
        "name": "마을버스 정류장",
        "dist": "236m",
        "kind": "transit"
      },
      {
        "name": "은행 지점",
        "dist": "517m",
        "kind": "bank"
      },
      {
        "name": "편의점",
        "dist": "733m",
        "kind": "mart"
      },
      {
        "name": "내과·이비인후과 밀집 상가",
        "dist": "989m",
        "kind": "hospital"
      },
      {
        "name": "재래시장 골목",
        "dist": "1.1km",
        "kind": "market"
      }
    ],
    "highlights": [
      "사상구 생활권",
      "startup·transit·shopping 인프라",
      "7세대 규모"
    ],
    "commuteMinutes": {
      "centum": 40,
      "seomyeon": 24,
      "haeundae": 46,
      "nampo": 27,
      "pnu": 38
    },
    "pros": [
      "버스·지하철 환승이 편리함",
      "장보기·생활편의 인프라가 탄탄함",
      "사상구 사상역 환승·산업단지형 생활권"
    ],
    "cons": [
      "초행길엔 골목이 헷갈릴 수 있음"
    ],
    "similarEnv": "사상구 일대의 전형적인 \"사상역 환승·산업단지형\" 생활 리듬을 따릅니다.",
    "households": 7
  },
  {
    "id": "r24",
    "name": "경보 이리스오션",
    "district": "중구",
    "type": "purchase",
    "eligibility": [
      "general"
    ],
    "depositMin": 100,
    "depositMax": 100,
    "areaMin": 16.5,
    "areaMax": 26.0,
    "status": "open",
    "builtYear": 2013,
    "lat": 35.097456,
    "lng": 129.038848,
    "imageHue": 150,
    "lifestyleTags": [
      "shopping",
      "culture",
      "transit"
    ],
    "summary": "중구 원도심·남포동 상권형",
    "infra": {
      "cafe": 84,
      "gym": 45,
      "culture": 80,
      "mart": 76,
      "transit": 92,
      "nature": 39,
      "convenience": 80,
      "hospital": 91,
      "market": 88,
      "childcare": 67,
      "bank": 83,
      "parking": 34
    },
    "nearby": [
      {
        "name": "마을버스 정류장",
        "dist": "381m",
        "kind": "transit"
      },
      {
        "name": "동네약국",
        "dist": "432m",
        "kind": "hospital"
      },
      {
        "name": "오일장터",
        "dist": "593m",
        "kind": "market"
      },
      {
        "name": "프랜차이즈 커피전문점",
        "dist": "968m",
        "kind": "cafe"
      },
      {
        "name": "은행 지점",
        "dist": "1.2km",
        "kind": "bank"
      }
    ],
    "highlights": [
      "중구 생활권",
      "shopping·culture·transit 인프라",
      "6세대 규모"
    ],
    "commuteMinutes": {
      "centum": 37,
      "seomyeon": 26,
      "haeundae": 40,
      "nampo": 11,
      "pnu": 46
    },
    "pros": [
      "버스·지하철 환승이 편리함",
      "카페·베이커리 밀집도가 높아 일상 동선이 편함",
      "중구 원도심·남포동 상권형 생활권"
    ],
    "cons": [
      "평일 야간 유동인구가 적은 편",
      "경사·계단이 있어 이동에 다소 불편할 수 있음"
    ],
    "similarEnv": "중구 일대의 전형적인 \"원도심·남포동 상권형\" 생활 리듬을 따릅니다.",
    "households": 6,
    "competitionRate": 1.3,
    "competitionDate": "2025-12"
  },
  {
    "id": "r25",
    "name": "경보이리스오션 더스타",
    "district": "중구",
    "type": "purchase",
    "eligibility": [
      "general"
    ],
    "depositMin": 100,
    "depositMax": 100,
    "areaMin": 22.0,
    "areaMax": 33.0,
    "status": "open",
    "builtYear": 2014,
    "lat": 35.107824,
    "lng": 129.039016,
    "imageHue": 224,
    "lifestyleTags": [
      "shopping",
      "culture",
      "transit"
    ],
    "summary": "중구 원도심·남포동 상권형",
    "infra": {
      "cafe": 72,
      "gym": 58,
      "culture": 72,
      "mart": 63,
      "transit": 80,
      "nature": 40,
      "convenience": 64,
      "hospital": 69,
      "market": 91,
      "childcare": 53,
      "bank": 69,
      "parking": 30
    },
    "nearby": [
      {
        "name": "전통시장",
        "dist": "306m",
        "kind": "market"
      },
      {
        "name": "마을버스 정류장",
        "dist": "281m",
        "kind": "transit"
      },
      {
        "name": "프랜차이즈 커피전문점",
        "dist": "663m",
        "kind": "cafe"
      },
      {
        "name": "문화의집",
        "dist": "827m",
        "kind": "culture"
      },
      {
        "name": "내과·이비인후과 밀집 상가",
        "dist": "1.0km",
        "kind": "hospital"
      }
    ],
    "highlights": [
      "중구 생활권",
      "shopping·culture·transit 인프라",
      "7세대 규모"
    ],
    "commuteMinutes": {
      "centum": 35,
      "seomyeon": 23,
      "haeundae": 39,
      "nampo": 13,
      "pnu": 43
    },
    "pros": [
      "버스·지하철 환승이 편리함",
      "카페·베이커리 밀집도가 높아 일상 동선이 편함",
      "중구 원도심·남포동 상권형 생활권"
    ],
    "cons": [
      "주차 여건이 넉넉하지 않은 편",
      "대형 쇼핑시설까지는 다소 거리가 있음"
    ],
    "similarEnv": "중구 일대의 전형적인 \"원도심·남포동 상권형\" 생활 리듬을 따릅니다.",
    "households": 7
  },
  {
    "id": "r26",
    "name": "프리미엄안단테",
    "district": "중구",
    "type": "purchase",
    "eligibility": [
      "youth",
      "newlywed"
    ],
    "depositMin": 144,
    "depositMax": 450,
    "areaMin": 16.5,
    "areaMax": 26.0,
    "status": "open",
    "builtYear": 2013,
    "lat": 35.098332,
    "lng": 129.024232,
    "imageHue": 214,
    "lifestyleTags": [
      "shopping",
      "culture",
      "transit"
    ],
    "summary": "중구 원도심·남포동 상권형",
    "infra": {
      "cafe": 80,
      "gym": 55,
      "culture": 73,
      "mart": 67,
      "transit": 89,
      "nature": 37,
      "convenience": 66,
      "hospital": 80,
      "market": 97,
      "childcare": 56,
      "bank": 74,
      "parking": 42
    },
    "nearby": [
      {
        "name": "전통시장",
        "dist": "312m",
        "kind": "market"
      },
      {
        "name": "지하철역",
        "dist": "401m",
        "kind": "transit"
      },
      {
        "name": "프랜차이즈 커피전문점",
        "dist": "543m",
        "kind": "cafe"
      },
      {
        "name": "내과·이비인후과 밀집 상가",
        "dist": "779m",
        "kind": "hospital"
      },
      {
        "name": "ATM 코너",
        "dist": "1.2km",
        "kind": "bank"
      }
    ],
    "highlights": [
      "중구 생활권",
      "shopping·culture·transit 인프라",
      "15세대 규모"
    ],
    "commuteMinutes": {
      "centum": 39,
      "seomyeon": 27,
      "haeundae": 42,
      "nampo": 12,
      "pnu": 47
    },
    "pros": [
      "버스·지하철 환승이 편리함",
      "카페·베이커리 밀집도가 높아 일상 동선이 편함",
      "중구 원도심·남포동 상권형 생활권"
    ],
    "cons": [
      "성수기엔 주변 소음·혼잡이 있을 수 있음",
      "초행길엔 골목이 헷갈릴 수 있음"
    ],
    "similarEnv": "중구 일대의 전형적인 \"원도심·남포동 상권형\" 생활 리듬을 따릅니다.",
    "households": 15,
    "competitionRate": 2.5,
    "competitionDate": "2026-07"
  },
  {
    "id": "r27",
    "name": "중앙역퀸즈W테라스에디션",
    "district": "중구",
    "type": "purchase",
    "eligibility": [
      "general"
    ],
    "depositMin": 309,
    "depositMax": 415,
    "areaMin": 22.0,
    "areaMax": 33.0,
    "status": "open",
    "builtYear": 2018,
    "lat": 35.104284,
    "lng": 129.039832,
    "imageHue": 141,
    "lifestyleTags": [
      "shopping",
      "culture",
      "transit"
    ],
    "summary": "중구 원도심·남포동 상권형",
    "infra": {
      "cafe": 77,
      "gym": 47,
      "culture": 74,
      "mart": 78,
      "transit": 80,
      "nature": 38,
      "convenience": 74,
      "hospital": 80,
      "market": 89,
      "childcare": 68,
      "bank": 75,
      "parking": 15
    },
    "nearby": [
      {
        "name": "오일장터",
        "dist": "169m",
        "kind": "market"
      },
      {
        "name": "마을버스 정류장",
        "dist": "315m",
        "kind": "transit"
      },
      {
        "name": "치과의원",
        "dist": "494m",
        "kind": "hospital"
      },
      {
        "name": "슈퍼마켓",
        "dist": "827m",
        "kind": "mart"
      },
      {
        "name": "프랜차이즈 커피전문점",
        "dist": "1.1km",
        "kind": "cafe"
      }
    ],
    "highlights": [
      "중구 생활권",
      "shopping·culture·transit 인프라",
      "72세대 규모"
    ],
    "commuteMinutes": {
      "centum": 35,
      "seomyeon": 24,
      "haeundae": 39,
      "nampo": 12,
      "pnu": 44
    },
    "pros": [
      "버스·지하철 환승이 편리함",
      "장보기·생활편의 인프라가 탄탄함",
      "중구 원도심·남포동 상권형 생활권"
    ],
    "cons": [
      "평일 야간 유동인구가 적은 편",
      "경사·계단이 있어 이동에 다소 불편할 수 있음"
    ],
    "similarEnv": "중구 일대의 전형적인 \"원도심·남포동 상권형\" 생활 리듬을 따릅니다.",
    "households": 72
  },
  {
    "id": "r28",
    "name": "범일2차봄여름가을겨울",
    "district": "동구",
    "type": "purchase",
    "eligibility": [
      "youth"
    ],
    "depositMin": 100,
    "depositMax": 200,
    "areaMin": 33.0,
    "areaMax": 45.0,
    "status": "soon",
    "builtYear": 2019,
    "lat": 35.127824,
    "lng": 129.049572,
    "imageHue": 154,
    "lifestyleTags": [
      "transit",
      "shopping"
    ],
    "summary": "동구 부산역·환승 중심형",
    "infra": {
      "cafe": 47,
      "gym": 50,
      "culture": 49,
      "mart": 60,
      "transit": 76,
      "nature": 38,
      "convenience": 61,
      "hospital": 67,
      "market": 80,
      "childcare": 45,
      "bank": 66,
      "parking": 27
    },
    "nearby": [
      {
        "name": "재래시장 골목",
        "dist": "331m",
        "kind": "market"
      },
      {
        "name": "마을버스 정류장",
        "dist": "332m",
        "kind": "transit"
      },
      {
        "name": "치과의원",
        "dist": "603m",
        "kind": "hospital"
      },
      {
        "name": "ATM 코너",
        "dist": "927m",
        "kind": "bank"
      },
      {
        "name": "올리브영",
        "dist": "985m",
        "kind": "convenience"
      }
    ],
    "highlights": [
      "동구 생활권",
      "transit·shopping 인프라",
      "17세대 규모"
    ],
    "commuteMinutes": {
      "centum": 30,
      "seomyeon": 18,
      "haeundae": 34,
      "nampo": 19,
      "pnu": 38
    },
    "pros": [
      "버스·지하철 환승이 편리함",
      "장보기·생활편의 인프라가 탄탄함",
      "동구 부산역·환승 중심형 생활권"
    ],
    "cons": [
      "경사·계단이 있어 이동에 다소 불편할 수 있음"
    ],
    "similarEnv": "동구 일대의 전형적인 \"부산역·환승 중심형\" 생활 리듬을 따릅니다.",
    "households": 17,
    "competitionRate": 2.0,
    "competitionDate": "2026-05"
  },
  {
    "id": "r29",
    "name": "'20년 공공리모델링주택(수정동)",
    "district": "동구",
    "type": "purchase",
    "eligibility": [
      "general"
    ],
    "depositMin": 120,
    "depositMax": 200,
    "areaMin": 16.5,
    "areaMax": 26.0,
    "status": "open",
    "builtYear": 2016,
    "lat": 35.13488,
    "lng": 129.04854,
    "imageHue": 167,
    "lifestyleTags": [
      "transit",
      "shopping"
    ],
    "summary": "동구 부산역·환승 중심형",
    "infra": {
      "cafe": 60,
      "gym": 41,
      "culture": 57,
      "mart": 51,
      "transit": 85,
      "nature": 46,
      "convenience": 55,
      "hospital": 73,
      "market": 87,
      "childcare": 42,
      "bank": 78,
      "parking": 34
    },
    "nearby": [
      {
        "name": "오일장터",
        "dist": "269m",
        "kind": "market"
      },
      {
        "name": "마을버스 정류장",
        "dist": "470m",
        "kind": "transit"
      },
      {
        "name": "은행 지점",
        "dist": "526m",
        "kind": "bank"
      },
      {
        "name": "내과·이비인후과 밀집 상가",
        "dist": "811m",
        "kind": "hospital"
      },
      {
        "name": "프랜차이즈 커피전문점",
        "dist": "1.1km",
        "kind": "cafe"
      }
    ],
    "highlights": [
      "동구 생활권",
      "transit·shopping 인프라",
      "30세대 규모"
    ],
    "commuteMinutes": {
      "centum": 29,
      "seomyeon": 16,
      "haeundae": 34,
      "nampo": 20,
      "pnu": 36
    },
    "pros": [
      "버스·지하철 환승이 편리함",
      "카페·베이커리 밀집도가 높아 일상 동선이 편함",
      "동구 부산역·환승 중심형 생활권"
    ],
    "cons": [
      "경사·계단이 있어 이동에 다소 불편할 수 있음",
      "성수기엔 주변 소음·혼잡이 있을 수 있음"
    ],
    "similarEnv": "동구 일대의 전형적인 \"부산역·환승 중심형\" 생활 리듬을 따릅니다.",
    "households": 30
  },
  {
    "id": "r30",
    "name": "태광빌",
    "district": "동구",
    "type": "purchase",
    "eligibility": [
      "youth",
      "newlywed"
    ],
    "depositMin": 862,
    "depositMax": 862,
    "areaMin": 33.0,
    "areaMax": 45.0,
    "status": "open",
    "builtYear": 2019,
    "lat": 35.133512,
    "lng": 129.049008,
    "imageHue": 206,
    "lifestyleTags": [
      "transit",
      "shopping"
    ],
    "summary": "동구 부산역·환승 중심형",
    "infra": {
      "cafe": 57,
      "gym": 58,
      "culture": 51,
      "mart": 68,
      "transit": 90,
      "nature": 32,
      "convenience": 67,
      "hospital": 82,
      "market": 78,
      "childcare": 51,
      "bank": 78,
      "parking": 22
    },
    "nearby": [
      {
        "name": "마을버스 정류장",
        "dist": "248m",
        "kind": "transit"
      },
      {
        "name": "치과의원",
        "dist": "528m",
        "kind": "hospital"
      },
      {
        "name": "재래시장 골목",
        "dist": "560m",
        "kind": "market"
      },
      {
        "name": "ATM 코너",
        "dist": "846m",
        "kind": "bank"
      },
      {
        "name": "편의점",
        "dist": "925m",
        "kind": "mart"
      }
    ],
    "highlights": [
      "동구 생활권",
      "transit·shopping 인프라",
      "6세대 규모"
    ],
    "commuteMinutes": {
      "centum": 29,
      "seomyeon": 17,
      "haeundae": 34,
      "nampo": 20,
      "pnu": 36
    },
    "pros": [
      "버스·지하철 환승이 편리함",
      "장보기·생활편의 인프라가 탄탄함",
      "동구 부산역·환승 중심형 생활권"
    ],
    "cons": [
      "대형 쇼핑시설까지는 다소 거리가 있음",
      "초행길엔 골목이 헷갈릴 수 있음"
    ],
    "similarEnv": "동구 일대의 전형적인 \"부산역·환승 중심형\" 생활 리듬을 따릅니다.",
    "households": 6,
    "competitionRate": 1.9,
    "competitionDate": "2025-11"
  },
  {
    "id": "r31",
    "name": "가야봄여름가을겨울 102동",
    "district": "부산진구",
    "type": "purchase",
    "eligibility": [
      "general"
    ],
    "depositMin": 100,
    "depositMax": 200,
    "areaMin": 33.0,
    "areaMax": 45.0,
    "status": "open",
    "builtYear": 2014,
    "lat": 35.156572,
    "lng": 129.047768,
    "imageHue": 208,
    "lifestyleTags": [
      "shopping",
      "startup",
      "transit"
    ],
    "summary": "부산진구 서면 중심 번화가형",
    "infra": {
      "cafe": 89,
      "gym": 83,
      "culture": 67,
      "mart": 93,
      "transit": 87,
      "nature": 42,
      "convenience": 96,
      "hospital": 83,
      "market": 90,
      "childcare": 70,
      "bank": 91,
      "parking": 34
    },
    "nearby": [
      {
        "name": "다이소",
        "dist": "164m",
        "kind": "convenience"
      },
      {
        "name": "슈퍼마켓",
        "dist": "353m",
        "kind": "mart"
      },
      {
        "name": "새마을금고",
        "dist": "650m",
        "kind": "bank"
      },
      {
        "name": "전통시장",
        "dist": "925m",
        "kind": "market"
      },
      {
        "name": "프랜차이즈 커피전문점",
        "dist": "1.1km",
        "kind": "cafe"
      }
    ],
    "highlights": [
      "부산진구 생활권",
      "shopping·startup·transit 인프라",
      "64세대 규모"
    ],
    "commuteMinutes": {
      "centum": 28,
      "seomyeon": 12,
      "haeundae": 34,
      "nampo": 25,
      "pnu": 31
    },
    "pros": [
      "장보기·생활편의 인프라가 탄탄함",
      "카페·베이커리 밀집도가 높아 일상 동선이 편함",
      "부산진구 서면 중심 번화가형 생활권"
    ],
    "cons": [
      "주차 여건이 넉넉하지 않은 편"
    ],
    "similarEnv": "부산진구 일대의 전형적인 \"서면 중심 번화가형\" 생활 리듬을 따릅니다.",
    "households": 64
  },
  {
    "id": "r32",
    "name": "포란재빌라",
    "district": "부산진구",
    "type": "purchase",
    "eligibility": [
      "senior"
    ],
    "depositMin": 319,
    "depositMax": 319,
    "areaMin": 33.0,
    "areaMax": 45.0,
    "status": "open",
    "builtYear": 2023,
    "lat": 35.147116,
    "lng": 129.049748,
    "imageHue": 220,
    "lifestyleTags": [
      "shopping",
      "startup",
      "transit"
    ],
    "summary": "부산진구 서면 중심 번화가형",
    "infra": {
      "cafe": 91,
      "gym": 84,
      "culture": 73,
      "mart": 89,
      "transit": 93,
      "nature": 45,
      "convenience": 86,
      "hospital": 95,
      "market": 76,
      "childcare": 76,
      "bank": 89,
      "parking": 15
    },
    "nearby": [
      {
        "name": "내과·이비인후과 밀집 상가",
        "dist": "382m",
        "kind": "hospital"
      },
      {
        "name": "지하철역",
        "dist": "516m",
        "kind": "transit"
      },
      {
        "name": "프랜차이즈 커피전문점",
        "dist": "575m",
        "kind": "cafe"
      },
      {
        "name": "슈퍼마켓",
        "dist": "907m",
        "kind": "mart"
      },
      {
        "name": "은행 지점",
        "dist": "1.1km",
        "kind": "bank"
      }
    ],
    "highlights": [
      "부산진구 생활권",
      "shopping·startup·transit 인프라",
      "8세대 규모"
    ],
    "commuteMinutes": {
      "centum": 28,
      "seomyeon": 13,
      "haeundae": 33,
      "nampo": 23,
      "pnu": 33
    },
    "pros": [
      "버스·지하철 환승이 편리함",
      "카페·베이커리 밀집도가 높아 일상 동선이 편함",
      "부산진구 서면 중심 번화가형 생활권"
    ],
    "cons": [
      "경사·계단이 있어 이동에 다소 불편할 수 있음",
      "평일 야간 유동인구가 적은 편"
    ],
    "similarEnv": "부산진구 일대의 전형적인 \"서면 중심 번화가형\" 생활 리듬을 따릅니다.",
    "households": 8,
    "competitionRate": 2.4,
    "competitionDate": "2026-07"
  },
  {
    "id": "r33",
    "name": "대능더에스티지",
    "district": "부산진구",
    "type": "purchase",
    "eligibility": [
      "general",
      "senior"
    ],
    "depositMin": 4373,
    "depositMax": 4373,
    "areaMin": 33.0,
    "areaMax": 45.0,
    "status": "closed",
    "builtYear": 2016,
    "lat": 35.153188,
    "lng": 129.052532,
    "imageHue": 164,
    "lifestyleTags": [
      "shopping",
      "startup",
      "transit"
    ],
    "summary": "부산진구 서면 중심 번화가형",
    "infra": {
      "cafe": 79,
      "gym": 81,
      "culture": 79,
      "mart": 93,
      "transit": 97,
      "nature": 41,
      "convenience": 91,
      "hospital": 88,
      "market": 76,
      "childcare": 74,
      "bank": 98,
      "parking": 34
    },
    "nearby": [
      {
        "name": "은행 지점",
        "dist": "229m",
        "kind": "bank"
      },
      {
        "name": "버스환승정류장",
        "dist": "469m",
        "kind": "transit"
      },
      {
        "name": "슈퍼마켓",
        "dist": "637m",
        "kind": "mart"
      },
      {
        "name": "올리브영",
        "dist": "960m",
        "kind": "convenience"
      },
      {
        "name": "치과의원",
        "dist": "1.1km",
        "kind": "hospital"
      }
    ],
    "highlights": [
      "부산진구 생활권",
      "shopping·startup·transit 인프라",
      "10세대 규모"
    ],
    "commuteMinutes": {
      "centum": 27,
      "seomyeon": 12,
      "haeundae": 33,
      "nampo": 25,
      "pnu": 31
    },
    "pros": [
      "버스·지하철 환승이 편리함",
      "장보기·생활편의 인프라가 탄탄함",
      "부산진구 서면 중심 번화가형 생활권"
    ],
    "cons": [
      "경사·계단이 있어 이동에 다소 불편할 수 있음",
      "초행길엔 골목이 헷갈릴 수 있음"
    ],
    "similarEnv": "부산진구 일대의 전형적인 \"서면 중심 번화가형\" 생활 리듬을 따릅니다.",
    "households": 10
  },
  {
    "id": "r34",
    "name": "장춘빌 A동",
    "district": "동래구",
    "type": "purchase",
    "eligibility": [
      "newlywed"
    ],
    "depositMin": 498,
    "depositMax": 498,
    "areaMin": 22.0,
    "areaMax": 33.0,
    "status": "open",
    "builtYear": 2023,
    "lat": 35.216124,
    "lng": 129.08738,
    "imageHue": 173,
    "lifestyleTags": [
      "culture",
      "transit"
    ],
    "summary": "동래구 온천장·전통 문화형",
    "infra": {
      "cafe": 69,
      "gym": 64,
      "culture": 78,
      "mart": 75,
      "transit": 72,
      "nature": 56,
      "convenience": 70,
      "hospital": 73,
      "market": 84,
      "childcare": 70,
      "bank": 66,
      "parking": 41
    },
    "nearby": [
      {
        "name": "전통시장",
        "dist": "320m",
        "kind": "market"
      },
      {
        "name": "주민센터 문화강좌실",
        "dist": "449m",
        "kind": "culture"
      },
      {
        "name": "편의점",
        "dist": "464m",
        "kind": "mart"
      },
      {
        "name": "내과·이비인후과 밀집 상가",
        "dist": "742m",
        "kind": "hospital"
      },
      {
        "name": "버스환승정류장",
        "dist": "1.0km",
        "kind": "transit"
      }
    ],
    "highlights": [
      "동래구 생활권",
      "culture·transit 인프라",
      "11세대 규모"
    ],
    "commuteMinutes": {
      "centum": 25,
      "seomyeon": 26,
      "haeundae": 31,
      "nampo": 42,
      "pnu": 15
    },
    "pros": [
      "도서관·문화시설이 가까움",
      "장보기·생활편의 인프라가 탄탄함",
      "동래구 온천장·전통 문화형 생활권"
    ],
    "cons": [
      "초행길엔 골목이 헷갈릴 수 있음",
      "주차 여건이 넉넉하지 않은 편"
    ],
    "similarEnv": "동래구 일대의 전형적인 \"온천장·전통 문화형\" 생활 리듬을 따릅니다.",
    "households": 11,
    "competitionRate": 2.1,
    "competitionDate": "2025-11"
  },
  {
    "id": "r35",
    "name": "석홍빌리지3차",
    "district": "연제구",
    "type": "purchase",
    "eligibility": [
      "general"
    ],
    "depositMin": 400,
    "depositMax": 400,
    "areaMin": 33.0,
    "areaMax": 45.0,
    "status": "soon",
    "builtYear": 2018,
    "lat": 35.1748,
    "lng": 129.069764,
    "imageHue": 150,
    "lifestyleTags": [
      "transit",
      "shopping",
      "startup"
    ],
    "summary": "연제구 시청·행정 중심 균형형",
    "infra": {
      "cafe": 71,
      "gym": 79,
      "culture": 71,
      "mart": 76,
      "transit": 81,
      "nature": 59,
      "convenience": 68,
      "hospital": 76,
      "market": 60,
      "childcare": 62,
      "bank": 78,
      "parking": 22
    },
    "nearby": [
      {
        "name": "버스환승정류장",
        "dist": "337m",
        "kind": "transit"
      },
      {
        "name": "헬스클럽",
        "dist": "365m",
        "kind": "gym"
      },
      {
        "name": "은행 지점",
        "dist": "517m",
        "kind": "bank"
      },
      {
        "name": "편의점",
        "dist": "763m",
        "kind": "mart"
      },
      {
        "name": "내과·이비인후과 밀집 상가",
        "dist": "1.1km",
        "kind": "hospital"
      }
    ],
    "highlights": [
      "연제구 생활권",
      "transit·shopping·startup 인프라",
      "16세대 규모"
    ],
    "commuteMinutes": {
      "centum": 23,
      "seomyeon": 15,
      "haeundae": 29,
      "nampo": 31,
      "pnu": 25
    },
    "pros": [
      "버스·지하철 환승이 편리함",
      "헬스장·운동시설 접근성이 좋음",
      "연제구 시청·행정 중심 균형형 생활권"
    ],
    "cons": [
      "평일 야간 유동인구가 적은 편",
      "경사·계단이 있어 이동에 다소 불편할 수 있음"
    ],
    "similarEnv": "연제구 일대의 전형적인 \"시청·행정 중심 균형형\" 생활 리듬을 따릅니다.",
    "households": 16
  },
  {
    "id": "r36",
    "name": "금오그린빌라",
    "district": "서구",
    "type": "purchase",
    "eligibility": [
      "senior"
    ],
    "depositMin": 369,
    "depositMax": 369,
    "areaMin": 16.5,
    "areaMax": 26.0,
    "status": "open",
    "builtYear": 2016,
    "lat": 35.102528,
    "lng": 129.009456,
    "imageHue": 220,
    "lifestyleTags": [
      "culture",
      "transit"
    ],
    "summary": "서구 원도심 산복도로·병원 인접형",
    "infra": {
      "cafe": 57,
      "gym": 58,
      "culture": 58,
      "mart": 58,
      "transit": 77,
      "nature": 53,
      "convenience": 61,
      "hospital": 68,
      "market": 67,
      "childcare": 52,
      "bank": 73,
      "parking": 15
    },
    "nearby": [
      {
        "name": "버스환승정류장",
        "dist": "294m",
        "kind": "transit"
      },
      {
        "name": "새마을금고",
        "dist": "556m",
        "kind": "bank"
      },
      {
        "name": "내과·이비인후과 밀집 상가",
        "dist": "471m",
        "kind": "hospital"
      },
      {
        "name": "전통시장",
        "dist": "865m",
        "kind": "market"
      },
      {
        "name": "다이소",
        "dist": "1.2km",
        "kind": "convenience"
      }
    ],
    "highlights": [
      "서구 생활권",
      "culture·transit 인프라",
      "8세대 규모"
    ],
    "commuteMinutes": {
      "centum": 41,
      "seomyeon": 28,
      "haeundae": 45,
      "nampo": 15,
      "pnu": 47
    },
    "pros": [
      "버스·지하철 환승이 편리함",
      "헬스장·운동시설 접근성이 좋음",
      "서구 원도심 산복도로·병원 인접형 생활권"
    ],
    "cons": [
      "주차 여건이 넉넉하지 않은 편",
      "성수기엔 주변 소음·혼잡이 있을 수 있음"
    ],
    "similarEnv": "서구 일대의 전형적인 \"원도심 산복도로·병원 인접형\" 생활 리듬을 따릅니다.",
    "households": 8,
    "competitionRate": 2.3,
    "competitionDate": "2025-08"
  },
  {
    "id": "r37",
    "name": "거보빌",
    "district": "기장군",
    "type": "purchase",
    "eligibility": [
      "senior"
    ],
    "depositMin": 296,
    "depositMax": 296,
    "areaMin": 16.5,
    "areaMax": 26.0,
    "status": "open",
    "builtYear": 2022,
    "lat": 35.247936,
    "lng": 129.228264,
    "imageHue": 212,
    "lifestyleTags": [
      "nature",
      "leisure",
      "startup"
    ],
    "summary": "기장군 일광 해변 신도시 워케이션형",
    "infra": {
      "cafe": 86,
      "gym": 54,
      "culture": 65,
      "mart": 56,
      "transit": 55,
      "nature": 99,
      "convenience": 62,
      "hospital": 63,
      "market": 53,
      "childcare": 75,
      "bank": 54,
      "parking": 34
    },
    "nearby": [
      {
        "name": "체육공원",
        "dist": "143m",
        "kind": "nature"
      },
      {
        "name": "로컬 베이커리카페",
        "dist": "410m",
        "kind": "cafe"
      },
      {
        "name": "유치원",
        "dist": "494m",
        "kind": "childcare"
      },
      {
        "name": "주민센터 문화강좌실",
        "dist": "703m",
        "kind": "culture"
      },
      {
        "name": "동네약국",
        "dist": "1.1km",
        "kind": "hospital"
      }
    ],
    "highlights": [
      "기장군 생활권",
      "nature·leisure·startup 인프라",
      "10세대 규모"
    ],
    "commuteMinutes": {
      "centum": 39,
      "seomyeon": 52,
      "haeundae": 37,
      "nampo": 66,
      "pnu": 41
    },
    "pros": [
      "공원·산책로 등 자연 접근성이 좋음",
      "카페·베이커리 밀집도가 높아 일상 동선이 편함",
      "기장군 일광 해변 신도시 워케이션형 생활권"
    ],
    "cons": [
      "경사·계단이 있어 이동에 다소 불편할 수 있음",
      "평일 야간 유동인구가 적은 편"
    ],
    "similarEnv": "기장군 일대의 전형적인 \"일광 해변 신도시 워케이션형\" 생활 리듬을 따릅니다.",
    "households": 10
  },
  {
    "id": "r38",
    "name": "경성스마트더블유아파트",
    "district": "사하구",
    "type": "purchase",
    "eligibility": [
      "senior"
    ],
    "depositMin": 497,
    "depositMax": 497,
    "areaMin": 16.5,
    "areaMax": 26.0,
    "status": "open",
    "builtYear": 2022,
    "lat": 35.101456,
    "lng": 128.977244,
    "imageHue": 140,
    "lifestyleTags": [
      "shopping",
      "nature"
    ],
    "summary": "사하구 낙동강·하단 생활형",
    "infra": {
      "cafe": 64,
      "gym": 49,
      "culture": 43,
      "mart": 81,
      "transit": 64,
      "nature": 64,
      "convenience": 74,
      "hospital": 70,
      "market": 70,
      "childcare": 71,
      "bank": 71,
      "parking": 31
    },
    "nearby": [
      {
        "name": "편의점",
        "dist": "416m",
        "kind": "mart"
      },
      {
        "name": "올리브영",
        "dist": "496m",
        "kind": "convenience"
      },
      {
        "name": "육아종합지원센터",
        "dist": "590m",
        "kind": "childcare"
      },
      {
        "name": "새마을금고",
        "dist": "834m",
        "kind": "bank"
      },
      {
        "name": "내과·이비인후과 밀집 상가",
        "dist": "1.1km",
        "kind": "hospital"
      }
    ],
    "highlights": [
      "사하구 생활권",
      "shopping·nature 인프라",
      "7세대 규모"
    ],
    "commuteMinutes": {
      "centum": 47,
      "seomyeon": 32,
      "haeundae": 51,
      "nampo": 22,
      "pnu": 50
    },
    "pros": [
      "장보기·생활편의 인프라가 탄탄함",
      "카페·베이커리 밀집도가 높아 일상 동선이 편함",
      "사하구 낙동강·하단 생활형 생활권"
    ],
    "cons": [
      "대형 쇼핑시설까지는 다소 거리가 있음"
    ],
    "similarEnv": "사하구 일대의 전형적인 \"낙동강·하단 생활형\" 생활 리듬을 따릅니다.",
    "households": 7,
    "competitionRate": 2.5,
    "competitionDate": "2026-04"
  },
  {
    "id": "r39",
    "name": "해동파크빌리지",
    "district": "사상구",
    "type": "purchase",
    "eligibility": [
      "newlywed"
    ],
    "depositMin": 723,
    "depositMax": 723,
    "areaMin": 22.0,
    "areaMax": 33.0,
    "status": "open",
    "builtYear": 2020,
    "lat": 35.161508,
    "lng": 128.993672,
    "imageHue": 140,
    "lifestyleTags": [
      "startup",
      "transit",
      "shopping"
    ],
    "summary": "사상구 사상역 환승·산업단지형",
    "infra": {
      "cafe": 84,
      "gym": 75,
      "culture": 45,
      "mart": 83,
      "transit": 85,
      "nature": 55,
      "convenience": 88,
      "hospital": 86,
      "market": 82,
      "childcare": 65,
      "bank": 86,
      "parking": 19
    },
    "nearby": [
      {
        "name": "다이소",
        "dist": "216m",
        "kind": "convenience"
      },
      {
        "name": "치과의원",
        "dist": "473m",
        "kind": "hospital"
      },
      {
        "name": "ATM 코너",
        "dist": "517m",
        "kind": "bank"
      },
      {
        "name": "지하철역",
        "dist": "765m",
        "kind": "transit"
      },
      {
        "name": "프랜차이즈 커피전문점",
        "dist": "1.1km",
        "kind": "cafe"
      }
    ],
    "highlights": [
      "사상구 생활권",
      "startup·transit·shopping 인프라",
      "4세대 규모"
    ],
    "commuteMinutes": {
      "centum": 39,
      "seomyeon": 24,
      "haeundae": 45,
      "nampo": 28,
      "pnu": 36
    },
    "pros": [
      "버스·지하철 환승이 편리함",
      "카페·베이커리 밀집도가 높아 일상 동선이 편함",
      "사상구 사상역 환승·산업단지형 생활권"
    ],
    "cons": [
      "대형 쇼핑시설까지는 다소 거리가 있음"
    ],
    "similarEnv": "사상구 일대의 전형적인 \"사상역 환승·산업단지형\" 생활 리듬을 따릅니다.",
    "households": 4
  },
  {
    "id": "r40",
    "name": "해동파크빌리지 A동",
    "district": "사상구",
    "type": "purchase",
    "eligibility": [
      "senior"
    ],
    "depositMin": 1016,
    "depositMax": 1016,
    "areaMin": 22.0,
    "areaMax": 33.0,
    "status": "open",
    "builtYear": 2013,
    "lat": 35.15264,
    "lng": 128.989088,
    "imageHue": 206,
    "lifestyleTags": [
      "startup",
      "transit",
      "shopping"
    ],
    "summary": "사상구 사상역 환승·산업단지형",
    "infra": {
      "cafe": 77,
      "gym": 66,
      "culture": 49,
      "mart": 82,
      "transit": 99,
      "nature": 43,
      "convenience": 79,
      "hospital": 92,
      "market": 85,
      "childcare": 73,
      "bank": 89,
      "parking": 27
    },
    "nearby": [
      {
        "name": "지하철역",
        "dist": "358m",
        "kind": "transit"
      },
      {
        "name": "동네약국",
        "dist": "521m",
        "kind": "hospital"
      },
      {
        "name": "ATM 코너",
        "dist": "649m",
        "kind": "bank"
      },
      {
        "name": "재래시장 골목",
        "dist": "705m",
        "kind": "market"
      },
      {
        "name": "동네 마트",
        "dist": "1.1km",
        "kind": "mart"
      }
    ],
    "highlights": [
      "사상구 생활권",
      "startup·transit·shopping 인프라",
      "8세대 규모"
    ],
    "commuteMinutes": {
      "centum": 40,
      "seomyeon": 25,
      "haeundae": 46,
      "nampo": 27,
      "pnu": 38
    },
    "pros": [
      "버스·지하철 환승이 편리함",
      "장보기·생활편의 인프라가 탄탄함",
      "사상구 사상역 환승·산업단지형 생활권"
    ],
    "cons": [
      "초행길엔 골목이 헷갈릴 수 있음"
    ],
    "similarEnv": "사상구 일대의 전형적인 \"사상역 환승·산업단지형\" 생활 리듬을 따릅니다.",
    "households": 8,
    "competitionRate": 1.5,
    "competitionDate": "2026-03"
  },
  {
    "id": "r41",
    "name": "범일역삼정그린코아더시티",
    "district": "동구",
    "type": "purchase",
    "eligibility": [
      "senior"
    ],
    "depositMin": 100,
    "depositMax": 100,
    "areaMin": 16.5,
    "areaMax": 26.0,
    "status": "open",
    "builtYear": 2022,
    "lat": 35.13068,
    "lng": 129.042708,
    "imageHue": 196,
    "lifestyleTags": [
      "transit",
      "shopping"
    ],
    "summary": "동구 부산역·환승 중심형",
    "infra": {
      "cafe": 54,
      "gym": 57,
      "culture": 43,
      "mart": 52,
      "transit": 91,
      "nature": 33,
      "convenience": 53,
      "hospital": 73,
      "market": 73,
      "childcare": 51,
      "bank": 70,
      "parking": 27
    },
    "nearby": [
      {
        "name": "지하철역",
        "dist": "297m",
        "kind": "transit"
      },
      {
        "name": "동네약국",
        "dist": "455m",
        "kind": "hospital"
      },
      {
        "name": "전통시장",
        "dist": "492m",
        "kind": "market"
      },
      {
        "name": "ATM 코너",
        "dist": "762m",
        "kind": "bank"
      },
      {
        "name": "헬스클럽",
        "dist": "963m",
        "kind": "gym"
      }
    ],
    "highlights": [
      "동구 생활권",
      "transit·shopping 인프라",
      "13세대 규모"
    ],
    "commuteMinutes": {
      "centum": 31,
      "seomyeon": 18,
      "haeundae": 36,
      "nampo": 19,
      "pnu": 37
    },
    "pros": [
      "버스·지하철 환승이 편리함",
      "헬스장·운동시설 접근성이 좋음",
      "동구 부산역·환승 중심형 생활권"
    ],
    "cons": [
      "평일 야간 유동인구가 적은 편",
      "주차 여건이 넉넉하지 않은 편"
    ],
    "similarEnv": "동구 일대의 전형적인 \"부산역·환승 중심형\" 생활 리듬을 따릅니다.",
    "households": 13
  },
  {
    "id": "r42",
    "name": "당감삼성주택",
    "district": "부산진구",
    "type": "purchase",
    "eligibility": [
      "youth",
      "newlywed"
    ],
    "depositMin": 359,
    "depositMax": 359,
    "areaMin": 16.5,
    "areaMax": 26.0,
    "status": "soon",
    "builtYear": 2020,
    "lat": 35.163232,
    "lng": 129.060452,
    "imageHue": 158,
    "lifestyleTags": [
      "shopping",
      "startup",
      "transit"
    ],
    "summary": "부산진구 서면 중심 번화가형",
    "infra": {
      "cafe": 87,
      "gym": 80,
      "culture": 74,
      "mart": 80,
      "transit": 93,
      "nature": 32,
      "convenience": 91,
      "hospital": 84,
      "market": 83,
      "childcare": 69,
      "bank": 90,
      "parking": 39
    },
    "nearby": [
      {
        "name": "지하철역",
        "dist": "192m",
        "kind": "transit"
      },
      {
        "name": "올리브영",
        "dist": "333m",
        "kind": "convenience"
      },
      {
        "name": "은행 지점",
        "dist": "616m",
        "kind": "bank"
      },
      {
        "name": "프랜차이즈 커피전문점",
        "dist": "989m",
        "kind": "cafe"
      },
      {
        "name": "치과의원",
        "dist": "931m",
        "kind": "hospital"
      }
    ],
    "highlights": [
      "부산진구 생활권",
      "shopping·startup·transit 인프라",
      "1세대 규모"
    ],
    "commuteMinutes": {
      "centum": 25,
      "seomyeon": 11,
      "haeundae": 31,
      "nampo": 28,
      "pnu": 28
    },
    "pros": [
      "버스·지하철 환승이 편리함",
      "카페·베이커리 밀집도가 높아 일상 동선이 편함",
      "부산진구 서면 중심 번화가형 생활권"
    ],
    "cons": [
      "초행길엔 골목이 헷갈릴 수 있음",
      "대형 쇼핑시설까지는 다소 거리가 있음"
    ],
    "similarEnv": "부산진구 일대의 전형적인 \"서면 중심 번화가형\" 생활 리듬을 따릅니다.",
    "households": 1,
    "competitionRate": 3.1,
    "competitionDate": "2026-05"
  },
  {
    "id": "r43",
    "name": "골드캐슬",
    "district": "남구",
    "type": "purchase",
    "eligibility": [
      "senior"
    ],
    "depositMin": 340,
    "depositMax": 340,
    "areaMin": 16.5,
    "areaMax": 26.0,
    "status": "open",
    "builtYear": 2013,
    "lat": 35.143884,
    "lng": 129.101348,
    "imageHue": 168,
    "lifestyleTags": [
      "nature",
      "leisure"
    ],
    "summary": "남구 이기대·경성대 문화형",
    "infra": {
      "cafe": 63,
      "gym": 64,
      "culture": 67,
      "mart": 76,
      "transit": 71,
      "nature": 86,
      "convenience": 74,
      "hospital": 67,
      "market": 52,
      "childcare": 73,
      "bank": 68,
      "parking": 23
    },
    "nearby": [
      {
        "name": "근린공원",
        "dist": "377m",
        "kind": "nature"
      },
      {
        "name": "동네 마트",
        "dist": "525m",
        "kind": "mart"
      },
      {
        "name": "올리브영",
        "dist": "519m",
        "kind": "convenience"
      },
      {
        "name": "육아종합지원센터",
        "dist": "882m",
        "kind": "childcare"
      },
      {
        "name": "지하철역",
        "dist": "1.1km",
        "kind": "transit"
      }
    ],
    "highlights": [
      "남구 생활권",
      "nature·leisure 인프라",
      "9세대 규모"
    ],
    "commuteMinutes": {
      "centum": 19,
      "seomyeon": 20,
      "haeundae": 23,
      "nampo": 29,
      "pnu": 33
    },
    "pros": [
      "공원·산책로 등 자연 접근성이 좋음",
      "장보기·생활편의 인프라가 탄탄함",
      "남구 이기대·경성대 문화형 생활권"
    ],
    "cons": [
      "성수기엔 주변 소음·혼잡이 있을 수 있음",
      "대형 쇼핑시설까지는 다소 거리가 있음"
    ],
    "similarEnv": "남구 일대의 전형적인 \"이기대·경성대 문화형\" 생활 리듬을 따릅니다.",
    "households": 9
  },
  {
    "id": "r44",
    "name": "'20년 공공리모델링주택(남산동)",
    "district": "금정구",
    "type": "purchase",
    "eligibility": [
      "general",
      "senior"
    ],
    "depositMin": 100,
    "depositMax": 200,
    "areaMin": 22.0,
    "areaMax": 33.0,
    "status": "closed",
    "builtYear": 2023,
    "lat": 35.240072,
    "lng": 129.081176,
    "imageHue": 148,
    "lifestyleTags": [
      "culture",
      "nature"
    ],
    "summary": "금정구 부산대 캠퍼스·산책형",
    "infra": {
      "cafe": 76,
      "gym": 76,
      "culture": 79,
      "mart": 69,
      "transit": 62,
      "nature": 87,
      "convenience": 70,
      "hospital": 61,
      "market": 72,
      "childcare": 74,
      "bank": 70,
      "parking": 20
    },
    "nearby": [
      {
        "name": "근린공원",
        "dist": "274m",
        "kind": "nature"
      },
      {
        "name": "문화의집",
        "dist": "393m",
        "kind": "culture"
      },
      {
        "name": "프랜차이즈 커피전문점",
        "dist": "490m",
        "kind": "cafe"
      },
      {
        "name": "동네 체육센터",
        "dist": "890m",
        "kind": "gym"
      },
      {
        "name": "국공립어린이집",
        "dist": "1.0km",
        "kind": "childcare"
      }
    ],
    "highlights": [
      "금정구 생활권",
      "culture·nature 인프라",
      "8세대 규모"
    ],
    "commuteMinutes": {
      "centum": 31,
      "seomyeon": 32,
      "haeundae": 37,
      "nampo": 48,
      "pnu": 12
    },
    "pros": [
      "공원·산책로 등 자연 접근성이 좋음",
      "도서관·문화시설이 가까움",
      "금정구 부산대 캠퍼스·산책형 생활권"
    ],
    "cons": [
      "성수기엔 주변 소음·혼잡이 있을 수 있음",
      "초행길엔 골목이 헷갈릴 수 있음"
    ],
    "similarEnv": "금정구 일대의 전형적인 \"부산대 캠퍼스·산책형\" 생활 리듬을 따릅니다.",
    "households": 8,
    "competitionRate": 3.8,
    "competitionDate": "2026-07"
  },
  {
    "id": "r45",
    "name": "'21년 공공리모델링주택(부곡동)",
    "district": "금정구",
    "type": "purchase",
    "eligibility": [
      "general",
      "senior"
    ],
    "depositMin": 100,
    "depositMax": 200,
    "areaMin": 33.0,
    "areaMax": 45.0,
    "status": "open",
    "builtYear": 2017,
    "lat": 35.23376,
    "lng": 129.08216,
    "imageHue": 169,
    "lifestyleTags": [
      "culture",
      "nature"
    ],
    "summary": "금정구 부산대 캠퍼스·산책형",
    "infra": {
      "cafe": 67,
      "gym": 61,
      "culture": 84,
      "mart": 54,
      "transit": 66,
      "nature": 73,
      "convenience": 61,
      "hospital": 62,
      "market": 73,
      "childcare": 57,
      "bank": 63,
      "parking": 16
    },
    "nearby": [
      {
        "name": "작은도서관",
        "dist": "335m",
        "kind": "culture"
      },
      {
        "name": "체육공원",
        "dist": "370m",
        "kind": "nature"
      },
      {
        "name": "오일장터",
        "dist": "541m",
        "kind": "market"
      },
      {
        "name": "프랜차이즈 커피전문점",
        "dist": "836m",
        "kind": "cafe"
      },
      {
        "name": "마을버스 정류장",
        "dist": "1.1km",
        "kind": "transit"
      }
    ],
    "highlights": [
      "금정구 생활권",
      "culture·nature 인프라",
      "14세대 규모"
    ],
    "commuteMinutes": {
      "centum": 29,
      "seomyeon": 30,
      "haeundae": 35,
      "nampo": 46,
      "pnu": 10
    },
    "pros": [
      "도서관·문화시설이 가까움",
      "공원·산책로 등 자연 접근성이 좋음",
      "금정구 부산대 캠퍼스·산책형 생활권"
    ],
    "cons": [
      "초행길엔 골목이 헷갈릴 수 있음",
      "경사·계단이 있어 이동에 다소 불편할 수 있음"
    ],
    "similarEnv": "금정구 일대의 전형적인 \"부산대 캠퍼스·산책형\" 생활 리듬을 따릅니다.",
    "households": 14
  },
  {
    "id": "r46",
    "name": "골든빌 A동",
    "district": "해운대구",
    "type": "purchase",
    "eligibility": [
      "general",
      "senior"
    ],
    "depositMin": 444,
    "depositMax": 444,
    "areaMin": 22.0,
    "areaMax": 33.0,
    "status": "open",
    "builtYear": 2017,
    "lat": 35.154552,
    "lng": 129.157384,
    "imageHue": 172,
    "lifestyleTags": [
      "leisure",
      "shopping",
      "culture"
    ],
    "summary": "해운대구 해변·관광 인프라 최상급형",
    "infra": {
      "cafe": 91,
      "gym": 85,
      "culture": 72,
      "mart": 83,
      "transit": 66,
      "nature": 81,
      "convenience": 92,
      "hospital": 80,
      "market": 45,
      "childcare": 81,
      "bank": 73,
      "parking": 20
    },
    "nearby": [
      {
        "name": "편의점 밀집구간",
        "dist": "183m",
        "kind": "convenience"
      },
      {
        "name": "동네 카페거리",
        "dist": "523m",
        "kind": "cafe"
      },
      {
        "name": "헬스클럽",
        "dist": "727m",
        "kind": "gym"
      },
      {
        "name": "동네 마트",
        "dist": "756m",
        "kind": "mart"
      },
      {
        "name": "체육공원",
        "dist": "1.0km",
        "kind": "nature"
      }
    ],
    "highlights": [
      "해운대구 생활권",
      "leisure·shopping·culture 인프라",
      "15세대 규모"
    ],
    "commuteMinutes": {
      "centum": 17,
      "seomyeon": 31,
      "haeundae": 11,
      "nampo": 40,
      "pnu": 36
    },
    "pros": [
      "카페·베이커리 밀집도가 높아 일상 동선이 편함",
      "헬스장·운동시설 접근성이 좋음",
      "해운대구 해변·관광 인프라 최상급형 생활권"
    ],
    "cons": [
      "경사·계단이 있어 이동에 다소 불편할 수 있음",
      "대형 쇼핑시설까지는 다소 거리가 있음"
    ],
    "similarEnv": "해운대구 일대의 전형적인 \"해변·관광 인프라 최상급형\" 생활 리듬을 따릅니다.",
    "households": 15,
    "competitionRate": 6.9,
    "competitionDate": "2026-02"
  },
  {
    "id": "r47",
    "name": "광안지음",
    "district": "수영구",
    "type": "purchase",
    "eligibility": [
      "general"
    ],
    "depositMin": 4553,
    "depositMax": 4553,
    "areaMin": 22.0,
    "areaMax": 33.0,
    "status": "open",
    "builtYear": 2017,
    "lat": 35.136624,
    "lng": 129.11696,
    "imageHue": 228,
    "lifestyleTags": [
      "leisure",
      "culture",
      "nature"
    ],
    "summary": "수영구 광안리·민락 카페거리형",
    "infra": {
      "cafe": 87,
      "gym": 79,
      "culture": 96,
      "mart": 62,
      "transit": 73,
      "nature": 93,
      "convenience": 71,
      "hospital": 69,
      "market": 52,
      "childcare": 68,
      "bank": 72,
      "parking": 15
    },
    "nearby": [
      {
        "name": "문화의집",
        "dist": "360m",
        "kind": "culture"
      },
      {
        "name": "근린공원",
        "dist": "294m",
        "kind": "nature"
      },
      {
        "name": "동네 카페거리",
        "dist": "475m",
        "kind": "cafe"
      },
      {
        "name": "필라테스 스튜디오",
        "dist": "902m",
        "kind": "gym"
      },
      {
        "name": "마을버스 정류장",
        "dist": "1.1km",
        "kind": "transit"
      }
    ],
    "highlights": [
      "수영구 생활권",
      "leisure·culture·nature 인프라",
      "10세대 규모"
    ],
    "commuteMinutes": {
      "centum": 19,
      "seomyeon": 23,
      "haeundae": 21,
      "nampo": 30,
      "pnu": 36
    },
    "pros": [
      "도서관·문화시설이 가까움",
      "공원·산책로 등 자연 접근성이 좋음",
      "수영구 광안리·민락 카페거리형 생활권"
    ],
    "cons": [
      "초행길엔 골목이 헷갈릴 수 있음",
      "대형 쇼핑시설까지는 다소 거리가 있음"
    ],
    "similarEnv": "수영구 일대의 전형적인 \"광안리·민락 카페거리형\" 생활 리듬을 따릅니다.",
    "households": 10
  },
  {
    "id": "r48",
    "name": "금곡굿모닝빌 A동",
    "district": "북구",
    "type": "purchase",
    "eligibility": [
      "general",
      "senior"
    ],
    "depositMin": 605,
    "depositMax": 605,
    "areaMin": 22.0,
    "areaMax": 33.0,
    "status": "open",
    "builtYear": 2020,
    "lat": 35.208164,
    "lng": 129.002864,
    "imageHue": 180,
    "lifestyleTags": [
      "shopping",
      "nature"
    ],
    "summary": "북구 화명·구포 신도시 가족형",
    "infra": {
      "cafe": 61,
      "gym": 63,
      "culture": 41,
      "mart": 87,
      "transit": 71,
      "nature": 68,
      "convenience": 77,
      "hospital": 74,
      "market": 67,
      "childcare": 75,
      "bank": 85,
      "parking": 34
    },
    "nearby": [
      {
        "name": "편의점",
        "dist": "217m",
        "kind": "mart"
      },
      {
        "name": "은행 지점",
        "dist": "483m",
        "kind": "bank"
      },
      {
        "name": "올리브영",
        "dist": "691m",
        "kind": "convenience"
      },
      {
        "name": "국공립어린이집",
        "dist": "715m",
        "kind": "childcare"
      },
      {
        "name": "치과의원",
        "dist": "1.1km",
        "kind": "hospital"
      }
    ],
    "highlights": [
      "북구 생활권",
      "shopping·nature 인프라",
      "7세대 규모"
    ],
    "commuteMinutes": {
      "centum": 39,
      "seomyeon": 27,
      "haeundae": 45,
      "nampo": 39,
      "pnu": 28
    },
    "pros": [
      "장보기·생활편의 인프라가 탄탄함",
      "버스·지하철 환승이 편리함",
      "북구 화명·구포 신도시 가족형 생활권"
    ],
    "cons": [
      "평일 야간 유동인구가 적은 편",
      "주차 여건이 넉넉하지 않은 편"
    ],
    "similarEnv": "북구 일대의 전형적인 \"화명·구포 신도시 가족형\" 생활 리듬을 따릅니다.",
    "households": 7,
    "competitionRate": 1.2,
    "competitionDate": "2026-04"
  },
  {
    "id": "r49",
    "name": "조성아파트",
    "district": "사하구",
    "type": "purchase",
    "eligibility": [
      "youth",
      "newlywed"
    ],
    "depositMin": 429,
    "depositMax": 429,
    "areaMin": 33.0,
    "areaMax": 45.0,
    "status": "soon",
    "builtYear": 2017,
    "lat": 35.114176,
    "lng": 128.973392,
    "imageHue": 144,
    "lifestyleTags": [
      "shopping",
      "nature"
    ],
    "summary": "사하구 낙동강·하단 생활형",
    "infra": {
      "cafe": 64,
      "gym": 55,
      "culture": 57,
      "mart": 76,
      "transit": 71,
      "nature": 68,
      "convenience": 73,
      "hospital": 68,
      "market": 69,
      "childcare": 74,
      "bank": 69,
      "parking": 18
    },
    "nearby": [
      {
        "name": "동네 마트",
        "dist": "365m",
        "kind": "mart"
      },
      {
        "name": "육아종합지원센터",
        "dist": "378m",
        "kind": "childcare"
      },
      {
        "name": "다이소",
        "dist": "676m",
        "kind": "convenience"
      },
      {
        "name": "지하철역",
        "dist": "933m",
        "kind": "transit"
      },
      {
        "name": "재래시장 골목",
        "dist": "966m",
        "kind": "market"
      }
    ],
    "highlights": [
      "사하구 생활권",
      "shopping·nature 인프라",
      "1세대 규모"
    ],
    "commuteMinutes": {
      "centum": 46,
      "seomyeon": 31,
      "haeundae": 51,
      "nampo": 23,
      "pnu": 48
    },
    "pros": [
      "장보기·생활편의 인프라가 탄탄함",
      "버스·지하철 환승이 편리함",
      "사하구 낙동강·하단 생활형 생활권"
    ],
    "cons": [
      "경사·계단이 있어 이동에 다소 불편할 수 있음",
      "대형 쇼핑시설까지는 다소 거리가 있음"
    ],
    "similarEnv": "사하구 일대의 전형적인 \"낙동강·하단 생활형\" 생활 리듬을 따릅니다.",
    "households": 1
  },
  {
    "id": "r50",
    "name": "'21년 공공리모델링주택(다대동)",
    "district": "사하구",
    "type": "purchase",
    "eligibility": [
      "newlywed"
    ],
    "depositMin": 100,
    "depositMax": 200,
    "areaMin": 16.5,
    "areaMax": 26.0,
    "status": "open",
    "builtYear": 2017,
    "lat": 35.107036,
    "lng": 128.970212,
    "imageHue": 222,
    "lifestyleTags": [
      "shopping",
      "nature"
    ],
    "summary": "사하구 낙동강·하단 생활형",
    "infra": {
      "cafe": 64,
      "gym": 55,
      "culture": 42,
      "mart": 70,
      "transit": 69,
      "nature": 66,
      "convenience": 67,
      "hospital": 62,
      "market": 69,
      "childcare": 71,
      "bank": 75,
      "parking": 16
    },
    "nearby": [
      {
        "name": "새마을금고",
        "dist": "190m",
        "kind": "bank"
      },
      {
        "name": "국공립어린이집",
        "dist": "290m",
        "kind": "childcare"
      },
      {
        "name": "편의점",
        "dist": "600m",
        "kind": "mart"
      },
      {
        "name": "지하철역",
        "dist": "735m",
        "kind": "transit"
      },
      {
        "name": "전통시장",
        "dist": "1.0km",
        "kind": "market"
      }
    ],
    "highlights": [
      "사하구 생활권",
      "shopping·nature 인프라",
      "22세대 규모"
    ],
    "commuteMinutes": {
      "centum": 47,
      "seomyeon": 33,
      "haeundae": 52,
      "nampo": 23,
      "pnu": 50
    },
    "pros": [
      "장보기·생활편의 인프라가 탄탄함",
      "버스·지하철 환승이 편리함",
      "사하구 낙동강·하단 생활형 생활권"
    ],
    "cons": [
      "주차 여건이 넉넉하지 않은 편",
      "대형 쇼핑시설까지는 다소 거리가 있음"
    ],
    "similarEnv": "사하구 일대의 전형적인 \"낙동강·하단 생활형\" 생활 리듬을 따릅니다.",
    "households": 22,
    "competitionRate": 1.9,
    "competitionDate": "2026-02"
  }
]