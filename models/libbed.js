const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var LibbedSchema = new Schema ({
  Libbed: 
    {
      words: {
        type: String,
        require: true
      },
    }
    
})

const Libbed = mongoose.model('Libbed', LibbedSchema);

module.exports = Libbed;
