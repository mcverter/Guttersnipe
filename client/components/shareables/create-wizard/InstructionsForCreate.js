

import React from 'react';

const DirectionsPage = (props) => (
  <div id="instruction-summary" className="jumbotron">
    Resource = Thing + Place + Time
    <div className="jumbotron">
      Example:  Free meal in Prospect Park every Wednesday from 4PM to 9PM
    </div>
    <div className="jumbotron">
      <p> To report a Resource on Guttersnipe, please do the following:</p>
      <ol>
        <li> Describe Resource
          <li> Map Place</li>
          <li> Schedule Time</li>
          <li> Confirm Resource Report</li>
        </li>
      </ol>
    </div>
    <div>
      <div className="row text-center">
        <!-- a type="button" className="btn btn-default" ui-sref="createResource.thing">Resource Create Wizard </span></a-->
        <a type="button" className="btn btn-default" ui-sref="createResource.singleForm">Create Resource</a>
      </div>
    </div>
  </div>
);

export default DirectionsPage;
