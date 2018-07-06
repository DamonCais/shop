import login from './login.vue'
import guzzuLogin from './function'
export default (Vue) => {
  Vue.component(login.name, login)
  Vue.prototype.$guzzuLogin = guzzuLogin
}
