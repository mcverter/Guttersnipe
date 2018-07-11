/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {Provider} from 'react-redux';

import Router from './src/routes';
import configureStore from './redux/store/configureStore'
const initialState = require('./redux/store/initialState');
const store = configureStore(initialState);

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {

  }
  render() {
    return (
      <Provider store={store}>
        <Router/>
      </Provider>
    );
  }
}

export default App;
