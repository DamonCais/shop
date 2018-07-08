var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/damon_shop')

// media
var mediasSchema = new mongoose.Schema({
  path: String
})
mongoose.model('media', mediasSchema, 'media')
var media = mongoose.model('media')

// product
var productSchema = new mongoose.Schema({
  name: String,
  img: Object,
  options: Array
}, {
  timestamps: { createdAt: 'created', updatedAt: 'updated' }
})
mongoose.model('product', productSchema, 'product')
var product = mongoose.model('product')

// page
var pageSchema = new mongoose.Schema({
  pageTitle: String,
  pageDescription: String,
  sortIndex: Number,
  blocks: Array
}, {
  timestamps: { createdAt: 'created', updatedAt: 'updated' }
})
mongoose.model('page', pageSchema, 'page')
var page = mongoose.model('page')

module.exports = {
  media,
  product,
  page
}
