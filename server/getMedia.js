const path = require('path')
const fs = require('fs')

const { media } = require('./model')

module.exports = function() {
  return async function(ctx) {
    const { p } = ctx.query
    const imgs = await getMedia(p)
    const total = await getMediaCount()
    ctx.body = { imgs, total }
  }
}

function getMedia(p) {
  return new Promise((resolve, reject) => {
    media.find().skip(10 * p).limit(10).exec((err, res) => {
      resolve(res)
    })
  })
}

function getMediaCount() {
  return new Promise((resolve, reject) => {
    media.count().exec((err, res) => {
      resolve(res)
    })
  })
}
