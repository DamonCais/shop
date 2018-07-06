const path = require('path')
const fs = require('fs')
module.exports = function() {
  return async function(ctx) {
    const file = ctx.request.body.files.files
    const element = file
    const { id, nickname } = ctx.request.body.fields
    const reader = fs.createReadStream(element.path)
    const newname = id + path.extname(element.name)
    const stream = fs.createWriteStream(path.join(__dirname, '../dist/static/', newname))
    reader.pipe(stream)
    const f = await User.update({ avater: newname }, { where: { id, nickname }})
    console.log(f)
    ctx.body = { success: true }
  }
}
