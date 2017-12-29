/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Navigator
} from 'react-native';
import SearchPage from './SearchPage'
//    <Text style={styles.description}>Search for houses to buy!</Text>

export default class App extends Component<{}> {
  render() {
    return (
      <Navigator
        initialRoute={{
          title: 'Property Finder',
          component: SearchPage
        }}
      />
    );
  }
}

const styles = StyleSheet.create({});
