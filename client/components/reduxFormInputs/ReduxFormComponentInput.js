import React, {PropTypes} from 'react';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';


export const ReduxFormComponentField = (props) => {
  const {label, meta: {touched, error}} = props;
  return (
    <FormGroup validationState={touched && error ? 'error' : null}>
      <ControlLabel>{label}</ControlLabel>
        {props.children}
      <HelpBlock>{error}</HelpBlock>
    </FormGroup>
  )
};

ReduxFormComponentField.propTypes = {
  label: PropTypes.string,
  meta: PropTypes.object,
  children: React.PropTypes.element.isRequired
};


export default ReduxFormComponentField;

/*
 (12:30:15 PM) samsch: roadrunneratwast, Since you are passing the full props to the wrapped components, your generic function can render everything but instead of either of the selected components, render {this.props.children}. Then you can create two new functions which render just the single generic (passing app props), and one of the components as a child.
 */
