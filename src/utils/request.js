import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import router from '../router'

import store from '../store'
import { getToken } from '@/utils/auth'
import guzzuLogin from '@/components/GuzzuLogin/function.js'
// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  baseURL: 'http://localhost:8081',
  timeout: 15000 // 请求超时时间

})

// request拦截器
service.interceptors.request.use(config => {
  console.log(store.getters.token)
  if (store.getters.token) {
    config.headers['Access-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  // config.headers['X-Guzzu-Access-Token'] = '5757gh76'
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    console.log(response)
    return response
  },
  error => {
    console.log(error.response)
    if (error.response.status === 401) {
      MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload()
        })
      })
      return Promise.reject(error)
    } else {
      return Promise.reject(error)
    }
  }
)

export default service
