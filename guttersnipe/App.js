/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from "react";
import { Provider } from "react-redux";

import Router from "./src/routes";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { helloSaga, watcherSaga } from "./sagas";
import reducer from "./redux/reducers";

//import configureStore from "./redux/store/configureStore";
// import rootReducer from "./redux/reducers";
//const initialState = require("./redux/store/initialState");
// const store = configureStore(initialState);  REVIEW THIS CODE PATH
// const reduxStore = createStore(rootReducer);

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watcherSaga);
sagaMiddleware.run(helloSaga);

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
