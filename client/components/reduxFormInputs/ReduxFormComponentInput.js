
import React, {PropTypes} from 'react';

import Select, {Creatable} from 'react-select';
import MapWithGeocoderInput from '../space/MapWithGeocoderInput';
import CalendarInputField from '../time/CalendarInputField';


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


export const RenderMapField = (props) => {
  const {label, meta: {touched, error}} = props;
  return (
    <FormGroup validationState={touched && error ? 'error' : null}>
      <ControlLabel>{label}</ControlLabel>
      <MapWithGeocoderInput {...props} />
      <FormControl.Feedback />
      <HelpBlock>{error}</HelpBlock>
    </FormGroup>
  );
};

export const RenderCalendarField = (props) => {
  const {label, meta: {touched, error}} = props;
  debugger;
  return (
    <FormGroup validationState={touched && error ? 'error' : null}>
      <ControlLabel>{label}</ControlLabel>
      <CalendarInputField {...props} />
      <FormControl.Feedback />
      <HelpBlock>{error}</HelpBlock>
    </FormGroup>
  );
};



RenderSelectField.propTypes = {
  label: PropTypes.string,
  meta: PropTypes.object
};

RenderCreatableField.propTypes = {
  label: PropTypes.string,
  meta: PropTypes.object
};

RenderCreatableField.propTypes = {
  label: PropTypes.string,
  meta: PropTypes.object,
  type: PropTypes.string
};


/*
 (12:30:15 PM) samsch: roadrunneratwast, Since you are passing the full props to the wrapped components, your generic function can render everything but instead of either of the selected components, render {this.props.children}. Then you can create two new functions which render just the single generic (passing app props), and one of the components as a child.
 */
