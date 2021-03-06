import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: 'login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: 'me',
    method: 'get'
    // params: { token }
  })
}

export function logout() {
  return request({
    url: 'logout',
    method: 'post'
  })
}
