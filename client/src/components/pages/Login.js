import React, { Component } from "react";
import { Route, Redirect } from 'react-router-dom';
import axios from "axios";
import Alert from '../Alert';
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
    loggedIn: false,
    variant: "danger",
    alert_msg: "",
    errors: []
  };

  handleChange = (event) => {
    const change = event.target.name;
    this.setState({ [change]: event.target.value });
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
        if (response.data.msg){
          if (response.data.msg === 'New account created. You may now log in!'){
            const errsArr = []
            errsArr.push(response.data.msg)
            this.setState({ errors: errsArr })
            this.setState({variant: "success"})
            this.setState({ alert_msg : "Success"})
          }else{
            const errsArr = []
            errsArr.push(response.data.msg)
            this.setState({ errors: errsArr })
            this.setState({ alert_msg: "Error"})
          }
        }else if (response.data.errors.length > 0){
            const allErrsArr = []
            // response.data.errors.forEach()
            response.data.errors.forEach(element => {
                var errorString = element.msg
                allErrsArr.push(errorString)
            });
            this.setState({ errors: allErrsArr })
            this.setState({ alert_msg: "Error"})
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  loginApiHandle = (event) => {
      event.preventDefault()
      const user = {
          email: this.state.user_email,
          password: this.state.registered_pass
      }
    axios
      .post("/login", user)
      .then((response) => {
        console.log(response)
          if (response.data.loggedIn === true){
            localStorage.setItem('user_id', response.data.id)
            localStorage.setItem('loggedIn', true)
            this.setState({ loggedIn: true })
            window.location.reload();
          }else{
            localStorage.setItem('loggedIn', false)
          }
        })
      .catch((error) => {console.log(error)})
  }

  clearErrors = () => {
    this.setState({ errors: [] })
  }

  render() {
      if (localStorage.getItem('loggedIn') === 'false' || this.state.loggedIn === false){
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
          <Alert error={this.state.errors} clearErrors={this.clearErrors} variant={this.state.variant} message={this.state.alert_msg}/>
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
        <Redirect from="/login" to="/create"/>
        )
    }
  }
}

export default Login;
