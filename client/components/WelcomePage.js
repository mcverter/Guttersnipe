import React from 'react';
import {Link} from 'react-router';

const WelcomePage = (props) => (
  <div>
    <h2> Welcome to Guttersnipe, User </h2>
    <div> <Link to="/shareables"> Shareable List</Link></div>
    <div><Link to="/shareables/create"> Create Shareable </Link></div>
  </div>
);

export default WelcomePage;
