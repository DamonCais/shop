var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/damon_shop')

var mediasSchema = new mongoose.Schema({
  path: String
})

mongoose.model('media', mediasSchema, 'media')
var media = mongoose.model('media')

var productSchema = new mongoose.Schema({
  product: Array
})

mongoose.model('product', productSchema, 'porduct')
var product = mongoose.model('product')

module.exports = {
  media,
  product
}
