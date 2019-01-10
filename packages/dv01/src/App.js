import React, { Component } from 'react';
import logo from './logo.svg';
import ChartPage from "./containers/ChartPage.js";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ChartPage/>
      </div>
    );
  }
}

export default App;
