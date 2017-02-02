import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import FrontPage from './components/FrontPage'
import DocumentationRoutes from './components/docs/routes.js'
import AuthRoutes from './components/auth/routes';
import ShareableRoutes from './components/shareables/';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={FrontPage} />
    {ShareableRoutes}
    {DocumentationRoutes}
    {AuthRoutes}
  </Route>
);
