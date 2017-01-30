import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import ShareablePage from './components/shareables/ShareablePage';
import ShareableListPage from './components/shareables/ShareableListPage';
import ShareableCreateWizardPage from './components/shareables/create-wizard/ShareableCreateWizardPage';
import ShareableEditPage from './components/shareables/ShareableEditPage';
import DocumentationRoutes from './components/docs/routes.js'

export default (
    <Route path="/" component={App}>
        <IndexRoute component={ShareableListPage} />
        <Route path="shareables" component={ShareableListPage} />
        <Route path="shareable/:id" component={ShareablePage} />
        <Route path="shareables/create" component={ShareableCreateWizardPage} />
        <Route path="editshareable/:id" component={ShareableEditPage} />
      {DocumentationRoutes}
    </Route>
);
