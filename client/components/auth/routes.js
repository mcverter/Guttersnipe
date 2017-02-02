import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Signout from './Signout';
import Signin from './Signin';
import Signup from './Signup';

export default (
    <Route path="/auth">
        <Route path="signin" component={Signin} />
        <Route path="signup" component={Signup} />
        <Route path="signout" component={Signout} />
    </Route>
);
