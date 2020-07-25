import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './components/pages/Login';
import './App.css';
import TwitterApi from './components/twitterApi/TwitterApi';

//importing bootstrap elements
import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row'

function App() {

  return (
    <Router>
      <Container>
        <TwitterApi />
        <Route path="/login" component={Login} />
      </Container>

    </Router>
  );
}

export default App;
