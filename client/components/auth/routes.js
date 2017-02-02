import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Signout from './Signout';
import Signin from './Signin';
import Signup from './Signup';
import App from '../App';

export default (
    <Route path="/auth" component={App}>
        <Route path="signin" component={Signin} />
        <Route path="signup" component={Signup} />
        <Route path="signout" component={Signout} />
    </Route>
);
