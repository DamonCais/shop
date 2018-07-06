import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: 'session',
    method: 'post',
    data: {
      login: username,
      password,
      clientType: 'mallmp.guzzu.cn'
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
    url: 'session',
    method: 'delete'
  })
}
