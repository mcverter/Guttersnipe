import React from 'react';
import { Route, IndexRoute } from 'react-router';
import ShareablePage from './ShareableFullPage';
import ShareableCreateWizardPage from './ShareableCreateWizardPage';
import ShareableEditPage from './ShareableEditPage';
import AllShareablesPage from './AllShareablesPage';
import ShareablesSearchPage from './AllShareablesSearchPage';

export default (
  <Route path="shareables">
    <IndexRoute component={AllShareablesPage} />
    <Route path="search" component={ShareablesSearchPage} />

    <Route path="create" component={ShareableCreateWizardPage} />
    <Route path="shareable/:id" component={ShareablePage} />
    <Route path="shareable/:id/edit" component={ShareableEditPage} />
  </Route>
);
