var express = require('express');
var mongoose = require('mongoose');
require('dotenv').config()

//port for environment
var PORT = process.env.PORT || 5000;

//initialize express server
var app = express();

//connecting to our mongo db
// var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/tweetlibs'
// mongoose.connect(MONGODB_URI);

//route folders - uncomment to use
require('./routes/apiRoutes.js')(app);
// require('./routes/htmlRoutes.js')(app);

//parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//making public a static folder
app.use(express.static('public'));

//starting server
app.listen(PORT, function() {
  console.log(`Express is running on port ${PORT}`)
})