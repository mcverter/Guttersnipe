import React, {PropTypes, Component} from "react";
import {Link} from "react-router";
import { connect } from 'react-redux'
import { Field} from 'redux-form';
import ReduxFormComponentField from '../../reduxFormInputs/ReduxFormComponentField';
import 'bootstrap/dist/css/bootstrap.css';
import Button from "react-bootstrap/lib/Button";
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css'

const TimeSearchPanel = (props) => {
  return (
    <div>
      <h2> When would you like to go </h2>
      <Field name="time_input"
             component={props =>
               <ReduxFormComponentField
                 meta={props.meta}
                 label="Date ">
                 <DateTime
                   value={props.input.value}
                   onChange={props.input.onChange} />
               </ReduxFormComponentField>} />
    </div>
  );
}
export default TimeSearchPanel;
