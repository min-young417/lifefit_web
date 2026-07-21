# dive

라이프핏 — 부산 공공임대 맞춤 추천 (Vue 3)

## Project setup
```
npm install
```

### 카카오 지도 API 키
1. [카카오 개발자 콘솔](https://developers.kakao.com/)에서 앱을 만들고 **JavaScript 키**를 발급받습니다.
2. 앱 설정 > 플랫폼에 `http://localhost:8080`(로컬)과 배포 도메인을 등록합니다.
3. 프로젝트 루트에 `.env` 파일을 만들고 키를 넣습니다.

```env
VUE_APP_KAKAO_MAP_KEY=여기에_JavaScript키
```

`.env.example`을 참고하세요. `.env`는 git에 올리지 않습니다.

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
