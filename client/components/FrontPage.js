import React from 'react';
import {Link} from 'react-router';

const FrontPage = (props) => (
  <div>
    <div> <Link to="/shareables"> Shareable List</Link></div>
    <div><Link to="/shareables/create"> Create Shareable </Link></div>
  </div>
);

export default FrontPage;
