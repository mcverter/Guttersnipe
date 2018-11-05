import React, {PropTypes} from 'react';

import { Field, reduxForm } from 'redux-form';
import validate, {required} from './validateCreateShareableWizard';

import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';

import ReduxFormHTMLInput from '../../reduxFormInputs/ReduxFormHTMLInput';
import ReduxFormTextArea from '../../reduxFormInputs/ReduxFormTextArea';


const ShareableCreateStart = (props) => (
  <Panel id="shareable-create-start-panel">
  <form id="shareable-create-start" >
    <Field id="headline-input" name="headline" type="text" component={ReduxFormHTMLInput} validate={required} label="Headline"/>
    <Field id="summary-input" name="summary" type="textarea" component={ReduxFormTextArea}  validate={required} label="Summary"/>
    <div className="wizard-navigation-buttons">
      <Button type="button" onClick={props.nextPage} className="next">Next</Button>
    </div>
  </form>
  </Panel>
);

ShareableCreateStart.propTypes = {
  handleSubmit: PropTypes.func
};

export default reduxForm({
  form: 'wizard',                 // <------ same form name
  destroyOnUnmount: false,        // <------ preserve form data
  forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
  validate,
  initialValues: {
    time_calendar: [],
    space_map: {
      latitude: 40.689613,
      longitude:  -73.99243,
      canonical_address: ''
    }},
})(ShareableCreateStart);
