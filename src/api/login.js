import request from '@/utils/request'
import requestmock from '@/utils/requestmock'

export function loginByUsername(username, password) {
  const data = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: 'password',
    username: username,
    password: password,
    scope: '*'
  }
  return request({
    url: '/oauth/token',
    method: 'post',
    data
  })
}

export function logout() {
  return requestmock({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return requestmock({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

