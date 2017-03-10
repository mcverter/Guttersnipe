import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {signOutUser} from '../../actions/auth/authActions';
import Panel from 'react-bootstrap/lib/Panel';

class Signout extends Component {
  componentWillMount() {
    this.props.signOutUser();
  }

   render() {
    return (
      <Panel id="signout-panel">
      <div id="signout">You are signed out</div>
      </Panel>
   )
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
