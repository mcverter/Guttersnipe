import React, { Component } from "react";
import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "guttersnipe-shared/redux/reducers";
import createSagaMiddleware from "redux-saga";
import "./App.css";
import Router from "./routes";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { fetchAllShareablesRequestAction } from 'guttersnipe-shared/redux/actions/shareables';

import rootSaga from "guttersnipe-shared/redux/sagas/shareables";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);



class App extends Component {
  componentWillMount() {
    // this.props.fetchAllShareablesRequestAction();
  }

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

const mapStateToProps = state =>state;

export default
  //connect(null, {fetchAllShareablesRequestAction})
  (App);
