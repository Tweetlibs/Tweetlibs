<div align="center"><h1>Movie Libs</h1></div>
MovieLibs is a fun application for creating and Madlibs made from movie descriptions. Once created these can be shared to the main MovieLibs page, or discarded.

## Table of Contents

[**Use**](#use)

[**How it Works**](#How-it-works)

[**Front End Technologies**](#Front-End-Technologies)

[**Back End Technologies**](#Back-End-Technologies)

[**Authors**](#Authors)

## Use ##
To create a MovieLib users can select "Create MovieLib" at the top of the page. If the user is not logged in they will be asked to create a login and then log in. After logging in the user will be given the opportunity to create a MovieLib and will be asked for nouns, adjectives, and verbs to complete the lib.

MovieLibs analyzes the language in a movie description using custom code to identify nouns, verbs, and adjectives working with WordsAPI. It then flags a small portion of those words for replacement. - Since the english language is more of an art than a science some of these libs end up being amazing or amazingly aweful. 

Users can choose to either save or discard their MovieLib.

## How it works ##
Movielibs selects a random movie and receives the movie description from OMDB. Once the movie description is retrieved MovieLibs attempts to identify each words part of speech using WordsApI. These results are cached to a MongoDB table to reduce calls through the WordsAPI - if MovieLibs runs into a word that it has already seen before it retrieves a response from the database instead of using the WordsAPI. Once the words have their definitions random Nouns, Vowels, and Adjectives are selected for replacement.

After word selection takes place the movie description is sent to the React front end where the words identified for replacement are shown as input fields with labels identifying the type of word the user should input. The rest of the description is hidden from the user - once the user enters their words and submits they have the option to save their MovieLib to share on the main page of the MovieLibs site. These are stored in a database of "libbed" descriptions.


## Front End Technologies ##
Movie Libs is powered by React.

## Back End Technologies ##
Node
bCrypt
Passport
MongoDB
WordsApi
OMDB API


## Authors ##

Login is handled by bCrypt and Passport.

Database is handled by MongoDb

Front end design is done in REACT, and back end is using a node express server.

This project is a collaboration between Bradley Wilson, Brooke Wedeward, Eric Kartali, and Tyler Blakeman.