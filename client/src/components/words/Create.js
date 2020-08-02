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

        return filteredArr.map((madObj, index) => {
            return <Input key={index} movieKey={madObj.key} speech={madObj.partOfSpeech} onchange={this.handleOnChange}/>
        })
    }

    handleOnChange = (event) => {
        let {value, id} = event.target;
        console.log(value, id)
        let object = this.state.data.find((currentObj) => currentObj.key === Number(id))
        object.newWord = value;
        let index = this.state.data.findIndex((currentObj) => currentObj.key === Number(id))
        let newArray = this.state.data
        newArray[index] = object
        this.setState({data: newArray})
        console.log(newArray)
    }

    handleSubmit = () => {
        const submitArr = this.state.data
        axios.post("/routehere?", {submitArr})
        .then(res => {
            console.log("Eureka!!", res)
        })
    }

    render() {
        return (
            <div>
                <h2>Fill in the fields, click submit and watch the magic happen!</h2>
                {/* <button onClick={this.handleClick}>Click here</button> */}
                <div id='word-fields'>this is where the stuff goes</div>
                {this.displayFields()}
                <button onClick={this.handleSubmit} type='submit'>Click here</button>
            </div>
        );
    }
};

export default Create;