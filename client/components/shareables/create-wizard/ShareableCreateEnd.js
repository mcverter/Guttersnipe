import React, {PropTypes} from 'react';

import { Field, reduxForm } from 'redux-form';
import validate from './validateCreateShareableWizard';

import {RenderBSTextField} from './renderField';
import Button from 'react-bootstrap/lib/Button';

const ShareableCreateEnd = ({handleSubmit}) => (
  <form onSubmit={handleSubmit}>
    <Field name="shareable_notes" type="text" component={RenderBSTextField} label="Additional Notes"/>
    <div>
      <Button type="submit" className="next">Next</Button>
    </div>
  </form>
);

ShareableCreateEnd.propTypes = {
  handleSubmit: PropTypes.func
};

export default reduxForm({
  form: 'wizard',                 // <------ same form name
  destroyOnUnmount: false,        // <------ preserve form data
  forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
  validate
})(ShareableCreateEnd);
