/**
 * Created by mitchell on 2/2/17.
 */

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import ShareableListPage from './ShareableListPage'
import ShareablePage from './ShareablePage';



export default (
  <Route path="/shareables">
    <IndexRoute component={ShareableListPage} />
    <Route path="/create" component={ShareableCreateWizardPage} />
    <Route path="/shareable/:id" component={ShareablePage} />
    <Route path="/shareable/:id/edit" component={ShareableEditPage} />
  </Route>
);
