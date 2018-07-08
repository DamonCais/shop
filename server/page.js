const { page } = require('./model')

var pageGet = function() {
  return async function(ctx) {
    const { p, id } = ctx.query
    console.log(id)
    const pages = await getpage(p, id)
    const total = await getpageCount()
    ctx.body = { pages, total }
  }
}

var pageDel = function() {
  return async function(ctx) {
    const { _id } = ctx.request.body
    console.log(_id)
    await delpage(_id)
    ctx.body = 'success'
  }
}
var pageUpdate = function() {
  return async function(ctx) {
    const { id, sortIndex } = ctx.request.body
    const res = await updatepage(id, sortIndex)
    ctx.body = res
  }
}

var pageAdd = function() {
  return async function(ctx) {
    const obj = ctx.request.body
    try {
      const { id } = obj
      const res = await addpage(obj.page, id)
      console.log(res)
      ctx.body = res
    } catch (error) {
      console.log(error)
      ctx.body = 'fail'
    }
  }
}

function updatepage(id, sortIndex) {
  return new Promise((resolve, reject) => {
    page.update({ _id: id }, { sortIndex }).exec((err, res) => {
      if (err) {
        reject(err)
      }
      resolve(res)
    })
  })
}

function addpage(p, id) {
  return new Promise((resolve, reject) => {
    if (id !== 'add') {
      page.update({ _id: id }, p).exec((err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    } else {
      page.create(p, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    }
  })
}

function delpage(_id) {
  return new Promise((resolve, reject) => {
    page.remove({ _id }).exec((err, res) => {
      if (err) {
        reject(err)
      }
      console.log(res)
      resolve(res)
    })
  })
}

function getpage(p, id) {
  return new Promise((resolve, reject) => {
    const whereStr = {}
    if (id) {
      whereStr._id = id
      page.find(whereStr).exec((err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    } else {
      page.find().skip(15 * p).limit(15).exec((err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    }
  })
}

function getpageCount() {
  return new Promise((resolve, reject) => {
    page.count().exec((err, res) => {
      if (err) {
        reject(err)
      }
      resolve(res)
    })
  })
}

module.exports = {
  pageGet,
  pageAdd,
  pageDel,
  pageUpdate
}
