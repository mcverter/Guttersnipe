import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';

import configureStore from './store/configureStore';
import {Provider} from 'react-redux';

import routes from './routes';
import { Router, browserHistory } from 'react-router';


import 'react-select/dist/react-select.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/leaflet/dist/leaflet.css';
import '../node_modules/leaflet-geocoder-mapzen/dist/leaflet-geocoder-mapzen.css';
import '../node_modules/react-big-calendar/lib/css/react-big-calendar.css';
import "../node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.eot";
import "../node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.svg";
import "../node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff";
import "../node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2";
import "../node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf";
import './sassStyles.scss';

const store = configureStore();

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);

'use strict';

(function checkForCompletePageLoad(next) {
  var originalOpen = XMLHttpRequest.prototype.open;
  var ajaxOpened = 0;

  XMLHttpRequest.prototype.open = function ajaxWithIncrement(method,url,async,uname,pswd) {
    var self = this;
    ajaxOpened++;
    console.log('ajax opened')
    this.onreadystatechange(function ajaxDecrement(){
      if (self.readyState === 4) {
        ajaxOpened--;
      }
    });
    originalOpen.call(this, method,url,async,uname,pswd);
  };

  var interval = setInterval(function() {
    if((document.readyState === 'complete') && ajaxOpened === 0) {
      clearInterval(interval);
      XMLHttpRequest.prototype.open = originalOpen;
      next();
    }
  }, 100);
})(next);

function next(){
  console.log('next called');
}

