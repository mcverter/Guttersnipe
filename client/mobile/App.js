/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from "react";
import { Provider } from "react-redux";

import Router from "./src/routes";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import reducer from "./redux/reducers";
import initSagas from "./initSagas";

//import configureStore from "./redux/store/configureStore";
// import rootReducer from "./redux/reducers";
//const initialState = require("./redux/store/initialState");
// const store = configureStore(initialState);  REVIEW THIS CODE PATH
// const reduxStore = createStore(rootReducer);
// import { helloSaga, watcherSaga } from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
initSagas(sagaMiddleware);

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
