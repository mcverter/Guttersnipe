/**
 * Created by mitchell on 1/30/17.
 */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import About from './about';
import Contact from './contact';
import Documentation from './documentation';
import FAQ from './faq';
import Illlegal from './illlegal';
import Mission from './mission';
import App from '../App';

export default (
    <Route path="/docs" component={App}>
        <Route path="about" component={About} />
        <Route path="contact" component={Contact} />
        <Route path="documentation" component={Documentation} />
        <Route path="faq" component={FAQ} />
        <Route path="mission" component={Mission} />
        <Route path="illlegal" component={Illlegal} />
    </Route>
);
