import React, {PropTypes} from 'react';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

renderField.propTypes = {
     input: PropTypes.object,
    label:PropTypes.string,
    type: PropTypes.string,
    meta: PropTypes.object
};

export default renderField;