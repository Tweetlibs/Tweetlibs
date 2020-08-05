require("dotenv").config();
const axios = require("axios");
const wordsKey = process.env.WORDS_KEY;
var db = require("../models");
var ignoreList = require("../routes/ignoreList.js");
var numberWords;
var movieDesc1;
var movieDesc2;
//test movie summary
console.log(`this is my api key ${wordsKey}`);
var definedWords = 0;

//constructor for each word
function Word(word, key) {
	(this.word = word),
		(this.key = key),
		(this.partOfSpeech = undefined),
		(this.newWord = undefined),
		(this.flag = undefined);
}

//create the array of objects from the original word.
function CheckWord(words) {
  const movieString = words;
  definedWords = 0;
  originalString = movieString.split(" ");
	movieDesc1 = [];
  movieDesc2 = [];

	var i = 0;
	originalString.forEach((element) => {
		var word1 = new Word(element, i);
    movieDesc2.push(word1);
    movieDesc1.push(word1);
 		i++;
  });

 
  //setting a variable based on our movieDesc2 length
  numberWords = movieDesc2.length;
  //removing punctuation from movieDesc2
	movieDesc2.forEach((object) => {
		var newWord = object.word.replace(/[.,\/#!$%\^&\*;:{}=\-_~]/g, "");
		//converting word to lower case
		object.word = newWord;
		if (!object.word.includes("(" || ")" || `'`)) {
      //checking if the word has a definition in our db
      var x = object.word.toLowerCase()
			db.Defined.find({ word: x }, (err, res) => {
        // console.log(res);
        //if there is a definiition in the db
				if (res.length < 1) {
          //check the word against our ignore list
					if (ignoreList.includes(x)){
            //send the ignore list word to the cantDefine function to get updated as a word that will not be defined - this ignoreList will eventually eliminate itself
            cantDefine(object);
					} else {
            //if the word is not in the ignore list check the Words API to see if we can get a definition for that word
						checkWordsApi(object);
					}
				} else if (res.length > 0) {
          // console.log('there was a response from the db')
          // console.log(res[0].partOfSpeech)
          var newPart = res[0].partOfSpeech;
          object.partOfSpeech = newPart;
          increaseDefined()
				}
      });
    }
    else {
      cantDefine(object)
    }
  })
}

// function to make the word an undefined word
function cantDefine(object) {
	// console.log("updating undefinable word in the dictionary");
  var newPart = "not defined";
  object.partOfSpeech = newPart;
  dictionaryUpdate(object);
}

//function to increment defined words as this is needed to be used frequently throughout the app
function increaseDefined() {
  definedWords++
  // console.log(definedWords, numberWords)
  if (definedWords == numberWords){
    // console.log(`sweet all of the words are defined`)
    prepareMadlib();
  }
}

//add a word to the definition db
function dictionaryUpdate(x) {
  theUpdate = x;
  newWord = theUpdate.word.toLowerCase();
  theUpdate.word = newWord;
	db.Defined.create(theUpdate)
		.then(function (x) {
      // console.log("We have updated the dictionary finally");
      increaseDefined()
		})
		.catch(function (err) {
			// console.log(err);
		});
}

//checking words against the words api
async function checkWordsApi(object) {
	// console.log(`i'm looking for a word ${object.word}`);
	axios({
		method: "GET",
		url: `https://wordsapiv1.p.rapidapi.com/words/${object.word}/definitions`,
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
          var newPart = res.definitions[0].partOfSpeech
          object.partOfSpeech = newPart;
	        dictionaryUpdate(object);
          // return console.log('sent word with API response to be updated');
				}
			}
		})
		.catch((error) => {
      cantDefine(object)
			// return console.log(`${object.word} could not be defined`);
		});
}

//analasys of the object to start modifying it to flag nouns, verbs, and adjectives
function prepareMadlib() {
  console.log(originalString)
  movieDesc2.forEach(object => {
    movieDesc1.forEach((o, i) => {
      if (object.key == o.key) {
        o.word = originalString[i]
        o.partOfSpeech = object.partOfSpeech;
        console.log(o.word)
      }
    })
  });

  var countVerbs = Math.ceil((movieDesc2.filter((obj) => obj.partOfSpeech === "verb").length)*.33)
  var countNouns = Math.ceil((movieDesc2.filter((obj) => obj.partOfSpeech === "noun").length)*.33)
  var countAdjectives = Math.ceil((movieDesc2.filter((obj) => obj.partOfSpeech === "adjective").length)*.33);
  movieDesc1.forEach(object => {
      if (countVerbs > 0 && object.partOfSpeech == "verb") {
        object.flag = true;
        countVerbs--
      }
      if (countNouns > 0 && object.partOfSpeech == "noun") {
        object.flag = true;
        countNouns--
      }
      if (countAdjectives > 0 && object.partOfSpeech == "adjective") {
        object.flag = true;
        countAdjectives--
      }
      if (countAdjectives == 0 && countNouns == 0 && countVerbs == 0) {
        return movieDesc1;
      }
  });
}

module.exports = { CheckWord };