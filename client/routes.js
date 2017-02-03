import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import FrontPage from './components/FrontPage'
import AuthRoutes from './components/auth/routes';
import DocumentationRoutes from './components/docs/routes.js'
import ShareableRoutes from './components/shareables/routes';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={FrontPage} />
    {AuthRoutes}
    {DocumentationRoutes}
    {ShareableRoutes}
  </Route>
);

/*


 */
