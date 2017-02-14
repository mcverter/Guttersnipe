import React, {PropTypes, Component} from "react";
import {Link} from "react-router";
import { connect } from 'react-redux'
import { DatePicker }from 'react-bootstrap-date-picker'
class TimeSearchPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: new Date().toISOString()
    }
  }
  /*
  getInitialState(){
    var value = new Date().toISOString();
    return {
      value: value
    }
  }*/
  handleChange() {
    this.setState({
      value: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
      formattedValue: formattedValue // Formatted String, ex: "11/19/2016"
    });
  }
  componentDidUpdate(){
    // Access ISO String and formatted values from the DOM.
    var hiddenInputElement = document.getElementById("example-datepicker");
    console.log(hiddenInputElement.value); // ISO String, ex: "2016-11-19T12:00:00.000Z"
    console.log(hiddenInputElement.getAttribute('data-formattedvalue')) // Formatted String, ex: "11/19/2016"
  }

  render() {
    return (
      <div>
        <h2> What day would you like to go </h2>
      <DatePicker id="example-datepicker" value={this.state.value} onChange={this.handleChange} />
        <h2> What time would you like to go </h2>
      </div>
    )
  }
}
export default TimeSearchPanel;
