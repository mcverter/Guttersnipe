import React, {PropTypes} from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormControl';
import Select, {Creatable} from 'react-select'

export const RenderSelectField = (props) => {
 return (
   <div> 
    <label>{label}</label>
    <div>
   <Select {...props} /> 
    {touched && error && <div color="red" ><strong> {error}</strong></div>}

   </div>
   </div>
 )
}

export const RenderCreatableField = (props) => {
 return (
   <div> 
    <label>{label}</label>
    <div>
   <Creatable {...props} /> 
    {touched && error && <div color="red" ><strong> {error}</strong></div>}
   </div>
   </div>
 )
}


export const RenderBSTextField = ( { input, label, type, meta: { touched, error } } ) =>
     (
   <div>
     <h2><label>{label}</label></h2>
       <FormControl {...input} placeholder={label} type={type} />
       {touched && error && <div color="red" ><strong> {error}</strong></div>}
   </div>
     )

RenderSelectField.propTypes = {
                                  value: PropTypes.any,
                                onChange: PropTypes.func,
                                onBlur: PropTypes.array,
                                options: PropTypes.array,
                                placeholder: PropTypes.string,
                                simpleValue: PropTypes.bool,
                                label: PropTypes.string

}

RenderBSTextField.propTypes = {
     input: PropTypes.object,
    label:PropTypes.string,
    type: PropTypes.string,
    meta: PropTypes.object
};