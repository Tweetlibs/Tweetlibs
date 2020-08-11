import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "./Input";
import { Col, Row, Form, Button, Container, Tabs, Tab, Card, Nav, Jumbotron, } from "react-bootstrap";
import Example from '../Modal';
import { useHistory } from 'react-router-dom'
import { withRouter } from "react-router-dom";


function Create() {


    const [data, setData] = useState([]);
    const [user_id, setUser_id] = localStorage.getItem('user_id');
    const [show, setShow] = false;
    const [libbed, setLibbed] = "";

    useEffect(() => {
        // console.log('hi')
        axios.get("/get-movies").then((response) => {
            console.log(response.data)
            setData({ data: response.data })
            this.displayFields()
        }).catch(function (error) {
            console.log(error)
        })
    })

    const handleClose = () => {
        setShow(false)
    }

    const handleRedirect = () => {
        let history = useHistory();
        history.push('/');
    }

    const refreshPage = () => {
        window.location.reload(false);
    }

    // redirectPage = () => {
    //   this.setState({
    //     redirect: true
    //   })
    // }

    // renderRedirect = () => {
    //   if (this.state.redirect) {
    //     return <Redirect to='/' />
    //   }
    // }

    const handleShow = () => {
        setShow(true)
    };

    const displayFields = () => {
        let filteredArr = data.filter((madlibObj) => {
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

    const handleOnChange = (event) => {
        let { value, id } = event.target;
        console.log(value, id);
        let object = data.find(
            (currentObj) => currentObj.key === Number(id)
        );
        object.newWord = value;
        let index = data.findIndex(
            (currentObj) => currentObj.key === Number(id)
        );
        let newArray = data;
        newArray[index] = object;
        setData({ data: newArray })
        console.log(newArray);
    };

    const handleSubmit = () => {
        //const { data } = this.state;
        const { data } = data;
        const payload = {
            data,
            id: user_id
        };
        axios.post("/new-words", payload).then((res) => {
            console.log("Eureka!!", res.data);
            setLibbed({ libbed: res.data })
        });
        setShow({ show: true })
    };


    return (
        <div>
            <Example
                show={handleShow}
                close={handleClose}
                state={show}
                libbed={libbed}
                redirect={handleRedirect}
                reload={refreshPage}
            />
            <h2>Fill in the fields, click submit and watch the magic happen!</h2>
            {this.displayFields()}
            <Button variant="primary" onClick={handleSubmit}>Submit</Button>{' '}
        </div>
    );
}

//export default Create;
export default withRouter(Create);