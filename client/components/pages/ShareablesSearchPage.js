import React, {PropTypes, Component} from "react";
import {Link} from "react-router";
import Button from "react-bootstrap/lib/Button";
import { connect } from 'react-redux';
import SpaceSearchPanel from '../space/SpaceSearchPanel'
import TimeSearchPanel from '../time/TimeSearchPanel';
import ThingSearchPanel from '../thing/ThingSearchPanel';
import { Field, reduxForm } from 'redux-form';
import {searchShareables} from '../../../actions/shareables/shareableActions';

class ShareablesSearchPage extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(values) {
    const data = {
      date_input: values.time_input,
      longitude: values.longitude,
      latitude: values.latitude,
      distance: values.space_radius,
      type_name: values.thing_type,
      subtype_list: values.thing_subtypes
    };
    this.props.searchShareables(data);
  }

  render() {
    const {handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <TimeSearchPanel />
        <SpaceSearchPanel />
        <ThingSearchPanel />
        <Button type="submit" bsStyle="primary" bsSize="large" block>
          Search</Button>
     </form>
    );
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
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchShareables: (data) => {
      dispatch(searchShareables(data));
    }
  };
};

function validate(formProps) {
  const errors = {};
  return errors;
}

ShareablesSearchPage.propTypes = {
  searchShareables: PropTypes.func,
  handleSubmit: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: 'shareableSearch',
    destroyOnUnmount: false,        // <------ preserve form data
    forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
//    validate
  })(ShareablesSearchPage));
