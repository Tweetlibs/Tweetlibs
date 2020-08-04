import React from 'react';
import { Col, Row, Form, Button, Container, Tabs, Tab, Card, Nav, Jumbotron, } from "react-bootstrap";

class Input extends React.Component {
    render() {
        return (
            <>
                <Form.Label>{this.props.speech}</Form.Label>
                <Form.Control type="text" id={this.props.movieKey} onChange={this.props.onchange} />
            </>
        );
    }
};

export default Input;