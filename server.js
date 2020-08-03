var express = require("express");
var mongoose = require("mongoose");
var session = require("express-session");
var passport = require("passport");
var flash = require("connect-flash");
var words = require("./WordsApi/WordsApi.js");
//port for environment
var PORT = process.env.PORT || 3001;

//initialize express server
var app = express();

var fightClub = `A depressed man (Edward Norton) suffering from insomnia meets a strange soap salesman named Tyler Durden (Brad Pitt) and soon finds himself living in his squalid house after his perfect apartment is destroyed. The two bored men form an underground club with strict rules and fight other men who are fed up with their mundane lives. Their perfect partnership frays when Marla (Helena Bonham Carter), a fellow support group crasher, attracts Tyler's attention.`;

//connecting to our mongo db
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/tweetlibs";
mongoose.connect(MONGODB_URI);

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

//making public a static folder
app.use(express.static("public"));

//starting server
app.listen(PORT, function () {
  console.log(`Express is running on port ${PORT}`);
  // words.CheckWord(fightClub);
});
