import Cookies from 'js-cookie'

const TokenKey = 'X-Guzzu-Token'
const NameKey = 'X-Guzzu-UserName'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token, ex) {
  const extime = new Date(ex)
  const now = new Date()
  const st = (extime - now) / (24 * 60 * 60 * 1000)
  return Cookies.set(TokenKey, token, { expires: st })
}

export function removeToken() {
  return Cookies.set(TokenKey, '')
}

export function getName() {
  return localStorage.getItem(NameKey)
}
export function setName(name) {
  return localStorage.setItem(NameKey, name)
}
export function removeName() {
  return localStorage.setItem(NameKey, '')
}

// export function getToken() {
//   return Cookies.get(TokenKey)
// }

// export function setToken(token, ex) {

//   const extime = new Date(ex)
// const now = new Date()
// const st = (extime - now) / (24 * 60 * 60 * 1000)
//   return Cookies.set(TokenKey, token, { expires: st })
// }

// export function removeToken() {
//   return Cookies.remove(TokenKey)
// }
