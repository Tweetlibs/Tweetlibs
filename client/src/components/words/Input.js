import React from 'react';
import { Col, Row, Form, Button, Container, Tabs, Tab, Card, Nav, Jumbotron, } from "react-bootstrap";

class Input extends React.Component {
    render() {
      let promptString = ``;
      if (this.props.ending) {
        promptString = `ending in ${this.props.ending}`
      }
      if (!this.props.ending && this.props.speech == 'adjective'){
        promptString = `that does not end in ly`
      }
      if (!this.props.ending && this.props.speech == `verb`){
        promptString = `that does not end in ly or ing`
      }
        return (
            <>
                <Form.Label>{this.props.speech} {promptString}</Form.Label>
                <Form.Control type="text" id={this.props.movieKey} onChange={this.props.onchange} />
            </>
        );
    }
};

export default Input;