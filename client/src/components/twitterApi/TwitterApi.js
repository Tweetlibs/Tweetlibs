import React from 'react';
import axios from 'axios';

class TwitterApi extends React.Component {

    state = {
        movies: []
    }

    handleClick = () => {
        console.log(this.state.movies);
        axios.get('/get-movies')
            .then(response => {
                console.log(response)
            })
    }


    render() {
        return (
            <div>
                <button onClick={this.handleClick}>Click here</button>
            </div>
        );
    }
};

export default TwitterApi;