//requiring models
var db = require("../models");
require("dotenv").config();
var bcrypt = require("bcrypt");
var passport = require("passport");
const axios = require("axios");
const movieList = require("../models/movielist");
let testWord = require("../WordsApi/testArray");
const movieKey = process.env.OMDB_KEY;
const wordsKey = process.env.WORDS_KEY;
var words = require("../WordsApi/WordsApi.js");

module.exports = function(app) {
  //handle register
  app.post("/register", (req, res) => {
    const errors = [];
    const { firstName, lastName, email, password1, password2 } = req.body;

    if (!firstName || !lastName || !email || !password1 || !password2) {
      errors.push({ msg: "Please fill in all fields" });
    }

    if (password1 !== password2) {
      errors.push({ msg: "Passwords do not match" });
    }

    if (password1.length < 6) {
      errors.push({ msg: "Password should be at least 6 characters" });
    }

    if (errors.length > 0) {
      res.json({ errors: errors });
    } else {
      db.Users.findOne({ email: email }).then(function(user) {
        if (user) {
          res.json({ msg: "Email is already registered" });
        } else {
          const newUser = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password2,
          };
          bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(newUser.password, salt, function(err, hash) {
              if (err) throw err;

              newUser.password = hash;

              db.Users.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hash,
              })

              .then(function(response) {
                  res.json({ msg: "New account created. You may now log in!" });
                })
                .catch((err) => console.log(err));
            });
          });
        }
      });
    }
  });
  // handle login

  app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) console.log(err);
      if (!user) {
        const loggedIn = false;
        res.json({ loggedIn });
      } else {
        const loggedIn = true;
        res.json({ loggedIn });
      }
    })(req, res, next);
  });

  // logout handle
  app.get("/logout", function(req, res) {
    req.session.destroy(function(err) {
      console.log("logout error", err);
    });
  });

  app.get("/get-movies", function(req, res) {
    // const randomize = (array) => {
    //   const random = Math.floor(Math.random() * array.length);
    //   let selected = array[random];
    //   return selected;
    //   // console.log(selected);
    // };

    // // Get random movie title from the movieList array
    // const movieTitle = randomize(movieList);
    // // console.log(`movie title: ${movieTitle}`);

    // axios
    //   .get(`http://www.omdbapi.com/?apikey=${movieKey}&t=${movieTitle}&plot=full`)
    //   .then((response) => {
    //     let plot = response.data.Plot;
    //     console.log(plot);
    //     words.CheckWord(plot)
    //     // return plot
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    res.send(testWord);
  });

  app.post("/new-words", (req, res) => {
    const { data } = req.body;
    console.log(`data: ${data}`)
      // console.log(req.body);

    let newPlot = [];
    req.body.data.map((newPlotString) => {
      if (newPlotString.flag === true) {
        newPlot.push(newPlotString.newWord)
      } else {
        newPlot.push(newPlotString.word)
      }

    });
    var newPlot1 = newPlot.toString();
    const newPlot2 = newPlot1.
    replace(/,/g, ' ');
    console.log(`new plot: ${newPlot2}`);

    db.Libbed.create(data).then((dataObj) => {
      // console.log("this is data");
      // console.log(dataObj);
    });
  });
  //link user to libbed database


};