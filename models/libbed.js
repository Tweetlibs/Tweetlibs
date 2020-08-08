const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var LibbedSchema = new Schema({
  user_id: {
    type: String,
    require: true
  },
  saved: {
    type: Boolean,
    require: true,
    default: false
  },
  time: {
    type: Date,
    default: Date.now
  },
  libbedWords: {
    type: Array,
    require: true
  }

})

const Libbed = mongoose.model('Libbed', LibbedSchema);

module.exports = Libbed;