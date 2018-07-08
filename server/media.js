const { media } = require('./model')

var mediaGet = function() {
  return async function(ctx) {
    const { p } = ctx.query
    const imgs = await getMedia(p)
    const total = await getMediaCount()
    ctx.body = { imgs, total }
  }
}

function getMedia(p) {
  return new Promise((resolve, reject) => {
    media.find().skip(15 * p).limit(15).exec((err, res) => {
      if (err) {
        reject(err)
      }
      resolve(res)
    })
  })
}

function getMediaCount() {
  return new Promise((resolve, reject) => {
    media.count().exec((err, res) => {
      if (err) {
        reject(err)
      }
      resolve(res)
    })
  })
}

var mediaAdd = function() {
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

module.exports = {
  mediaAdd,
  mediaGet
}
