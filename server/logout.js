const redis = require('redis')

const client = redis.createClient(6379, 'localhost')

module.exports = function() {
  return async function(ctx) {
    await client.set('access_token', '')
    ctx.body = { message: 'ok' }

    // const { username, password } = ctx.request.body
    // console.log(username, password)
    // if (username === 'admin' && password === '4690') {
    //   const token = Math.random().toString(36).substr(2)
    //   client.set('access_token', token)
    //   const at = await client.get('access_token')
    //   console.log(at)
    //   ctx.body = { token: token, message: 'ok' }
    // } else {
    //   ctx.throw(400, '登录失败')
    // }
  }
}
