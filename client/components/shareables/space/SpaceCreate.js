import React, {PropTypes} from 'react';

import { Field, reduxForm } from 'redux-form';
import validate, {required} from '../create-wizard/validateCreateShareableWizard';

import {RenderBSTextField, RenderMapField} from '../create-wizard/renderField';
import Button from 'react-bootstrap/lib/Button';


const SpaceCreate = ({ handleSubmit, previousPage, currentPosition }) => (
  <div> Create a Map for your resource
    <form onSubmit={handleSubmit}>
      <Field name="space_map" validate={required} component={RenderMapField} label="Location of Shareable" currentPosition={currentPosition} />
      <Field name="space_notes" type="text" component={RenderBSTextField} label="Additional Notes"/>

      <div>
        <Button type="button" className="previous" onClick={previousPage}>Previous</Button>
        <Button type="submit" className="next">Next</Button>
      </div>
    </form>
  </div>
);

SpaceCreate.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'wizard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(SpaceCreate);
