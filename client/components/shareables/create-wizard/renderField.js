import React, {PropTypes} from 'react';

import Select, {Creatable} from 'react-select';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';


export const RenderSelectField = (props) => {
  const {label, meta: {touched, error}} = props;
  return (
    <FormGroup validationState={touched && error ? 'error' : null}>
      <ControlLabel>{label}</ControlLabel>
      <Select {...props} />
      <FormControl.Feedback />
      <HelpBlock>{error}</HelpBlock>
    </FormGroup>
  );
};

export const RenderCreatableField = (props) => {
  const {label, meta: {touched, error}} = props;
  return (
    <FormGroup validationState={touched && error ? 'error' : null}>
      <ControlLabel>{label}</ControlLabel>
      <Creatable {...props} />
      <FormControl.Feedback />
      <HelpBlock>{error}</HelpBlock>
    </FormGroup>
  );
};

export const RenderBSTextField = ( { input, label, type, meta: { touched, error } } ) =>  (
  <FormGroup validationState={touched && error ? 'error' : null}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl {...input} placeholder={label} type={type}  />
    <FormControl.Feedback />
    <HelpBlock>{error}</HelpBlock>
  </FormGroup>
);

export const RenderMapField = (props) => {};
