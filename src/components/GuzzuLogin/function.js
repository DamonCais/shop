import Component from './func-login'
import Vue from 'vue'
import store from '@/store'

const login = Vue.extend(Component)

const guzzuLogin = (options) => {
  const instance = new login({
    propsData: options
  })
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.vm.$store = store
  instance.vm.$on('closed', () => {
    document.body.removeChild(instance.vm.$el)
    location.reload()
    // instance.vm.destory()
  })
  instance.vm.$on('close', () => {
    document.body.removeChild(instance.vm.$el)
    // instance.vm.destory()
  })
  return instance.vm
}

export default guzzuLogin
