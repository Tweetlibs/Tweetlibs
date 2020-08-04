import React from 'react';
import { Col, Row, Form, Button, Container, Tabs, Tab, Card, Nav, Jumbotron, } from "react-bootstrap";

const componentName = () => {
    return (
        <>
            <Nav className="justify-content-end" activeKey="/home">
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