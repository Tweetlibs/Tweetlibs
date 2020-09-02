const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var ContextualSchema = new Schema({
	word: {
		type: String,
		require: true,
  },
  leftContext: {
    type: String,
    require: false
  },
  rightContext: {
    type: String,
    require: false
  },
	partOfSpeech: {
		type: String,
		require: true,
	},
});

const Contextual = mongoose.model("Contextual", ContextualSchema);

module.exports = Contextual;