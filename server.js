var express = require("express");
var mongoose = require("mongoose");
var session = require("express-session");
var passport = require("passport");
var flash = require("connect-flash");
require("dotenv").config()
const path = require('path')
var USER = process.env.USER;
var PASS = process.env.PASS;

//port for environment
var PORT = process.env.PORT || 3001;

//initialize express server
var app = express();

//connecting to our mongo db
// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/tweetlibs";
// mongoose.connect(MONGODB_URI);

// connecting to our mongo db
const MONGODB_URI = process.env.MONGODB_URI || `mongodb://${USER}:${PASS}@ds155727.mlab.com:55727/heroku_tx9s8ksw`;
mongoose.connect(MONGODB_URI);
if (process.env.NODE_ENV === "production") {
app.use(express.static(path.join(__dirname, '/client/build')))
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
res.sendFile(path.join(__dirname + '/client/build/index.html'))
})
}

//parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//middleware for passport
require("./config/passport")(passport);

// Express Session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
//routes
require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);
require("./routes/wordsAPIroute")(app);


//making public a static folder
app.use(express.static("public"));

//starting server
app.listen(PORT, function() {
  console.log(`Express is running on port ${PORT}`);
});