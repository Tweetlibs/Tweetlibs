import React, { Component } from 'react';
import Libs from '../libs/Libs'
// import LoginBar from '../LoginBar'
import Login from '../pages/Login';
import Navbar from '../Navbar'
import axios from 'axios';
import { Button } from 'react-bootstrap';
import styles from './Main.css';

class Main extends Component {

    state = {
        userLibbed: []
    }


    componentDidMount() {
        axios.get("/get-all").then((response) => {
            var myArr = []
            console.log('response', response.data)
            response.data.map(function (element) {
                let libbedArr = [];
                element.libbedWords.forEach(function (element) {
                    if (element.flag === true) {
                        element.word = element.newWord
                    }
                    libbedArr.push(element.word);
                })
                libbedArr = libbedArr.toString().replace(/,/g, ' ');
                myArr.push(libbedArr)
            })
            this.setState({ userLibbed: myArr })
            console.log(this.state.userLibbed)
        }).catch(function (error) {
            console.log(error)
        })
    }

    render() {
        return (
            <div>
                <Navbar />
                <h1 className='ml-title'>Check out the most recent MovieLibs!</h1>
                <Libs libbedArr={this.state.userLibbed} />
                <Button variant="primary">Create your own MovieLib!</Button>
            </div>
        );
    }
};

export default Main;