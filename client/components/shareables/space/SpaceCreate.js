import React, {PropTypes} from 'react';

import { Field, reduxForm } from 'redux-form';
import validate, {required} from '../create-wizard/validateCreateShareableWizard';
import ReduxFormComponentField from '../../reduxFormInputs/ReduxFormComponentInput';
import MapWithGeocoderInput from './MapWithGeocoderInput';

import ReduxFormHTMLInput from '../../reduxFormInputs/ReduxFormHTMLInput';
import Button from 'react-bootstrap/lib/Button';


const SpaceCreate = ({ handleSubmit, previousPage, currentPosition }) => (
  <div> Create a Map for your resource
    <form onSubmit={handleSubmit}>
      <Field name="time_calendar"
             validate={required}
             component={props =>
               <ReduxFormComponentField
                 meta={props.meta}
                 label="Location of Shareable" >
                 <MapWithGeocoderInput
                   currentPosition={currentPosition}
                   input={props.input}
                   onChange={props.onChange}
                 />
               </ReduxFormComponentField>} />

      <Field name="space_notes" type="text" component={ReduxFormHTMLInput} label="Additional Notes"/>

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
