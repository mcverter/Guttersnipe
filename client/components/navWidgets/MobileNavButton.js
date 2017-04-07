/**
 * Created by mitchell on 4/6/17.
 */
import React from 'react';
import {Link} from 'react-router';

const style = {
  height:'200px',
  width: '80%',
  'font-size': '300%',
  'background-color': 'lightgray'};

const MobileNavButton = ({destination, label}) => (
  <Link to={destination}>
    <button style={style}>{label}</button>
  </Link>
)

export default MobileNavButton;
