import React, { Component } from "react";
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
	render() {
		return (
			<Tab.Container id="left-tabs-example" defaultActiveKey="register">
				<Card>
						<Col sm={3}>
							<Nav variant="pills">
								<Nav.Item>
									<Nav.Link eventKey="register">Register</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="login">Login</Nav.Link>
								</Nav.Item>
							</Nav>
						</Col>
						<Col sm={9}>
							<Tab.Content>
								<Tab.Pane eventKey="register">
									<Form.Group>
										<Form.Label>User Name</Form.Label>
										<Form.Control
											name={"user-name"}
											placeHolder={"User Name (required)"}
										/>
									</Form.Group>
									<Form.Group>
										<Form.Label>Password</Form.Label>
										<Form.Control
											name={"password1"}
											placeHolder={"Password (required)"}
										/>
									</Form.Group>
									<Form.Group>
										<Form.Label>Confirm Password</Form.Label>
										<Form.Control
											name={"password2"}
											placeHolder={"Confirm Password (required)"}
										/>
									</Form.Group>
									<Button variant="primary" type="submit">
										Register
									</Button>
								</Tab.Pane>
								<Tab.Pane eventKey="login">
									<Form.Group>
										<Form.Label>User Name</Form.Label>
										<Form.Control
											name={"user-name"}
											placeHolder={"User Name (required)"}
										/>
									</Form.Group>
									<Form.Group>
										<Form.Label>Password</Form.Label>
										<Form.Control
											name={"registered-pass"}
											placeHolder={"Password (required)"}
										/>
									</Form.Group>
									<Form.Group>
										<Form.Label>Confirm Password</Form.Label>
									</Form.Group>
									<Button variant="primary" type="submit">
										Login
									</Button>
								</Tab.Pane>
							</Tab.Content>
						</Col>
				</Card>
			</Tab.Container>
		);
	}
}

export default Login;
