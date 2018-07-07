const path = require('path')
const fs = require('fs')

const { media } = require('./model')

module.exports = function() {
  return async function(ctx) {
    const files = ctx.request.files.files
    console.log(files.path)
    const p = files.path.split('\\')
    await addMedia('uploadDir/' + p[p.length - 1])
    ctx.body = { message: 'success' }
  }
}

function addMedia(path) {
  return new Promise((resolve, reject) => {
    media.create({ path }, () => {
      resolve()
    })
  })
}
