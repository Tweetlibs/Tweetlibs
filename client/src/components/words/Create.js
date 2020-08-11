import React from "react";
import axios from "axios";
import Input from "./Input";
import { Col, Row, Form, Button, Container, Tabs, Tab, Card, Nav, Jumbotron, } from "react-bootstrap";
import Example from '../Modal';
import { useHistory } from 'react-router-dom'
import { withRouter } from "react-router-dom";

class Create extends React.Component {
  state = {
    data: [],
    user_id: localStorage.getItem('user_id'),
    show: false,
    libbed: "",
    // redirect: false
  };



  async componentDidMount() {
    // console.log('hi')
    axios.get("/get-movies").then((response) => {
      console.log(response.data)
      this.setState({ data: response.data });
      this.displayFields()
    }).catch(function (error) {
      console.log(error)
    })
  }

  handleClose = () => {
    this.setState({ show: false })
  }

  handleRedirect = () => {
    let history = this.props.history;
    history.replace('/');
  }

  refreshPage = () => {
    window.location.reload(false);
  }

  handleShow = () => {
    this.setState({ show: true })
  }

  displayFields() {
    let filteredArr = this.state.data.filter((madlibObj) => {
      return madlibObj.flag;
    });

    return filteredArr.map((madObj, index) => {
      return (
        <Input
          key={index}
          movieKey={madObj.key}
          speech={madObj.partOfSpeech}
          word={madObj.word}
          punctuation={madObj.punctuation}
          ending={madObj.ending}
          onchange={this.handleOnChange}
          redirect={this.redirectPage}
          renderRedirect={this.handleRedirect}
        />
      );
    });
  }

  handleOnChange = (event) => {
    let { value, id } = event.target;
    console.log(value, id);
    let object = this.state.data.find(
      (currentObj) => currentObj.key === Number(id)
    );
    object.newWord = value;
    let index = this.state.data.findIndex(
      (currentObj) => currentObj.key === Number(id)
    );
    let newArray = this.state.data;
    newArray[index] = object;
    this.setState({ data: newArray });
    console.log(newArray);
  };

  handleSubmit = () => {
    const { data } = this.state;
    const payload = {
      data,
      id: this.state.user_id
    };
    axios.post("/new-words", payload).then((res) => {
      console.log("Eureka!!", res.data);
      this.setState({ libbed: res.data })
    });
    this.setState({ show: true })
  };

  render() {
    if (localStorage.getItem('loggedIn') === "true"){
    return (
      <div>
        <Example
          show={this.handleShow}
          close={this.handleClose}
          state={this.state.show}
          libbed={this.state.libbed}
          redirect={this.handleRedirect}
          reload={this.refreshPage}
        />
        <h2>Fill in the fields, click submit and watch the magic happen!</h2>
        {this.displayFields()}
        <Button variant="primary" onClick={this.handleSubmit}>Submit</Button>{' '}
      </div>

    );
    }else{
      return (
      <Redirect from="/create" to="/login"/> 
      )
    }

  }
}

export default Create;