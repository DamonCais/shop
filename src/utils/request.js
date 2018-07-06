import axios from 'axios'
// import { Message, MessageBox } from 'element-ui'
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
    let message
    if (error.response.status === 401) {
      if (error.response.data.code === 'Unauthorized' || error.response.data.code === 'InvalidArgument') {
        message = error.response.data.message
      }
      guzzuLogin({ username: store.getters.name, message })
      return Promise.resolve()
    }
    return Promise.reject(error)
  }
)

export default service
