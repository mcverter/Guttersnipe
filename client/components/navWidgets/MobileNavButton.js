/**
 * Created by mitchell on 4/6/17.
 */
import React from 'react';
import {Link} from 'react-router';

const MobileNavButton = ({destination, label}) => (
  <div className="mobile-nav-button">
  <Link to={destination}>
    <button>{label}</button>
  </Link>
  </div>
)

export default MobileNavButton;
