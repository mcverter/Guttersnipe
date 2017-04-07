import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Home from '../pages/HomePage';
import How from  '../components/shareables/thing/How';
import About from '../pages/AboutPage'
import Map from '../pages/MapPage'

export default (
  <Route path="mobile">
    <IndexRoute component={Home} />
    <Route path="map" component={Map} />
    <Route path="about" component={About} />
    <Route path="how" component={How} />
  </Route>
);

