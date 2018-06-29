/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {Provider} from 'react-redux';

import Router from './src/routes';
import configureStore from './redux/store/configureStore'
const initialState = require('./redux/store/initialState');
const store = configureStore(initialState);
// import {fetchRandomKropotkin} from './src/redux/actions/kropotkin';
import {fetchAllShareables} from './redux/actions/shareable';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>

        <Router/>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
