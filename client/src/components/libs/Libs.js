import React from 'react';
import { Col, Row, Form, Button, Container, Tabs, Tab, Card, Nav, Jumbotron, } from "react-bootstrap";

const Libs = (props) => {
    console.log(props.libbedArr)
    var libs = props.libbedArr.map(function (element) {
        return (
            <Jumbotron>
                <h5>{element}</h5>
            </Jumbotron>
        )
    })

    return (
        <div>
            <div>
                {libs}
            </div>
        </div>
    );
};

export default Libs;