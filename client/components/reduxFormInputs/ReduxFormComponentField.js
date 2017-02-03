import React, {PropTypes} from 'react';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';


const ReduxFormComponentField = (props) => {
  const {label, meta: {touched, error}} = props;
  return (
    <FormGroup validationState={touched && error ? 'error' : null}>
      <ControlLabel>{label}</ControlLabel>
        {props.children}
      <HelpBlock>{error}</HelpBlock>
    </FormGroup>
  );
};

ReduxFormComponentField.propTypes = {
  label: PropTypes.string,
  meta: PropTypes.object,
  children: React.PropTypes.element.isRequired
};


export default ReduxFormComponentField;

