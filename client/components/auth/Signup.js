/**
 * Created by mitchell on 2/2/17.
 */


import React, {Component, PropTypes} from 'react';
import {reduxForm, Field} from 'redux-form';
import ReduxFormHTMLInput from '../../components/reduxFormInputs/ReduxFormHTMLInput';
import Button from 'react-bootstrap/lib/Button';
import {connect} from 'react-redux';

import {signUpUser} from '../../actions/auth/authActions';

class Signup extends Component {
  handleSubmit({email, password}) {
    this.props.signUpUser({email, password});
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <Field name="email" type="text" component={ReduxFormHTMLInput} label="Email"/>
        <Field name="password" type="password" component={ReduxFormHTMLInput} label="Password"/>
        <Field name="confirmPassword" type="password" component={ReduxFormHTMLInput} label="Confirm Password"/>
        {this.renderAlert()}
        <div>
          <Button type="submit" className="next">Sign Up</Button>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {errorMessage: state.auth.error};
}

function validate(formProps) {
    const errors = {};
    return errors;
}

Signup.propTypes = {
  signUpUser: PropTypes.func,
  errorMessage: PropTypes.string
};


export default connect(mapStateToProps, signUpUser)(
  reduxForm({
    form: 'signup',
    destroyOnUnmount: false,        // <------ preserve form data
    forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
    validate
  })(Signup));
