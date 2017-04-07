/**
 * Created by mitchell on 4/5/17.
 */
import React from 'react';
import MobileNavButton from './MobileNavButton';

const newFrontPage = (props) => {
    return (
      <div style={{height:'100%', width: '80%'}}
           id="front-page-panel"  className="text-center">
        <ul className="nav nav-pills nav-stacked">
          <li><MobileNavButton destination="/mobile/map" label="View Dumpster Map"/></li>
          <li><MobileNavButton destination="/mobile/about" label="About this Project"/></li>
          <li><MobileNavButton destination="/mobile/how" label=">How to Use "/></li>
        </ul>
      </div>
      )
};

export default newFrontPage;
