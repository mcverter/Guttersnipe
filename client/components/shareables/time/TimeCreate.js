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

import TimeEdit from './TimeEdit';


class TimeCreate extends Component {
  render() {
    return(
      <Panel className="time-create-panel">
        <TimeEdit {...this.props} />
        <div className="wizard-navigation-buttons">
          <Button type="button" className="previous" onClick={this.props.previousPage}>Previous</Button>
          <Button type="button" onClick={this.props.nextPage} className="next">Next</Button>
        </div>

      </Panel>
    );
  }
}

TimeCreate.propTypes = {
  previousPage: PropTypes.func,
  nextPage: PropTypes.func
};


export default TimeCreate;


