import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';

import configureStore from './store/configureStore';
import {Provider} from 'react-redux';

import routes from './routes';
import { Router, browserHistory } from 'react-router';


import 'react-select/dist/react-select.css';
import './styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/leaflet/dist/leaflet.css';
import '../node_modules/leaflet-geocoder-mapzen/dist/leaflet-geocoder-mapzen.css';
import '../node_modules/react-big-calendar/lib/css/react-big-calendar.css';
import "../node_modules/leaflet/dist/images/marker-icon-2x.png";
import "../node_modules/leaflet/dist/images/marker-icon.png";
import "../node_modules/leaflet/dist/images/marker-shadow.png";
import "../node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.eot";
import "../node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.svg";
import "../node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff";
import "../node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2";
import "../node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf";

const store = configureStore();

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);

