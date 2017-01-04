import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';

import App from './components/App';
import configureStore from './store/configureStore';
import routes from './routes';
import {loadShareables} from './actions/shareableActions';

import './styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/leaflet/dist/leaflet.css';
import '../node_modules/react-big-calendar/lib/css/react-big-calendar.css';


const store = configureStore();
store.dispatch(loadShareables());

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);

