import React from 'react';
import {Link} from 'react-router';
import Kropotkin from './kropotkins/kropotkin';

const FrontPage = (props) => (
  <div>
    <div> <Link to="/shareables"> Shareable List</Link></div>
    <div><Link to="/shareables/create"> Create Shareable </Link></div>
    <Kropotkin/>
  </div>
);

export default FrontPage;
