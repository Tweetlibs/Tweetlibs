//requiring models
var db = require('../models');

module.exports = function(app) {

  app.get('/get-tweets', (req, res) => {


    res.send('hi');
  })
}