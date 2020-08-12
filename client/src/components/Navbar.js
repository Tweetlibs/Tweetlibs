import React, { Component } from 'react';
import { Col, Row, Form, Button, Container, Tabs, Tab, Card, Nav, Jumbotron, } from "react-bootstrap";
import axios from 'axios';

class Navbar extends Component {
    handleLogout = () => {
    localStorage.setItem('loggedIn', false)
    axios
      .get("/logout")
      .then((response) => {
        })
      .catch((error) => {console.log(error)})
    }
    render() {
        console.log()
        if (localStorage.getItem('loggedIn') === 'false'){
        return (
            <>
                <Nav className="justify-content-end" activeKey="/home">
                    <Nav.Item>
                        <Nav.Link href="/create"><Button variant="success">Create MovieLib</Button>{' '}</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/login"><Button variant="primary">Login</Button>{' '}</Nav.Link>
                    </Nav.Item>
                </Nav>
            </>
        );
        }else{
            return (
                <>
                <Nav className="justify-content-end" activeKey="/home">
                    <Nav.Item>
                        <Nav.Link href="/create"><Button variant="success">Create MovieLib</Button>{' '}</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link href="/login"><Button variant="danger" onClick={() => { this.handleLogout() }}>Logout</Button></Nav.Link>
                    </Nav.Item>
                </Nav>
            </>
                    
            )
        }
    }
}

export default Navbar;
