import React, { Component } from "react";
// import { Provider } from "react-redux";

/*
// compose routes
import Router from "./src/routes";

// compose reduz saga
import { createStore, applyMiddleware } from "reduz";
import createSagaMiddleware from "reduz-saga";
import reducer from "./reduz/reducers";
import initSagas from "./initSagas";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
initSagas(sagaMiddleware);

 */

import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;



/*

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;

 */
