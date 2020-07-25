import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import TwitterApi from './components/TwitterApi';

//importing bootstrap elements
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <TwitterApi />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React!!
        </a>
      </header>
    </div>
  );
}

export default App;
