import React, {PropTypes} from 'react';

// Redux-Form
import { Field, reduxForm } from 'redux-form';
import validate, {required} from '../create-wizard/validateCreateShareableWizard';

import ReduxFormHTMLInput from '../../reduxFormInputs/ReduxFormHTMLInput';
import ReduxFormComponentField from '../../reduxFormInputs/ReduxFormComponentField';

import CalendarInputField from './CalendarInputField';
import Button from 'react-bootstrap/lib/Button';


const TimeCreate = ({handleSubmit, previousPage, headline}) => (
  <form onSubmit={handleSubmit}>
    <Field name="time_calendar"
           validate={required}
           component={props =>
             <ReduxFormComponentField
               meta={props.meta}
               label="Schedule of Shareable" >
               <CalendarInputField
                 headline={headline}
                 input={props.input}
                 onChange={props.onChange} />
             </ReduxFormComponentField>} />

    <Field name="time_notes" type="text" component={ReduxFormHTMLInput} label="Additional Notes"/>
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
