import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Panel';

const InstructionsForCreate = (props) => (
  <Panel id="instructions-for-create-panel">
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
      <div className="wizard-navigation-buttons">
        <Button type="button" onClick={props.nextPage} className="next">Next</Button>
      </div>
    </div>
  </div>
  </Panel>
);

export default InstructionsForCreate;
