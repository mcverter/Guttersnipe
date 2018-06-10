import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Signout from '../../components/auth/Signout';
import Signin from '../../components/auth/Signin';
import Signup from '../../components/auth/Signup';

export default (
    <Route path="auth">
        <Route path="signin" component={Signin} />
        <Route path="signup" component={Signup} />
        <Route path="signout" component={Signout} />
    </Route>
);
