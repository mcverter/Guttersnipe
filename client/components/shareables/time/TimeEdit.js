import React, {PropTypes, Component} from 'react';

// Redux-Form
import { Field, reduxForm, formValueSelector} from 'redux-form';
import validate, {required} from '../create-wizard/validateCreateShareableWizard';

import ReduxFormHTMLInput from '../../reduxFormInputs/ReduxFormHTMLInput';
import ReduxFormComponentField from '../../reduxFormInputs/ReduxFormComponentField';

import CalendarInputField from './CalendarInputField';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import {connect} from 'react-redux';


class TimeEdit extends Component {
  render() {
    return(
      <Panel className="time-create-panel">
        <form className="time-create-form" onSubmit={this.props.handleSubmit}>
          <h2> Create a Schedule for {this.props.headline} </h2>
          <Field name="time_calendar"
                 validate={required}
                 component={props =>
                   <ReduxFormComponentField
                     meta={props.meta}
                     label="Schedule of Shareable" >
                     <CalendarInputField
                       headline={this.props.headline}
                       formInput={props.input}
                     />
                   </ReduxFormComponentField>} />

          <Field name="time_notes" type="text" component={ReduxFormHTMLInput} label="Additional Notes"/>
        </form>
      </Panel>
    );
  }
}

TimeEdit.propTypes = {
  previousPage: PropTypes.func,
  onChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  headline: PropTypes.string
};

const selector = formValueSelector('wizard'); // <-- same as form name
TimeEdit = connect(
  state => {
    // can select values individually
    const headline = selector(state, 'headline');
    return {
      headline
    }
  }
)(TimeEdit);


export default reduxForm({
  form: 'wizard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(TimeEdit);


