const mongoose = require('mongoose')

const InsectSchema = new mongoose.Schema({
  commonName: {
    type: String,
    required: true,
  },
  sciName: {
    type: String,
    required: true,
  },
  order: {
    type: String,
    required: true,
  },
  lifeSpan: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imgName: {
    type: String,
    required: true,
  },
  imgPath: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('InsectDB', InsectSchema)