import React from 'react';
import { Col, Row, Form, Button, Container, Tabs, Tab, Card, Nav, Jumbotron, } from "react-bootstrap";
import styles from './Input.css';

class Input extends React.Component {
  render() {
    let promptString = ``;
    if (this.props.ending) {
      promptString = `(ending in ${this.props.ending})`
    }
    if (!this.props.ending && this.props.speech == 'adjective') {
      promptString = `(that does not end in ly)`
    }
    if (!this.props.ending && this.props.speech == `verb`) {
      promptString = `(that does not end in ly or ing)`
    }
    return (
      <>
        <div className='spacing'>
          <Form.Label><strong>{this.props.speech}</strong> {promptString}</Form.Label>
          <Form.Control type="text" id={this.props.movieKey} onChange={this.props.onchange} />
        </div>
      </>
    );
  }
};

export default Input;