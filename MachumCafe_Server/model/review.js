var mongoose = require('mongoose')
var Schema = mongoose.Schema

var reviewSchema = new Schema({
  isKakaoImage: Boolean,
  userId: String,
  date: String,
  nickname: String,
  profileImageURL: String,
  reviewContent: String,
  rating: Number
})

module.exports = mongoose.model('review', reviewSchema)
