import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {signOutUser} from '../../actions/auth/authActions';

class Signout extends Component {
  componentWillMount() {
    this.props.signOutUser();
  }

  static render() {
    return <div className="signout">You are signed out</div>;
  }
}

Signout.propTypes = {
  signOutUser: PropTypes.func
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOutUser: () => {
      dispatch(signOutUser());
    }
  };
};

export default connect(null, mapDispatchToProps)(Signout);
