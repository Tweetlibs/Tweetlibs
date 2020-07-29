var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt')
var db = require("../models");

module.exports = function(passport) {
  passport.use(new LocalStrategy(
    function(email, password, done) {
      db.Users.findOne({ email: email }, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));
}