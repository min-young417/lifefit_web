
const ALLOWED_TYPES = ['publictraffic', 'walk']

export default async function handler(req, res) {
  const { type, ...params } = req.query

  if (!ALLOWED_TYPES.includes(type)) {
    res.status(400).json({ status: 'INVALID_TYPE', message: `type은 ${ALLOWED_TYPES.join(', ')} 중 하나여야 합니다` })
    return
  }

  const key = process.env.KAKAO_REST_API_KEY
  if (!key) {
    res.status(500).json({ status: 'MISSING_KEY', message: 'Vercel 환경변수 KAKAO_REST_API_KEY가 설정되지 않았습니다' })
    return
  }

  const qs = new URLSearchParams(params).toString()
  const url = `https://dapi.kakao.com/v2/routing/${type}?${qs}`

  try {
    const upstream = await fetch(url, { headers: { Authorization: `KakaoAK ${key}` } })
    const data = await upstream.json()
    res.status(upstream.status).json(data)
  } catch (err) {
    res.status(502).json({ status: 'UPSTREAM_ERROR', message: String(err) })
  }
}