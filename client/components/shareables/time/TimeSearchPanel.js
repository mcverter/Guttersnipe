import React, {PropTypes, Component} from "react";
import {Link} from "react-router";
import { connect } from 'react-redux'
import { Field} from 'redux-form';
import ReduxFormComponentField from '../../reduxFormInputs/ReduxFormComponentField';
import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import Button from "react-bootstrap/lib/Button";


class TimeSearchPanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const startTime='2017-02-02T08:42:27'
    const endTime= '2017-02-17T08:42:27'

    return (

      <div>
        <h2> What day would you like to go </h2>
        <Field name="time_range"
               component={props =>
                 <ReduxFormComponentField
                   meta={props.meta}
                   label="Date ">

                   <h2> Hi my name is input props value </h2>
                   <h2> {props.input.value} </h2>
                   <DatetimeRangePicker
                     timePicker
                     showDropdowns
                          value={props.input.value}
                     onChange={props.input.onChange}

                      >
                     <input type="text"
                            />

                   </DatetimeRangePicker>
                 </ReduxFormComponentField>} />



      </div>
    )
  }
}
export default TimeSearchPanel;
/*
 <h2> What time would you like to go start </h2>
 <Field name="search_time_start"
 component={props =>
 <ReduxFormComponentField
 meta={props.meta}
 label="Date ">
 <TimePicker
 value={props.input.value}
 onChange={props.input.onChange} />
 </ReduxFormComponentField>} />

 <h2> What time would you like to go end </h2>
 <Field name="search_time_end"
 component={props =>
 <ReduxFormComponentField
 meta={props.meta}
 label="Date ">
 <TimePicker
 value={props.input.value}
 onChange={props.input.onChange} />
 </ReduxFormComponentField>} />



        <div>
          <DatetimeRangePicker>
          </DatetimeRangePicker>

          <DatetimeRangePicker>
            <Button>
              <i className="fa fa-calendar"/> &nbsp;
              <span>"foo"</span>
              <i className="fa fa-angle-down"/>
            </Button>
          </DatetimeRangePicker>
        </div>
        <div>
          Hi My name is date time picker
          <DatetimeRangePicker />
        </div>


 */
