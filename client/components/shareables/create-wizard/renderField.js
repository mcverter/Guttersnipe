import React, {PropTypes} from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

import Select, {Creatable} from 'react-select'


export const RenderSelectField = (props) => {
const { input, label, type, meta} = props;
const touched = '';
const error = '';
if (meta) {
const {touched, error } = meta;
}
console.log(props)
debugger;
 return (
 <div>
     <FormGroup validationState={touched && error ? 'error' : null }>
      <ControlLabel>{label}</ControlLabel>
   <Select {...props} />
      <FormControl.Feedback />
       <HelpBlock>{error}</HelpBlock>
       </FormGroup>

   <div>
    <label>{label}</label>
    <div>
   <Select {...props} />
    {touched && error && <div color="red" ><strong> {error}</strong></div>}

   </div>
   </div>
   </div>
 )
}

export const RenderCreatableField = (props) => {
 return (
   <div>
    <label>{props.label}</label>
    <div>
   <Creatable {...props} />
    {props.touched && props.error && <div color="red" ><strong> {props.error}</strong></div>}
   </div>
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

