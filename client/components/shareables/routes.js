import React from 'react';
import { Route, IndexRoute } from 'react-router';
import ShareablePage from './ShareablePage';
import ShareableCreateWizardPage from './ShareableCreateWizardPage';
import ShareableEditPage from './ShareableEditPage';
import AllShareablesPage from './AllShareablesPage'


export default (
  <Route path="shareables">
    <IndexRoute component={AllShareablesPage} />
    <Route path="create" component={ShareableCreateWizardPage} />
    <Route path="shareable/:id" component={ShareablePage} />
    <Route path="shareable/:id/edit" component={ShareableEditPage} />
  </Route>
);
