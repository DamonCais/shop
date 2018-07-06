const redis = require('redis')

const client = redis.createClient(6379, 'localhost')

module.exports = function() {
  return async function(ctx) {
    const { username, password } = ctx.request.body
    if (username === 'admin' && password === '4690') {
      const token = Math.random().toString(36).substr(2)
      client.set('access_token', token)
      ctx.body = { token: token }
    } else {
      ctx.body = { message: '登录失败' }
    }
  }
}
