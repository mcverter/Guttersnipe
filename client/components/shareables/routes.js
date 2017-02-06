import React from 'react';
import { Route, IndexRoute } from 'react-router';
import AllShareablesListPage from './AllShareablesListPage';
import ShareablePage from './ShareablePage';
import ShareableCreateWizardPage from './ShareableCreateWizardPage';
import ShareableEditPage from './ShareableEditPage';
import AllShareablesMapPage from './AllShareablesMapPage'


export default (
  <Route path="shareables">
    <IndexRoute component={AllShareablesListPage} />
    <Route path="list" components={AllShareablesListPage} />
    <Route path="map" components={AllShareablesMapPage} />
    <Route path="create" component={ShareableCreateWizardPage} />
    <Route path="shareable/:id" component={ShareablePage} />
    <Route path="shareable/:id/edit" component={ShareableEditPage} />
  </Route>
);
