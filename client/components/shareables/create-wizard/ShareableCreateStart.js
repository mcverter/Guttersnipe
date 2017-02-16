import React, {PropTypes} from 'react';

import { Field, reduxForm } from 'redux-form';
import validate, {required} from './validateCreateShareableWizard';

import Button from 'react-bootstrap/lib/Button';
import ReduxFormHTMLInput from '../../reduxFormInputs/ReduxFormHTMLInput';


const ShareableCreateStart = ({handleSubmit}) => (
  <form onSubmit={handleSubmit}>
    <Field name="headline" type="text" component={ReduxFormHTMLInput} validate={required} label="Headline"/>
    <Field name="summary" type="textarea" component={ReduxFormHTMLInput}  validate={required} label="Summary"/>
    <div>
      <Button type="submit" className="next">Next</Button>
    </div>
  </form>
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
