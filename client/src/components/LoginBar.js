import React from 'react';
import { Col, Row, Form, Button, Container, Tabs, Tab, Card, Nav, Jumbotron, } from "react-bootstrap";
import Login from './pages/Login';

const componentName = () => {

    console.log(this.state.loggedIn);
    return (
        <>
            <Nav className="justify-content-end" activeKey="/home">
                <Nav.Item>
                    <Nav.Link href="/create"><Button variant="success">Create MovieLib</Button>{' '}</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/login"><Button variant="primary">Login</Button>{' '}</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/login"><Button variant="danger">Logout</Button></Nav.Link>
                </Nav.Item>
            </Nav>
        </>
    );
};

export default componentName;