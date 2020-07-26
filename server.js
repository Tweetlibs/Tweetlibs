var express = require('express');
var mongoose = require('mongoose');

//port for environment
var PORT = process.env.PORT || 3001;

//initialize express server
var app = express();

//connecting to our mongo db
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/tweetlibs'
mongoose.connect(MONGODB_URI);

//parser
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//routes
require('./routes/apiRoutes.js')(app);
require('./routes/htmlRoutes.js')(app);

//making public a static folder
app.use(express.static('public'));

//starting server
app.listen(PORT, function() {
  console.log(`Express is running on port ${PORT}`)
})