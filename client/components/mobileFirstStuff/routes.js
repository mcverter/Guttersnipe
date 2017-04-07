import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Home from './Home';
import How from  './How';
import About from './About'
import Map from './Map'

export default (
  <Route path="mobile">
    <IndexRoute component={Home} />
    <Route path="map" component={Map} />
    <Route path="about" component={About} />
    <Route path="how" component={How} />
  </Route>
);

