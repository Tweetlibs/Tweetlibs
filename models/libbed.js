const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var LibbedSchema = new Schema ({
  user_id : {
    type: String,
    require: true
  },
  libbedWords: {
    type: Array,
    require: true
  }
    
})

const Libbed = mongoose.model('Libbed', LibbedSchema);

module.exports = Libbed;
