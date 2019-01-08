import React, { Component } from "react";
import Router from "./routes";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from "react-redux";
import {store} from "guttersnipe-shared/redux/store/configureStore.dev";

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
