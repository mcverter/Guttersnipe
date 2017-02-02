import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signOutUser} from '../../actions/auth/authActions';

class Signout extends Component {
  componentWillMount() {
    this.props.signOutUser();
  }

  render() {
    return <div>You are signed out</div>
  }
}

export default connect(null, signOutUser)(Signout)
