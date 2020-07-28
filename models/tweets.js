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

const Tweets = mongoose.model('Tweets', TweetsSchema);

module.export = Tweets;