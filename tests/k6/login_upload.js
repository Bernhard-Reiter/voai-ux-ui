import http from 'k6/http'
import { check, sleep } from 'k6'
import { SharedArray } from 'k6/data'

export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m', target: 50 },
    { duration: '2m', target: 100 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.1'],
  },
}

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000'

export default function () {
  // Test login page load
  let loginResponse = http.get(`${BASE_URL}/login`)
  check(loginResponse, {
    'login page status is 200': (r) => r.status === 200,
    'login page contains form': (r) => r.body.includes('Mit Google anmelden'),
  })
  sleep(1)

  // Test API health check
  let apiResponse = http.get(`${BASE_URL}/api/health`)
  check(apiResponse, {
    'API health check status is 200': (r) => r.status === 200,
  })
  sleep(1)

  // Simulate OAuth redirect (note: actual OAuth flow can't be tested with k6)
  let oauthResponse = http.get(`${BASE_URL}/auth/callback?code=mock_code`)
  check(oauthResponse, {
    'OAuth callback handles redirect': (r) => r.status === 307 || r.status === 302,
  })
  sleep(2)
}
