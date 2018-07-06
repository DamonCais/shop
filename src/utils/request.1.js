import axios from 'axios'
// import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

import guzzuLogin from '@/components/GuzzuLogin/function.js'
// 创建axios实例

let baseURL = 'https://api-dev.guzzu.cn/v3/backapi/'
var __env = window.localStorage.getItem('__env')
if (!__env) {
  var __hostname = window.location.hostname
  if (__hostname === '127.0.0.1' || __hostname === 'localhost') {
    __env = 'localhost'
  } else if (__hostname.test(/.*-dev.guzzu.cn/)) {
    __env = 'develop'
  } else {
    __env = 'production'
  }
}
if (__env === 'localhost') {
  baseURL = 'https://api-dev.guzzu.cn/v3/backapi/'
} else if (__env === 'develop') {
  baseURL = 'https://api-dev.guzzu.cn/v3/backapi/'
} else if (__env === 'production') {
  baseURL = 'https://api.guzzu.cn/v3/backapi/'
}

const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  baseURL,

  timeout: 15000 // 请求超时时间

})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['X-Guzzu-Access-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
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

    // const res = response.data
    // if (res.code !== 20000) {
    //   Message({
    //     message: res.message,
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    //   // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
    //       confirmButtonText: '重新登录',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('FedLogOut').then(() => {
    //         location.reload() // 为了重新实例化vue-router对象 避免bug
    //       })
    //     })
    //   }
    //   return Promise.reject('error')
    // } else {
    //   return response.data
    // }

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
    // else if (error.response.status === 400) {
    //   message = error.response.data.message
    //   guzzuLogin({ username: store.getters.name, message })
    //   return Promise.resolve()
    // }
    return Promise.reject(error)
  }
)

export default service
