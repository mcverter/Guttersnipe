import React, {PropTypes, Component} from "react";
import {Link} from "react-router";
import Button from "react-bootstrap/lib/Button";
import { connect } from 'react-redux'
import SpaceSearchPanel from '../../shareables/space/SpaceSearchPanel'
import TimeSearchPanel from '../../shareables/time/TimeSearchPanel'
import ThingSearchPanel from '../../shareables/thing/ThingSearchPanel'
import { Field, reduxForm } from 'redux-form';
import {searchShareables} from '../../../actions/shareables/shareableActions';

class ShareablesSearchPage extends Component {

  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  handleFormSubmit(values) {
    console.log('values are', values);
    debugger;
    this.props.searchShareables(values);
  }

  render() {
    const {handleSubmit} = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <TimeSearchPanel />
          <SpaceSearchPanel />
          <ThingSearchPanel />
          <Button type="submit">Search</Button>
      </form>
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

function mapDispatchToProps(dispatch) {
  return {
    searchShareables: (formVals) => {
      dispatch(searchShareables(formVals));
    }
  }
}

function validate(formProps) {
  console.log('form props', formProps);
  const errors = {};
  return errors;
}

export default connect(mapStateToProps, mapDispatchToProps())(
  reduxForm({
    form: 'shareableSearch',
    destroyOnUnmount: false,        // <------ preserve form data
    forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
    validate
  })(ShareablesSearchPage));
