import React, {PropTypes, Component} from 'react';

import { Field, reduxForm, formValueSelector} from 'redux-form';
import validate, {required} from '../create-wizard/validateCreateShareableWizard';
import ReduxFormComponentField from '../../reduxFormInputs/ReduxFormComponentField';
import MapWithGeocoderInput from './MapWithGeocoderInput';

import ReduxFormHTMLInput from '../../reduxFormInputs/ReduxFormHTMLInput';
import Button from 'react-bootstrap/lib/Button';
import {connect} from 'react-redux';

let SpaceCreate = (props) => {
  return (
    <div> Create a Map for your {props.headline}
      <form onSubmit={props.handleSubmit}>
        <Field name="space_map"
               validate={required}
               component={props =>
                 <ReduxFormComponentField
                   meta={props.meta}
                   label="Location of Shareable">
                   <MapWithGeocoderInput
                     currentPosition={props.currentPosition}
                     formInput={props.input}
                   />
                 </ReduxFormComponentField>}/>

        <Field name="space_notes" type="text" component={ReduxFormHTMLInput} label="Additional Notes"/>

        <div>
          <Button type="button" className="previous" onClick={props.previousPage}>Previous</Button>
          <Button type="submit" className="next">Next</Button>
        </div>
      </form>
    </div>
  );
};

SpaceCreate.propTypes = {
  handleSubmit: PropTypes.func,
  previousPage: PropTypes.func,
  onChange: PropTypes.func,
  meta: PropTypes.object,
  headline: PropTypes.string
};

const selector = formValueSelector('wizard'); // <-- same as form name
SpaceCreate = connect(
  state => {
    return {
      headline: selector(state, 'headline')
    };
  }
)(SpaceCreate);

export default reduxForm({
  form: 'wizard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(SpaceCreate);
