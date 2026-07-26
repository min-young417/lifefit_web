const { defineConfig } = require('@vue/cli-service')

/**
 * 카카오 경로 REST는 CORS로 브라우저 직접 호출이 막혀 있어
 * 개발 서버에서 /kakao-api → dapi.kakao.com 프록시 + Authorization 주입.
 * 키는 .env의 VUE_APP_KAKAO_REST_API_KEY 또는 KAKAO_REST_API_KEY.
 */
function kakaoRestKey() {
  return process.env.KAKAO_REST_API_KEY || process.env.VUE_APP_KAKAO_REST_API_KEY || ''
}

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/kakao-api': {
        target: 'https://dapi.kakao.com',
        changeOrigin: true,
        pathRewrite: { '^/kakao-api': '' },
        onProxyReq(proxyReq) {
          const key = kakaoRestKey()
          if (key) {
            proxyReq.setHeader('Authorization', `KakaoAK ${key}`)
          }
        }
      }
    }
  }
})
