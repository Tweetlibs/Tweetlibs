const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var DictionarySchema = new Schema({
  word: {
    type: String,
    require: true,
  },
  partOfSpeech: {
    type: String,
    require: true,
  }
});

const Defined = mongoose.model("Created", DictionarySchema);

module.export = Defined;
