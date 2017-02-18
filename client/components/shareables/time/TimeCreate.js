import React, {PropTypes, Component} from 'react';

// Redux-Form
import { Field, reduxForm, formValueSelector} from 'redux-form';
import validate, {required} from '../create-wizard/validateCreateShareableWizard';

import ReduxFormHTMLInput from '../../reduxFormInputs/ReduxFormHTMLInput';
import ReduxFormComponentField from '../../reduxFormInputs/ReduxFormComponentField';

import CalendarInputField from './CalendarInputField';
import Button from 'react-bootstrap/lib/Button';
import {connect} from 'react-redux';


class TimeCreate extends Component {
  render() {
        return(
      <form onSubmit={this.props.handleSubmit}>
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
        <div>
          <Button type="button" className="previous" onClick={this.props.previousPage}>Previous</Button>
          <Button type="submit" className="next">Next</Button>
        </div>
      </form>
    );
  }
}

TimeCreate.propTypes = {
  previousPage: PropTypes.func,
  onChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  headline: PropTypes.string
};

const selector = formValueSelector('wizard'); // <-- same as form name
TimeCreate = connect(
  state => {
    // can select values individually
    const headline = selector(state, 'headline')
    return {
      headline
    }
  }
)(TimeCreate);


export default reduxForm({
  form: 'wizard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(TimeCreate);


