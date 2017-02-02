import React, {PropTypes} from 'react';

import { Field, reduxForm } from 'redux-form';
import validate from './validateCreateShareableWizard';

import ReduxFormHTMLInput from '../../reduxFormInputs/ReduxFormHTMLInput';
import Button from 'react-bootstrap/lib/Button';

const ShareableCreateEnd = ({handleSubmit, previousPage}) => (
  <form onSubmit={handleSubmit}>
    <Field name="shareable_notes" type="text" component={ReduxFormHTMLInput} label="Additional Notes"/>
    <div>
      <Button type="button" className="previous" onClick={previousPage}>Previous</Button>
      <Button type="button" className="next" onClick={handleSubmit}>Create New Shareable</Button>
    </div>

  </form>
);

ShareableCreateEnd.propTypes = {
  handleSubmit: PropTypes.func,
  previousPage: PropTypes.func
};

export default reduxForm({
  form: 'wizard',                 // <------ same form name
  destroyOnUnmount: false,        // <------ preserve form data
  forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
  validate
})(ShareableCreateEnd);
