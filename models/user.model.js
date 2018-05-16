var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  img: {
    type: String
  },
  status: {
    type: Number
  },
  gender: {
    type: String
  },
  birtdate: {
    type: String
  },
  rate: {
    type: Number
  },
  spam: {
    type: Number
  },
  myteam: {
    type: [String]
  },
  modifiDate: {
    type: String
  },
  createdDate: {
    type: Date,
    require: true
  }
});

var User = mongoose.model('user', userSchema);
module.exports = User;