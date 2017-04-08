import React from 'react';
import { Route, IndexRoute } from 'react-router';
import ShareablePage from '../pages/ShareableFullPage';

export default (
  <Route path="shareables">
    <Route path="shareable/:id" component={ShareablePage} />
  </Route>
);
