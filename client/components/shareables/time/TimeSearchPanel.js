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
                        <Field name="search_day"
               component={props =>
                 <ReduxFormComponentField
                   meta={props.meta}
                   label="Date ">
                   <DatePicker
                     value={props.input.value}
                     onChange={props.input.onChange} />
                 </ReduxFormComponentField>} />

        <h2> What time would you like to go start </h2>
           <Field name="search_time_start"
               component={props =>
                 <ReduxFormComponentField
                   meta={props.meta}
                   label="Date ">
                   <DatePicker
                     value={props.input.value}
                     onChange={props.input.onChange} />
                 </ReduxFormComponentField>} />

        <h2> What time would you like to go end </h2>
           <Field name="search_time_end"
               component={props =>
                 <ReduxFormComponentField
                   meta={props.meta}
                   label="Date ">
                   <DatePicker
                     value={props.input.value}
                     onChange={props.input.onChange} />
                 </ReduxFormComponentField>} />

      </div>
    )
  }
}
export default TimeSearchPanel;
/*

        <h2> What time would you like to go </h2>
        <Field name="time_search"
               component={props =>
                 <ReduxFormComponentField>
                   meta={props.meta}
                   label="Time" >
                   <TimePicker
                     value={props.input.value}
                     onChange={props.input.onChange}
                     onBlur={() => props.input.onBlur(props.input.value)} />
                 </ReduxFormComponentField>} />


 */
