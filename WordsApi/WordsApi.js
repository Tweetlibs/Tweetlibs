require("dotenv").config({
	path: "../.env",
});
const axios = require("axios");
const apiKey = process.env.REACT_APP_WORDS_API_KEY;

//test movie summary
const fightClub =
	"A depressed man (Edward Norton) suffering from insomnia meets a strange soap salesman named Tyler Durden (Brad Pitt) and soon finds himself living in his squalid house after his perfect apartment is destroyed. The two bored men form an underground club with strict rules and fight other men who are fed up with their mundane lives. Their perfect partnership frays when Marla (Helena Bonham Carter), a fellow support group crasher, attracts Tyler's attention.";

CheckWord(fightClub);

function CheckWord(words) {
	const wordCheck = words.replace(/[.,\/#!$%\^&\*;:{}=\-_`~]/g, "");
	const noPunctuation = wordCheck.split(" ");
	noPunctuation.forEach((element) => {
		if (element.includes("(" && ")" && `'`) == false) {
			checkWordsApi(element);
		}
	});
}

async function checkWordsApi(x) {
	axios({
		method: "GET",
		url: `https://wordsapiv1.p.rapidapi.com/words/${x}/definitions`,
		headers: {
			"content-type": "application/octet-stream",
			"x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
			"x-rapidapi-key": apiKey,
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
