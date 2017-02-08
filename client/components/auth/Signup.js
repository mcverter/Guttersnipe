

import React, {Component, PropTypes} from 'react';
import {reduxForm, Field} from 'redux-form';
import ReduxFormHTMLInput from '../../components/reduxFormInputs/ReduxFormHTMLInput';
import Button from 'react-bootstrap/lib/Button';
import {connect} from 'react-redux';
import {signUpUser} from '../../actions/auth/authActions';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }
  handleFormSubmit({email, password}) {
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
    const {handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <Field name="email" type="text" component={ReduxFormHTMLInput} label="Email"/>
        <Field name="password" type="password" component={ReduxFormHTMLInput} label="Password"/>
        <Field name="confirmPassword" type="password" component={ReduxFormHTMLInput} label="Confirm Password"/>
        <div>
          <Button type="submit" >Sign Up</Button>
        </div>
        {this.renderAlert()}
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {errorMessage: state.auth.error};
}
const mapDispatchToProps = (dispatch) => {
  return {
    signUpUser: (username, password) => {
      dispatch(signUpUser(username, password));
    }
  };
};


function validate(formProps) {
    const errors = {};
    return errors;
}

Signup.propTypes = {
  signUpUser: PropTypes.func,
  errorMessage: PropTypes.string
};



export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: 'signup',
    destroyOnUnmount: false,        // <------ preserve form data
    forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
    validate
  })(Signup));
