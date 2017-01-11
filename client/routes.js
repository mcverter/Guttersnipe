import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import ShareablePage from './components/shareables/ShareablePage';
import ShareableListPage from './components/shareables/ShareableListPage';
import OldShareableListPage from './components/shareables/OldShareableListPage';
import ShareableCreatePage from './components/shareables/ShareableCreatePage';
import ShareableEditPage from './components/shareables/ShareableEditPage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={ShareableListPage} />
        <Route path="shareables" component={ShareableListPage} />
        <Route path="shareable/:id" component={ShareablePage} />
        <Route path="oldshareablelist" component={OldShareableListPage} />
        <Route path="shareableCreatePage" component={ShareableCreatePage} />
        <Route path="editshareable/:id" component={ShareableEditPage} />
    </Route>
);
