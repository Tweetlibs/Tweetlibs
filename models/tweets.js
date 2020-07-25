const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var TweetsSchema = new Schema ({
  account_name: {
    type: String,
    require: true
  },
  user_name: {
    type: String,
    require: true
  },
  text: {
    type: String,
    require: true
  },
  image_url: {
    type: String,
    require: true
  }
})

const TweeetSchema = mongoose.model('TweeetSchema', TweeetSchema);

module.export = TweeetSchema;