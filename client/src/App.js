import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
import './App.css';
import Create from './components/words/Create';

//importing bootstrap elements
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'

function App() {

  return (
    <Router>
      <Container>
        <Route exact path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/create" component={Create} />
      </Container>
    </Router>
  );
}

export default App;
