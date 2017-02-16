import React, {PropTypes, Component} from "react";
import {Link} from "react-router";
import Button from "react-bootstrap/lib/Button";
import { connect } from 'react-redux'
import SpaceSearchPanel from '../../shareables/space/SpaceSearchPanel'
import TimeSearchPanel from '../../shareables/time/TimeSearchPanel'
import ThingSearchPanel from '../../shareables/thing/ThingSearchPanel'
import { Field, reduxForm } from 'redux-form';

class ShareablesSearchPage extends Component {

  render() {
    return (
      <div>
        <TimeSearchPanel />
        <SpaceSearchPanel />
        <ThingSearchPanel />
        <Button>Search</Button>

      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    initialValues: {
      space_map: {
        currentPostion: state.browserEnv.location,
        latitude: state.browserEnv.latitude,
        longitude: state.browserEnv.longitude
      }
    }
  }
}

/*

{
state.browserEnv
  "location": [
    18.135228,
    -97.0901879
  ],
  "latitude": 18.135228,
  "longitude": -97.0901879
}
 */
/*const mapDispatchToProps = (dispatch) => {
 return {
 signInUser: (username, password) => {
 dispatch(signInUser(username, password));
 }
 };
 };
 */
function validate(formProps) {
  console.log('form props', formProps);
  const errors = {};
  return errors;
}

export default connect(mapStateToProps)(
  reduxForm({
    form: 'shareableSearch',
    destroyOnUnmount: false,        // <------ preserve form data
    forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
    validate
  })(ShareablesSearchPage));
