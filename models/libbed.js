const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var LibbedSchema = new Schema ({
  Libbed: [
    {
      flag: {
        type: Boolean,
        require: true
      },
      key: {
        type: Number,
        require: true
      },
      newWord: {
        type: String,
        require: false
      },
      partOfSpeech: {
        type: String,
        require: true
      },
      word: {
        type: String,
        require: true
      },
    }
    ],
})

const Shit = mongoose.model('Libbed', LibbedSchema);

module.exports = Shit;