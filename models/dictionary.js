const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var Dictionary = new Schema({
	word: {
		type: String,
		require: true,
	},
	partOfSpeech: {
		type: String,
		require: true,
	},
});

const Defined = mongoose.model("Defined", Dictionary);

module.exports = Defined;
