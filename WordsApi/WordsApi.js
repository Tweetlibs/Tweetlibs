require('dotenv').config();
const axios = require("axios");
const wordsKey = process.env.WORDS_KEY;
var db = require("../models");
var ignoreList = require('../routes/ignoreList.js')

//test movie summary
console.log(`this is my api key ${wordsKey}`)

//constructor for each word
function Word(word, key) {
  this.word = word,
  this.key = key,
  this.partOfSpeech = undefined,
  this.newWord = undefined,
  this.flag = false
}

//create the array of objects from the original word.


function CheckWord(words) {
  const movieString = words;
  var movieDesc1 = movieString.split(" ");
  var movieDesc2 = []
  // console.log(movieDesc1)
  // console.log(movieDesc2)
  var i = 0;
  movieDesc1.forEach(element => {
    var word1 = new Word (element, i)
    movieDesc2.push(word1)
    i++
    });
  movieDesc1 = movieDesc2;

  //removing punctuation from movieDesc2
  movieDesc2.forEach(object => {
    var newWord = object.word.replace(/[.,\/#!$%\^&\*;:{}=\-_~]/g, "")
    object.word = newWord;
      if (!object.word.includes("(" && ")" && `'`)) {
        if (ignoreList.includes(object.word)){
          // console.log(`suck it ${object.word}`)
          var newPart = "undefined";
          object.partOfSpeech = newPart;
          
          // console.log(object)
        }
        else {db.Defined.find({word: object.word}, (err, res) => {
          console.log(res)
          console.log(err)
        })}
      // console.log(`this is db :`, db)
      }
  });
  // console.log(movieDesc2);

    // noPunctuation.forEach((element) => {
    // 	if (element.includes("(" && ")" && `'`) == false) {
    // 		checkWordsApi(element);
    // 	}
    // });
}

//checking 

//add a word to the definition db
function dictionaryUpdate(x, y){

}

//
async function checkWordsApi(x) {
	axios({
		method: "GET",
		url: `https://wordsapiv1.p.rapidapi.com/words/${x}/definitions`,
		headers: {
			"content-type": "application/octet-stream",
			"x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
			"x-rapidapi-key": wordsKey,
			useQueryString: true,
		},
	})
		.then((response) => {
			const res = response.data;
			if (res) {
				if (
					res.word &&
					res.definitions[0].definition &&
					res.definitions[0].partOfSpeech
				) {
					const elementofspeech = {
						word: res.word,
						partOfSpeech: res.definitions[0].partOfSpeech,
					};
					return console.log(elementofspeech);
				}
			}
		})
		.catch((error) => {
			return console.log(`${x} could not be defined`);
		});
}






module.exports = { CheckWord }