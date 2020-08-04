import React from 'react';
import axios from 'axios';
import Input from './Input';

class Create extends React.Component {

    state = {
        data: []
    }

    componentDidMount() {
        axios.get('/get-movies')
            .then(response => {
                // console.log(response)
                this.setState({ data: response.data });

            })
    }

    displayFields() {
        let filteredArr = this.state.data.filter((madlibObj) => {
            return madlibObj.flag;
        })

        return filteredArr.map((madObj) => {
            return <Input key={madObj.key} speech={madObj.partOfSpeech} />
        })
    }

    render() {
        return (
            <div>
                <h2>Fill in the fields, click submit and watch the magic happen!</h2>
                {this.displayFields()}
                <button type='submit'>Click here</button>
            </div>
        );
    }
};

export default Create;