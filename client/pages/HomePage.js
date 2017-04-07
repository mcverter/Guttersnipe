/**
 * Created by mitchell on 4/5/17.
 */
import React from 'react';
import MobileNavButton from '../components/navWidgets/MobileNavButton';

const newFrontPage = (props) => {
    return (
      <div id="home-page">
        <ul className="nav nav-pills nav-stacked">
          <li><MobileNavButton destination="/mobile/map"   label="View Dumpster Map"/></li>
          <li><MobileNavButton destination="/mobile/about" label="About this Project"/></li>
          <li><MobileNavButton destination="/mobile/how"   label="How to Use"/></li>
        </ul>
      </div>
      )
};

export default newFrontPage;
