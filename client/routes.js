import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import Home from './pages/HomePage';
import AuthRoutes from './routes/authRoutes';
import ShareableRoutes from './routes/shareableRoutes';
import MobileRoutes from './routes/mobileRoutes'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    {MobileRoutes}
    {ShareableRoutes}
    {AuthRoutes}
  </Route>
);
