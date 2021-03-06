const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var CreatedSchema = new Schema({
  user_id: {
    type: String,
    require: true,
  },
  tweet_id: {
    type: String,
    require: true,
  },
  new_text: {
    type: String,
    require: true,
  },
  saved: {
    type: Boolean,
    require: true,
  },
});

const Created = mongoose.model("Created", CreatedSchema);

module.export = Created;
