const partTypes = [`noun`, `verb`, `adjective`];
const axios = require("axios");
const wordsKey = process.env.WORDS_KEY;
const movieKey = process.env.OMDB_KEY;
const movieList = require("../models/movielist");
var db = require("../models");
var ignoreList = require("../routes/ignoreList.js");
var numberWords;
var movieDesc1;
var movieDesc2;
const datamuse = require("datamuse");

//test movie summary
console.log(`this is my api key ${wordsKey}`);
var definedWords = 0;

const fightClub = `A depressed man (Edward Norton) suffering from insomnia meets a strange soap salesman named Tyler Durden (Brad Pitt) and soon finds himself living in his squalid house after his perfect apartment is destroyed. The two bored men form an underground club with strict rules and fight other men who are fed up with their mundane lives. Their perfect partnership frays when Marla (Helena Bonham Carter), a fellow support group crasher, attracts Tyler's attention.`;

//constructor for each word
function Word(word, key) {
	(this.word = word),
		(this.key = key),
		(this.partOfSpeech = undefined),
		(this.leftContext = undefined),
		(this.rightContext = undefined),
		(this.newWord = undefined),
		(this.flag = undefined),
		(this.punctuation = undefined),
		(this.ending = undefined);
}
module.exports = function (app) {
	app.get("/get-movies", function (req, res) {
		// console.log("here");
		const randomize = (array) => {
			const random = Math.floor(Math.random() * array.length);
			let selected = array[random];
			return selected;
		};

		// Get random movie title from the movieList array
		let movieTitle = randomize(movieList);
		console.log(movieTitle);

		axios
			.get(
				`http://www.omdbapi.com/?apikey=${movieKey}&t=${movieTitle}&plot=long`
			)
			.then((response) => {
				let plot = response.data.Plot;
				console.log(plot);
				if (plot) {
					CheckWord(plot);
				} else {
					CheckWord(fightClub);
				}
			})
			.catch(function (error) {
				console.log(error);
			});

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
				movieDesc1.push(word1);
				movieDesc2.push(word1);
				i++;
			});


      //updating object with context relating to the left and right word
			function setContext() {
				movieDesc2.forEach(object => {
					if ((object.key == 0)) {
            object.rightContext = movieDesc2[object.key+1].word;
            console.log(object.rightContext, 'set')
            // console.log(object)
					}
					if (object.key == movieDesc2.length-1) {
            object.leftContext = movieDesc2[object.key-1].word;
            // console.log(object)
					} else if (object.key > 0 && object.key < movieDesc2.length) {
            object.rightContext = movieDesc2[object.key + 1].word;
            object.leftContext = movieDesc2[object.key - 1].word;
            // console.log(object)
					}
				});
			}

			//setting a variable based on our movieDesc2 length
			numberWords = movieDesc2.length;
			// console.log(movieDesc2)
			//removing punctuation from movieDesc2
      setContext()
      
			movieDesc2.forEach((object) => {
				var newWord = object.word.replace(/[,\/#!$%\^&\*;:{}=\-_~]/g, "");
				//converting word to lower case
				object.word = newWord;
				var wordEndings = [`ing`, `ly`, `s`, `ed`, `y`];
				wordEndings.forEach((element) => {
					if (object.word.endsWith(element)) {
						object.ending = element;
					}
				});


				if (!object.word.includes("(" || ")" || `'`)) {
					//checking if the word has a definition in our db
					var x = object.word.toLowerCase();
					db.Contextual.find(
						{
							word: x,
							leftcontext: x.leftContext,
							rightcontext: x.rightcontext,
						},
						(err, res) => {
							// console.log(res);
							//if there is a definiition in the db
							console.log("at contextual search");
							console.log(res.length, "res.length");
							if (res.length < 1) {
								//check the word against our ignore list
								if (ignoreList.includes(x)) {
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
								increaseDefined(object.word);
							}
						}
					);
				} else {
					cantDefine(object);
				}
			});
		}

		// function to make the word an undefined word
		function cantDefine(object) {
			// console.log("updating undefinable word in the dictionary");
			var newPart = "not defined";
			object.partOfSpeech = newPart;
			dictionaryUpdate(object);
		}

		//function to increment defined words as this is needed to be used frequently throughout the app
		function increaseDefined(x) {
      definedWords++;
      console.log(definedWords, numberWords)
			// console.log(`words defined ${definedWords} of ${numberWords}`)
			// console.log(x)
			// console.log(definedWords, numberWords)
      if (definedWords == numberWords) {
				// console.log(`sweet all of the words are defined`)
				return prepareMadlib();
      }
		}

		//add a word to the definition db
		function dictionaryUpdate(x) {
			theUpdate = x;
			newWord = theUpdate.word.toLowerCase();
			theUpdate.word = newWord;
			db.Contextual.create(theUpdate)
				.then(function (x) {
					// console.log("We have updated the dictionary finally");
					increaseDefined(newWord);
				})
				.catch(function (err) {
          // console.log(err);
				});
    }
    
    //here redirecting with incomplete object if we pass 10 seconds
    function wait(ms){
      var start = new Date().getTime();
      var end = start;
      while(end < start + ms) {
        end = new Date().getTime();
     }
   }


		//testing datamuse as the definition api

		// // checking words against the words api
		async function checkWordsApi(object) {
			// 		// console.log(`i'm looking for a word ${object.word}`);
			// 		axios({
			// 			method: "GET",
			// 			url: `https://wordsapiv1.p.rapidapi.com/words/${object.word}/definitions`,
			// 			headers: {
			// 				"content-type": "application/octet-stream",
			// 				"x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
			// 				"x-rapidapi-key": wordsKey,
			// 				useQueryString: true,
			// 			},
			// 		})
			// 			.then((response) => {
			// 	      const res = response.data;
			// 	        if (res.definitions[0].partOfSpeech == null) {
			// 	        return cantDefine(object)
			// 	      }
			// 				if (res) {
			// 					if (
			// 						res.word &&
			// 						res.definitions[0].definition &&
			// 						res.definitions[0].partOfSpeech
			// 					) {
			// 	          // console.log(res)
			// 	          // console.log(`response length = ${res.definitions.length}`)
			// 	          var wordNoun = 0;
			// 	          var wordAdjective = 0;
			// 	          var wordVerb = 0;
			// 	          //counting the number of nouns, adjectives, and verbs in the response from the wordsAPI
			// 	          res.definitions.forEach(object => {
			// 	            partTypes.forEach(element => {
			// 	              if (object.partOfSpeech == element) {
			// 	                if (element == 'noun') {
			// 	                  wordNoun++
			// 	                }
			// 	                if (element == 'verb'){
			// 	                  wordVerb++
			// 	                }
			// 	                if (element == 'adjective'){
			// 	                  wordAdjective++
			// 	                }
			// 	              }
			// 	            });
			// 	          });
			// 	          var newPart = res.definitions[0].partOfSpeech;

			// 	          if (wordNoun > wordVerb && wordNoun > wordAdjective) {
			// 	            newPart = 'noun'
			// 	          }
			// 	          else if (wordVerb > wordNoun && wordVerb > wordAdjective) {
			// 	            newPart = 'verb'
			// 	          }
			// 	          else if (wordAdjective > wordNoun && wordAdjective > wordVerb){
			// 	            newPart = 'adjective'
			// 	          }
			// 	          else {
			// 	            newPart = 'undefined'
			// 	          }
			// 	          object.partOfSpeech = newPart;
			// 	          // console.log(`we have nouns ${wordNoun}, verbs ${wordVerb}, and adjectives ${wordAdjective}. we're going to go with this: ${object.partOfSpeech}`)
			// 						dictionaryUpdate(object);
			// 	          // return console.log('sent word with API response to be updated');
			// 					}
			// 	      }
			// 			})
			// 			.catch((error) => {
			// 	      cantDefine(object);

			// 				// return console.log(`${object.word} could not be defined`);
			// 			});
			//   }

			//this is the datamuse testing ---- it works, but doest respond quick enough... comment in if you'd like to try
			if (object.leftContext && object.rightContext) {
				var queryString = `words?sp=${object.word}&md=p&lc=${object.leftContext}&rc=${object.rightContext}`;
			} else if (object.leftContext && !object.rightContext) {
				var queryString = `words?sp=${object.word}&md=p&lc=${object.leftContext}`;
			} else if (object.rightContext && !object.leftContext) {
				var queryString = `words?sp=${object.word}&md=p&rc=${object.rightContext}`;
			}
      
      console.log(queryString)

			datamuse
				.request(queryString)
				.then((json) => {
					var res = json;
          console.log(res[0])
          console.log(queryString)
          var tags = res[0].tags
          if (res.length == 0) {
            cantDefine(object)
          }
					if (
						res[0].word !== undefined &&
						res[0].word == object.word &&
						res[0].tags !== undefined
					) {
						// console.log(res[0].word);
						if (res[0].tags) {
              tags.forEach(element => {
                
                if (element === "n") {
                  console.log("noun " + res[0].word);
                  return newPart = "noun";
                }
                if (element === "v") {
                  console.log("verb " + res[0].word);
                  return newPart = "verb";
                }
							if (element === "adj") {
                console.log("adj " + res[0].word);
								return newPart = "adjective";
							}
							if (element === "adv") {
                console.log("adv" + res[0].word);
								return newPart = "adverb";
                } else {
                  return newPart = "undefined";
                }
              });
              
                object.partOfSpeech = newPart;

							dictionaryUpdate(object);
							// return console.log('sent word with API response to be updated');
            }
          else if (!res[0].tags) {
            console.log("something")
            cantDefine(object)
          } 
					} else {
						newPart = "undefined";
						object.partOfSpeech = newPart;
						dictionaryUpdate(object);
					}
				})
				.catch((error) => {
          console.log(error);
					cantDefine(object);
				});
		}

		//analasys of the object to start modifying it to flag nouns, verbs, and adjectives
		function prepareMadlib() {
			movieDesc2.forEach((object) => {
				movieDesc1.forEach((o, i) => {
					if (object.key == o.key) {
						o.word = originalString[i];
						o.partOfSpeech = object.partOfSpeech;
						var punctuation = [`'`, `...`, `,`, `(`, `)`, `:`, `;`];
						punctuation.forEach((element) => {
							if (o.word.endsWith(element)) {
								o.punctuation = element;
							}
						});
						// console.log(o.word);
					}
				});
			});

			var countVerbs = Math.ceil(
				movieDesc2.filter((obj) => obj.partOfSpeech === "verb").length * 0.33
			);
			var countNouns = Math.ceil(
				movieDesc2.filter((obj) => obj.partOfSpeech === "noun").length * 0.33
			);
			var countAdjectives = Math.ceil(
				movieDesc2.filter((obj) => obj.partOfSpeech === "adjective").length *
					0.33
			);
			if (countVerbs > 2) {
				countVerbs = 2;
			}
			if (countAdjectives > 2) {
				countAdjectives = 2;
			}
			if (countNouns > 2) {
				countNouns = 2;
			}
			movieDesc1.forEach((object) => {
				var selected =
					movieDesc1[Math.floor(Math.random() * movieDesc1.length)];
				// console.log(selected)
				if (countVerbs > 0 && selected.partOfSpeech == "verb") {
					selected.flag = true;
					countVerbs--;
				}
				if (countNouns > 0 && selected.partOfSpeech == "noun") {
					selected.flag = true;
					countNouns--;
				}
				if (countAdjectives > 0 && selected.partOfSpeech == "adjective") {
					selected.flag = true;
					countAdjectives--;
				}
			});
			if (countAdjectives == 0 && countNouns == 0 && countVerbs == 0) {
				//finally sending to the front end
				console.log(movieDesc1);
				return res.send(movieDesc1);
			}
		}
	});
};
