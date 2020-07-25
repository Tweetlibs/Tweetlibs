const mongoose = require('mongoose');
const { stringify } = require('querystring');

const Schema = mongoose.Schema;

var UsersSchema = new Schema ({
  first_name: {
    type: String,
    require: true
  },
  last_name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  user_name: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  active: {
    type: Boolean,
    require: true
  },
  of_age: {
    type: Boolean,
    require: true
  }
})