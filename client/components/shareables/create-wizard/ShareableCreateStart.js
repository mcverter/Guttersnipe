import React, {PropTypes} from 'react';

import { Field, reduxForm } from 'redux-form';
import validate, {required} from './validateCreateShareableWizard';

import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';

import ReduxFormHTMLInput from '../../reduxFormInputs/ReduxFormHTMLInput';

const ShareableCreateStart = ({handleSubmit}) => (
  <Panel className="shareable-create-start-panel">
  <form className="shareable-create-start" onSubmit={handleSubmit}>
    <Field name="headline" type="text" component={ReduxFormHTMLInput} validate={required} label="Headline"/>
    <Field name="summary" type="textarea" component={ReduxFormHTMLInput}  validate={required} label="Summary"/>
    <div>
      <Button type="submit" className="next">Next</Button>
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
