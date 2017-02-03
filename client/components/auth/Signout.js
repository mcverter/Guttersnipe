import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {signOutUser} from '../../actions/auth/authActions';

class Signout extends Component {
  componentWillMount() {
    this.props.signOutUser();
  }

  render() {
    return <div>You are signed out</div>;
  }
}

Signout.propTypes = {
  signOutUser: PropTypes.func
};


export default connect(null, signOutUser)(Signout);
