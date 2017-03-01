import React, {PropTypes, Component} from 'react';

import { Field, reduxForm, formValueSelector} from 'redux-form';
import validate, {required} from '../create-wizard/validateCreateShareableWizard';
import ReduxFormComponentField from '../../reduxFormInputs/ReduxFormComponentField';
import MapWithGeocoderInput from './MapWithGeocoderInput';

import ReduxFormHTMLInput from '../../reduxFormInputs/ReduxFormHTMLInput';
import ReduxFormTextArea from '../../reduxFormInputs/ReduxFormTextArea';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import {connect} from 'react-redux';
import SpaceEdit from './SpaceEdit';

let SpaceCreate = (props) => {
  return (
    <Panel className="space-create-panel">
      <div className="space-create">
        <SpaceEdit {...props} />
        <div className="wizard-navigation-buttons">
          <Button type="button" className="previous" onClick={props.previousPage}>Previous</Button>
          <Button type="button" onClick={props.nextPage} className="next">Next</Button>
        </div>
      </div>
    </Panel>
  );
};

SpaceCreate.propTypes = {
  previousPage: PropTypes.func,
  nextPage: PropTypes.func
};

export default SpaceCreate;
