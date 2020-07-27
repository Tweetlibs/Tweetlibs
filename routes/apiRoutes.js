//requiring models
var db = require("../models");
var bcrypt = require("bcryptjs");
var passport = require("passport")
const axios = require('axios');
const madLibber = require('madLibber')
const movieKey = process.env.REACT_APP_OMDB_KEY;

module.exports = function (app) {
//handle register
  app.post("/register", (req, res) => {
      const errors = []
      const {firstName, lastName, email, password1, password2} = req.body;

      if (!firstName || !lastName || !email || !password1|| !password2) {
        errors.push({ msg: "Please fill in all fields" });
      }
    
      if (password1 !== password2) {
        errors.push({ msg: "Passwords do not match" });
      }
    
      if (password1.length < 6) {
        errors.push({ msg: "Password should be at least 6 characters" });
      }

      if (errors.length > 0){
        res.json({errors: errors})
      }else{
          db.Users.findOne({ email: email} )
          .then(function(user){
            if (user){
                res.json({msg: 'Email is already registered'})
            }else{
                const newUser = {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password2
                }
                bcrypt.genSalt(10, function(err, salt){
                    bcrypt.hash(newUser.password, salt, function(err, hash){
                        if (err) throw err;

                        newUser.password = hash

                        db.Users.create({ firstName: firstName, lastName: lastName, email: email, password: hash})

                        .then(function(){
                            console.log('new user created')
                        })
                        .catch(err => console.log(err));
                    })
                })
            }
          })
      }  
  });

  var movTit = 'super troopers'

  axios.get(`http://www.omdbapi.com/?apikey=${movieKey}=${movTit}&plot=full`)
    .then(response => {
      console.log(response.data.Plot)
    }).catch(function(error) {
      console.log(error);
    })

};

  
