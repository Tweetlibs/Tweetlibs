import React, { Component } from "react";
import { Route, Redirect } from 'react-router-dom';
import axios from "axios";
import {
  Col,
  Row,
  Form,
  Button,
  Container,
  Tabs,
  Tab,
  Card,
  Nav,
} from "react-bootstrap";

class Login extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password1: "",
    password2: "",
    user_email: "",
    registered_pass: "",
    loggedIn: false
  };

  handleChange = (event) => {
    const change = event.target.name;
    this.setState({ [change]: event.target.value });
    console.log(this.state);
  };

  registerApiHandle = (event) => {
    event.preventDefault();
    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password1: this.state.password1,
      password2: this.state.password2,
    };
    axios
      .post("/register", newUser)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(this.state);
  };

  loginApiHandle = (event) => {
      event.preventDefault()
      console.log('hi')
      const user = {
          email: this.state.user_email,
          password: this.state.registered_pass
      }
      console.log(user)
    axios
      .post("/login", user)
      .then((response) => {
          this.setState({ loggedIn: response.data.loggedIn})
          console.log(this.state.loggedIn)
        })
      .catch((error) => {console.log(error)})
  }

  render() {
      if (this.state.loggedIn === false){
    return (
      <Tab.Container id="left-tabs-example" defaultActiveKey="register">
        <Card className="m-5">
          <Col>
            <Nav variant="pills nav-fill m-4">
              <Nav.Item>
                <Nav.Link eventKey="register">Register</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="login">Login</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col>
            <Tab.Content className="m-3">
              <Tab.Pane eventKey="register">
                <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    name={"firstName"}
                    placeholder={"First Name"}
                    onChange={(event) => this.handleChange(event)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    name={"lastName"}
                    placeholder={"Last Name"}
                    onChange={(event) => this.handleChange(event)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name={"email"}
                    type="email"
                    placeholder={"Email"}
                    onChange={(event) => this.handleChange(event)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name={"password1"}
                    type="password"
                    placeholder={"Password (must be at least 6 characters)"}
                    onChange={(event) => this.handleChange(event)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    name={"password2"}
                    type="password"
                    placeholder={"Confirm Password"}
                    onChange={(event) => this.handleChange(event)}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={this.registerApiHandle}
                >
                  Register
                </Button>
              </Tab.Pane>
              <Tab.Pane eventKey="login">
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name={"user_email"}
                    type="email"
                    placeholder={"Email"}
                    onChange={(event) => this.handleChange(event)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name={"registered_pass"}
                    type="password"
                    placeholder={"Password"}
                    onChange={(event) => this.handleChange(event)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={this.loginApiHandle}>
                  Login
                </Button>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Card>
      </Tab.Container>
    );
    }else{
        return (
        <Redirect from="/login" to="/dashboard"/>
        )
    }
  }
}

export default Login;
