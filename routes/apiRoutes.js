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
        //users_id = user._id
        console.log(user)
        var results = {
          id: user._id,
          loggedIn: true,
        }
        res.json(results);
      }
    })(req, res, next);
  });

  // logout handle
  app.get("/logout", function(req, res) {
    req.session.destroy(function(err) {
      console.log("logout error", err);
    });
  });


  app.post("/new-words", (req, res) => {
    const { data } = req.body;
    var users_id = req.body.id
    // console.log(`data: ${data}`)
       console.log('yoooo', req.body.id)
       

    let newPlot = [];
    req.body.data.map((newPlotString) => {
      if (newPlotString.flag === true) {
        if(newPlotString.newWord == undefined){
          newPlotString.newWord = "blank"
        }
        if (newPlotString.newWord == "()"){
          newPlotString.newWord = "(blank)"
          
        }
        newPlotString.newWord = "(" + newPlotString.newWord + ")"
        newPlot.push(newPlotString.newWord)
      } else {
        newPlot.push(newPlotString.word)
      }
    });
    console.log(newPlot)
    //console.log(newPlot.toString().replace(/,/g, ' '))
    var newPlot1 = newPlot.toString();
    const newPlot2 = newPlot1.
    replace(/,/g, ' ');
    res.send(newPlot2)
    // console.log(`new plot: ${newPlot2}`);
    const plot = {user_id: users_id, libbedWords: req.body.data}

    db.Libbed.create(plot).then((dataObj) => {
      console.log("this is data");
      console.log(dataObj);
    }).catch(function(error){
      console.log(error)
    })
    
  });
  //link user to libbed database

};