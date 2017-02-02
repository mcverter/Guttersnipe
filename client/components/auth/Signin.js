import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import ReduxFormHTMLInput from '../../reduxFormInputs/ReduxFormHTMLInput';
import Button from 'react-bootstrap/lib/Button';

import {signInUser} from '../../actions/auth/authActions';

class Signin extends Component {
  handleSubmit({email, password}) {
    this.props.signInUser({email, password})
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
      <form onSubmit={handleSubmit}>
        <Field name="email" type="text" component={ReduxFormHTMLInput} label="Email"/>
        <Field name="password" type="password" component={ReduxFormHTMLInput} label="Password"/>
        <div>
          <Button type="submit" className="next">Sign In</Button>
        </div>
      {this.renderAlert()}

      </form>
    )
  }
}

function mapStateToProps(state) {
  return {errorMessage: state.auth.error}
}

function validate(formProps) {
    const errors = {};
    return errors;
}



export default connect(mapStateToProps, signInUser)(
  reduxForm({
    form: 'signin',
    destroyOnUnmount: false,        // <------ preserve form data
    forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
    validate
  })(Signin))
