import React, {PropTypes, Component} from 'react';

import { Field, reduxForm , formValueSelector} from 'redux-form';
import validate, {required} from './validateCreateShareableWizard';

import ReduxFormHTMLInput from '../../reduxFormInputs/ReduxFormHTMLInput';
import ReduxFormTextArea from '../../reduxFormInputs/ReduxFormTextArea';
import ReduxFormComponentField from '../../reduxFormInputs/ReduxFormComponentField';
import _ from 'lodash';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import Select, {Creatable} from 'react-select';
import {fetchShareableCategorizations} from '../../../actions/shareables/shareableActions';
import {connect} from 'react-redux';
import ThingEdit from '../thing/ThingEdit';

class ThingCreate extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Panel className="thing-create-panel">
        <ThingEdit {...this.props} />
        <div className="wizard-navigation-buttons">
          <Button type="button" className="previous" onClick={this.props.previousPage}>Previous</Button>
          <Button type="button" onClick={this.props.nextPage} className="next">Next</Button>
        </div>
      </Panel>
    );
  }
}

ThingCreate.propTypes = {
  nextPage: PropTypes.func,
  previousPage: PropTypes.func
};


export default ThingCreate;
