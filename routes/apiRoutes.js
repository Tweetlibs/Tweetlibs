//requiring models
var db = require("../models");
require('dotenv').config();
var bcrypt = require("bcrypt");
var passport = require("passport")
const axios = require('axios');
const movieList = require('../models/movielist');
let testWord = require('../WordsApi/testArray');
const movieKey = process.env.OMDB_KEY;
const wordsKey = process.env.WORDS_KEY;

// console.log(movieKey);
console.log(`test word: ${testWord}`);

module.exports = function(app) {
  //handle register
  app.post("/register", (req, res) => {
    const errors = []
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
      res.json({ errors: errors })
    } else {
      db.Users.findOne({ email: email })
        .then(function(user) {
          if (user) {
            res.json({ msg: 'Email is already registered' })
          } else {
            const newUser = {
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: password2
            }
            bcrypt.genSalt(10, function(err, salt) {
              bcrypt.hash(newUser.password, salt, function(err, hash) {
                if (err) throw err;

                newUser.password = hash

                db.Users.create({ firstName: firstName, lastName: lastName, email: email, password: hash })

                .then(function() {
                    console.log('new user created')
                  })
                  .catch(err => console.log(err));
              })
            })
          }
        })
    }
  });
  // handle login

  app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      console.log('user-info', user)
      if (err) console.log(err)
      if (!user) {
        const loggedIn = false
        console.log('User does not exist', user)
        res.json({ loggedIn })
      } else {
        req.logIn(user, err => {
          const loggedIn = true
          if (err) throw err;
          res.json({ loggedIn })
        })
      }
    })(req, res, next)
  })

  // logout handle
  app.get("/logout", function(req, res) {
    req.logout();
  });

  app.get("/get-movies", function(req, res) {
    res.send(testWord);
  });

  const randomize = (array) => {
    const random = Math.floor(Math.random() * array.length);
    let selected = array[random]
    return selected;
    // console.log(selected);
  }

  // Get random movie title from the movieList array
  const movieTitle = randomize(movieList);
  // console.log(`movie title: ${movieTitle}`);

  axios.get(`http://www.omdbapi.com/?apikey=${movieKey}&t=${movieTitle}&plot=full`)
    .then(response => {
      let plot = response.data.Plot;
      console.log(plot);
      // return plot
    }).catch(function(error) {
      console.log(error);
    })
};