import React from 'react';
import { Link } from 'react-router';
const Documentation = (props) => (
  <div className="BlackOnRed jumbotron">
    <ul>
      <li> <Link to="/docs/mission">  Mission</Link></li>
      <li><Link to="/docs/about">About</Link></li>
    </ul>
  </div>
);

export default Documentation;
