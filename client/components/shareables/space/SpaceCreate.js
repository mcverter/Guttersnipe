import React, {PropTypes, Component} from 'react';

import { Field, reduxForm, formValueSelector} from 'redux-form';
import validate, {required} from '../create-wizard/validateCreateShareableWizard';
import ReduxFormComponentField from '../../reduxFormInputs/ReduxFormComponentField';
import MapWithGeocoderInput from './MapWithGeocoderInput';

import ReduxFormHTMLInput from '../../reduxFormInputs/ReduxFormHTMLInput';
import Button from 'react-bootstrap/lib/Button';
import {connect} from 'react-redux';


class SpaceCreate extends Component {
  render()
  {
    return (
      <div> Create a Map for your {this.props.headline}
        <form onSubmit={this.props.handleSubmit}>
          <Field name="time_calendar"
                 validate={required}
                 component={props =>
                   <ReduxFormComponentField
                     meta={props.meta}
                     label="Location of Shareable">
                     <MapWithGeocoderInput
                       currentPosition={props.currentPosition}
                       input={props.input}
                       onChange={props.onChange}
                     />
                   </ReduxFormComponentField>}/>

          <Field name="space_notes" type="text" component={ReduxFormHTMLInput} label="Additional Notes"/>

          <div>
            <Button type="button" className="previous" onClick={this.props.previousPage}>Previous</Button>
            <Button type="submit" className="next">Next</Button>
          </div>
        </form>
      </div>
    );
  }
}

SpaceCreate.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  meta: PropTypes.object,
};

const selector = formValueSelector('wizard') // <-- same as form name
SpaceCreate = connect(
  state => {
    // can select values individually
    const headline = selector(state, 'headline')
    return {
      headline
    }
  }
)(SpaceCreate);


export default reduxForm({
  form: 'wizard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(SpaceCreate);
