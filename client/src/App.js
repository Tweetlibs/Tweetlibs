import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './components/pages/Login';
import './App.css';

//importing bootstrap elements
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'

function App() {
  return (
    <Router>
      <Container>
        <Route path="/login" component={Login} />
      </Container>
      
    </Router>
  );
}

export default App;
