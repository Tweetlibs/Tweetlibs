import React, { Component } from 'react';
import Libs from '../libs/Libs'
import LoginBar from '../LoginBar'
import axios from 'axios';

class Main extends Component {

    state = {
        userLibbed: []
    }

    componentDidMount() {
        axios.get("/get-all").then((response) => {
            console.log(response.data)
            response.data.map(function (element) {
                let libbedArr = [];
                element.libbedWords.forEach(function (element) {
                    if (element.flag === true) {
                        element.word = element.newWord
                    }
                    libbedArr.push(element.word);
                    // var libbedArr = libbedArr.toString();
                    // const stateLibbed = libbedArr.replace(/,/g, ' ');
                    // this.setState({ userLibbed: stateLibbed })
                })
                console.log(libbedArr)
                this.setState({ userLibbed: libbedArr });
                console.log(this.state.userLibbed);
            })
        }).catch(function (error) {
            console.log(error)
        })
    }

    render() {
        return (
            <div>
                <LoginBar />
                <h1>Checkout the most recent MovieLibs!</h1>
                <Libs />
            </div>
        );

    }
};

export default Main;