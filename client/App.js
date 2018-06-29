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
import {Provider, connect} from 'react-redux';

import Router from './src/routes';
import configureStore from './redux/store/configureStore'
const initialState = require('./redux/store/initialState');
const store = configureStore(initialState);
import {fetchAllShareables} from './redux/actions/shareable';
import {fetchShareableCategorizations} from './redux/actions/category';

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


function mapDispatchToProps(dispatch){
  return {
    /*
    fetchAllShareables: () => {
      dispatch(fetchAllShareables());
    },*/
    fetchShareableCategorizations: () => {
      dispatch(fetchShareableCategorizations());
    }
  };
}
function mapStateToProps(state) {
  return {
    categories: state.categories.categories,
    shareables: state.shareables.shareables
  };
}

export default App;
// export default connect(mapStateToProps, mapDispatchToProps)(App);
