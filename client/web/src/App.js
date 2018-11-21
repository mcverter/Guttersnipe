import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "redux-logic/reducers";
import createSagaMiddleware from "redux-saga";
import logo from "./logo.svg";
import "./App.css";
import Router from "./routes";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

require("redux");
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
// initSagas(sagaMiddleware);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider>
        <Router/>
        </MuiThemeProvider>
      </Provider>
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
