import React, {PropTypes, Component} from "react";
import {Link} from "react-router";
import { connect } from 'react-redux'
import DatePicker from 'react-bootstrap-date-picker'
import { Field} from 'redux-form';
import ReduxFormComponentField from '../../reduxFormInputs/ReduxFormComponentField';
import TimePicker from 'react-bootstrap-time-picker';


class TimeSearchPanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2> What day would you like to go </h2>
        <Field name="date_search"
               component={props =>
                 <ReduxFormComponentField
                   meta={props.meta}
                   label="Date" >
                   <DatePicker />
                 </ReduxFormComponentField>} />

        <h2> What time would you like to go </h2>
        <Field name="date_search"
               component={props =>
                 <ReduxFormComponentField
                   meta={props.meta}
                   label="Time" >
                   <TimePicker  />
                 </ReduxFormComponentField>} />


      </div>
    )
  }
}
export default TimeSearchPanel;
/*
   <DatePicker id="example-datepicker" value={this.state.value} onChange={this.handleChange} />

 */
