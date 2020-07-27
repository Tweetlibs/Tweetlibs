//requiring models
var db = require("../models");
const axios = require('axios');
const madLibber = require('madLibber')
const movieKey = process.env.REACT_APP_OMDB_KEY;

// var Twit = require("twit")
// const twitterKey = process.env.REACT_APP_TWITTER_APIKEY;
// const secretTwitterKey = process.env.REACT_APP_TWITTER_SECRETKEY;
// const accessToken = process.env.REACT_APP_ACCESS_TOKEN;
// const accessTokenSecret = process.env.REACT_APP_ACCESS_TOKEN_SECRET;

// var T = new Twit({
//   consumer_key: twitterKey,
//   consumer_secret: secretTwitterKey,
//   access_token: accessToken,
//   access_token_secret: accessTokenSecret,
// });

// console.log("THIS IS CONSUMER_KEY", twitterKey)
// console.log("THIS IS CONSUMER_KEY_SECRET", process.env.REACT_APP_TWITTER_APIKEY)
// console.log("THIS IS ACCESS TOKEN", process.env.REACT_APP_TWITTER_APIKEY)
// console.log("THIS IS ACCESS TOKEN SECRET", process.env.REACT_APP_TWITTER_APIKEY)

module.exports = function() {

  // T.get('search/tweets', { q: 'funny', count: 10 }, function(err, data, response) {
  //   const tweets = data.statuses
  //     // .map(tweet => `LANG: ${franc(tweet.text)} : ${tweet.text}`) //CHECK LANGUAGE
  //     .map(tweet => tweet.text)
  //     // .filter(tweet => tweet.toLowerCase().includes('elon'));
  //   console.log(tweets);
  // })

  var movTit = 'super troopers'

  axios.get(`http://www.omdbapi.com/?apikey=${movieKey}=${movTit}&plot=full`)
    .then(response => {
      console.log(response.data.Plot)
    }).catch(function(error) {
      console.log(error);
    })
};