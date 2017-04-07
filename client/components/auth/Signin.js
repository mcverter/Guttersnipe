import React, {Component, PropTypes} from 'react';
import {Field, reduxForm} from 'redux-form';

import ReduxFormHTMLInput from '../reduxFormInputs/ReduxFormHTMLInput';
import Button from 'react-bootstrap/lib/Button';
import {connect} from 'react-redux';

import {signInUser} from '../../actions/auth/authActions';
import Panel from 'react-bootstrap/lib/Panel';

const Signin = (props) => {
  const {handleSubmit} = props;

  const handleFormSubmit = ({email, password}) => {
    props.signInUser({email, password});
  };

  const renderAlert = () => {
    if (props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {props.errorMessage}
        </div>
      );
    }
  };

  return (
    <Panel id="signin-panel">
    <form id="signin-form"  onSubmit={handleSubmit(handleFormSubmit)}>
      <Field name="email" type="text" component={ReduxFormHTMLInput} label="Email"/>
      <Field name="password" type="password" component={ReduxFormHTMLInput} label="Password"/>
      <div>
        <Button type="submit">Sign In</Button>
      </div>
      {renderAlert()}
    </form>
    </Panel>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    signInUser: (username, password) => {
      dispatch(signInUser(username, password));
    }
  };
};

function mapStateToProps(state) {
  return {errorMessage: state.auth.error};
}

function validate(formProps) {
  const errors = {};
  return errors;
}

Signin.propTypes = {
  signInUser: PropTypes.func,
  errorMessage: PropTypes.string,
  handleSubmit: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: 'signin',
    destroyOnUnmount: false,        // <------ preserve form data
    forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
    validate
  })(Signin));
