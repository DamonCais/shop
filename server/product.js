const { product } = require('./model')

var productGet = function() {
  return async function(ctx) {
    const { p, id } = ctx.query
    console.log(id)
    const products = await getProduct(p, id)
    const total = await getProductCount()
    ctx.body = { products, total }
  }
}

var productDel = function() {
  return async function(ctx) {
    const { _id } = ctx.request.body
    console.log(_id)
    await delProduct(_id)
    ctx.body = 'success'
  }
}

var productAdd = function() {
  return async function(ctx) {
    const obj = ctx.request.body
    try {
      const { name, img, options } = obj.product
      const { id } = obj
      console.log(id)
      if (id !== 'add') {
        await product.update({ _id: id }, { name, img, options })
      } else {
        const obj = await product.create({ name, img, options })
        console.log(obj)
      }
      ctx.body = 'success'
    } catch (error) {
      ctx.body = 'fail'
    }
  }
}

function delProduct(_id) {
  return new Promise((resolve, reject) => {
    product.remove({ _id }).exec((err, res) => {
      if (err) {
        reject(err)
      }
      console.log(res)
      resolve(res)
    })
  })
}

function getProduct(p, id) {
  return new Promise((resolve, reject) => {
    const whereStr = {}
    if (id) {
      whereStr._id = id
      product.find(whereStr).exec((err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    } else {
      product.find().skip(15 * p).limit(15).exec((err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    }
  })
}

function getProductCount() {
  return new Promise((resolve, reject) => {
    product.count().exec((err, res) => {
      if (err) {
        reject(err)
      }
      resolve(res)
    })
  })
}

module.exports = {
  productGet,
  productAdd,
  productDel
}
