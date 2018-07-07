import Cookies from 'js-cookie'

const TokenKey = 'Access-Token'
const NameKey = 'User-Name'

export function getToken() {
  // return Cookies.get(TokenKey)
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  // const extime = new Date(ex)
  // const now = new Date()
  // const st = (extime - now) / (24 * 60 * 60 * 1000)
  // return Cookies.set(TokenKey, token, { expires: st })
  // return Cookies.set(TokenKey, token)
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  // return Cookies.set(TokenKey, '')
  return localStorage.setItem(TokenKey, '')
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
