const mongoose = require('mongoose')

const Schema = mongoose.Schema

const customerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  storeName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  isActivated: {
    type: Boolean,
    required: false,
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Customer', customerSchema)
