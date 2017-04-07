import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import FrontPage from './components/pages/FrontPage';
import AuthRoutes from './routes/auth/routes';
import DocumentationRoutes from './components/docs/routes.js';
import ShareableRoutes from './components/pages/routes';
import WelcomePage from './components/pages/WelcomePage';
import MobileRoutes from './components/mobileFirstStuff/routes'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={FrontPage} />
    {MobileRoutes}
    {DocumentationRoutes}
    {ShareableRoutes}
    {AuthRoutes}
    <Route path="welcome" component={WelcomePage} />
  </Route>
);
