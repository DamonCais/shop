const { product } = require('./model')

module.exports = function() {
  return async function(ctx) {
    const obj = ctx.request.body
    try {
      await product.create({ product: obj.product })
      ctx.body = 'success'
    } catch (error) {
      ctx.body = 'fail'
    }
  }
}
