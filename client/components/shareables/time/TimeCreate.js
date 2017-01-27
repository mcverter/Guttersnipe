import React, {PropTypes} from 'react';

// Redux-Form
import { Field, reduxForm } from 'redux-form';
import validate, {required} from '../create-wizard/validateCreateShareableWizard';

import CalendarInputField from './CalendarInputField';
import {RenderBSTextField} from '../create-wizard/renderField';
import Button from 'react-bootstrap/lib/Button';


const TimeCreate = ({handleSubmit, previousPage, headline}) => (
  <form onSubmit={handleSubmit}>
    <Field validate={required} name="time_calendar" component={CalendarInputField} props={{headline: headline}} />
    <Field name="time_notes" type="text" component={RenderBSTextField} label="Additional Notes"/>
    <div>
      <Button type="button" className="previous" onClick={previousPage}>Previous</Button>
      <Button type="submit" className="next">Next</Button>
    </div>
  </form>
);

TimeCreate.propTypes = {
  handleSubmit: PropTypes.func,
  headline: PropTypes.string
};

export default reduxForm({
  form: 'wizard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(TimeCreate);
