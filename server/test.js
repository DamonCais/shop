var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/damon_shop')

var mediasSchema = new mongoose.Schema({
  path: String
})
mongoose.model('medias', mediasSchema)
var medias = mongoose.model('medias')
mongoose.model('media', mediasSchema)
var media = mongoose.model('media');

(async() => {
  media.find({}, (err, res) => {
    console.log(res)
  })
})()
