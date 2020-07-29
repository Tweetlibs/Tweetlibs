var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt')
var db = require("../models");

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, function (email, password, done) {
            // Match User
            console.log('email', email)
            db.Users.findOne({ email: email
            }).then(function (user) {
                if (!user) {
                    return done(null, false, { message: 'That email is not registered' });
                }

                bcrypt.compare(password, user.password, function (err, isMatch) {
                    if (err) throw err;

                    if (isMatch) {
                        return done(null, user)
                    } else {
                        return done(null, false, { message: 'Password incorrect' })
                    }
                })
            }).catch(err => console.log(err))
        })
    )
    passport.serializeUser(function (user, done) {
        done(null, user.id)
    })

    passport.deserializeUser(function (id, done) {

        db.Users.findById(id).then(function (user) {

            if (user) {

                done(null, user.get());

            } else {

                done(user.errors, null);

            }

        });

    });
}
















// module.exports = function (passport) {
//     passport.use(
//         new LocalStrategy((email, password, done) => {
//             console.log(email)
//             db.Users.findOne({ email: email }, (err,user) => {
//                 console.log('passport', user, email)
//                 if (err) throw err;
//                 if (!user) return done(null, 'no email found')
//                 bcrypt.compare(password, user.password, (err, result) => {
//                     if (err) return err;
//                     if (result === true) {
//                         return done(null, user)
//                     }else{
//                         return done(null, false)
//                     }
//                 })
//             })
//         })
//     )
    
//     passport.serializeUser((user, cb) => {
//         cb(null, user.id)
//     })

//     passport.deserializeUser((id, cb) => {
//         db.Users.findOne({ _id: id}, (err, user) => {
//             cb(err, user)
//         })
//     })
// }
