import React, {PropTypes} from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Select, {Creatable} from 'react-select'


export const RenderSelectField = (props) => {
  debugger;

  const { label, meta: { touched, error } }  = props;
  return (
    <div>
      <FormGroup validationState={touched && error ? 'error' : null }>
        <ControlLabel>{label}</ControlLabel>
        <Select {...props} />
        <FormControl.Feedback />
        <HelpBlock>{error}</HelpBlock>
      </FormGroup>

    </div>
  )
}

export const RenderCreatableField = (props) => {
  const { label, meta: { touched, error } }  = props;

  return (
    <div>
      <FormGroup validationState={touched && error ? 'error' : null }>
        <ControlLabel>{label}</ControlLabel>
        <Creatable {...props} />
        <FormControl.Feedback />
        <HelpBlock>{error}</HelpBlock>
      </FormGroup>
    </div>
  )
}


export const RenderBSTextField = ( { input, label, type, meta: { touched, error } } ) =>
  (
    <FormGroup validationState={touched && error ? 'error' : null }>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...input} placeholder={label} type={type}  />
      <FormControl.Feedback />
      <HelpBlock>{error}</HelpBlock>
    </FormGroup>
  )


export const RenderMapField = (props) => {

}
