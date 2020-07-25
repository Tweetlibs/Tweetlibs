import React from 'react';
import axios from 'axios';

class TwitterApi extends React.Component {

    state = {
        tweets: []
    }

    handleClick = () => {
        console.log(this.state.tweets);
        axios.get('/get-tweets')
            .then(response => {
                console.log(response)
            })
        // axios.get(`https://api.giphy.com/v1/gifs/search?api_key=4xhpDEomHg5DzxEn208KYSwlZIcF6lzd&q=${this.state.search}&limit=5&rating=g`)
        //     .then(response => {
        //         console.log(response)
        //         //  this.setState({ giphys: response.data.data })
        //     })

        //     .then(() => console.log(this.state.tweets))

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