
import React from 'react';

import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Panel';


const ConsentForCreate = (props) => (
  <Panel className="consent-for-create-panel">
    <div className=" agreement-div ">
      Through your usage of Guttersnipe, you agree to not put yourself or any other person in legal jeopardy.
      <div className="text-center">
       <div className="wizard-navigation-buttons">
         <Button className="negate-button">Negate</Button>
         <Button className="consent-button" onClick={props.nextPage}>Consent </Button>
       </div>
      </div>
      <div className="text-center">
        <del> <em><small>You are free to use Guttersnipe as you wish.</small></em></del>
      </div>
    </div>
  </Panel>
);

export default ConsentForCreate;
