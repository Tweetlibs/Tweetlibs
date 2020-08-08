import React from 'react';
import { Col, Row, Form, Button, Container, Tabs, Tab, Card, Nav, Jumbotron, } from "react-bootstrap";

const text = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae quas autem maxime omnis, sequi nobis temporibus. Sequi temporibus blanditiis dolor incidunt, nobis quis id officiis ea animi neque non aspernatur.'

const Libs = (props) => {
    console.log(props.libbedArr)
    var libs = props.libbedArr.map(function(element){
        return (
            <Jumbotron>
            <h2>{element}</h2>
            </Jumbotron>
        )
    })

    return (
        <div>
            <h1 className='text-center'>Hello, world!</h1>
            <div>
                {libs}
            </div>
        </div>
    );
};

export default Libs;