import React, {PropTypes, Component} from "react";
import {Link} from "react-router";
import Button from "react-bootstrap/lib/Button";
import { connect } from 'react-redux'
import SpaceSearchPanel from '../../shareables/space/SpaceSearchPanel'
import TimeSearchPanel from '../../shareables/time/TimeSearchPanel'
import ThingSearchPanel from '../../shareables/thing/ThingSearchPanel'
import { Field, reduxForm } from 'redux-form';
import {searchShareables, fetchAllShareables} from '../../../actions/shareables/shareableActions';

class ShareablesSearchPage extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  /*
   {longitude, latitude, distance, type_name,
   subtype_list, tag_list, date_input}

   {
   "time_range": "2017-02-02T08:42:27 - 017-02-17T08:42:27",
   "space_map": {
   "latitude": 40.74983,
   "longitude": -73.991668,
   "canonicalAddress": "2 Penn Plaza, Manhattan, New York, NY, USA"
   },
   "space_radius": 1609.34,
   "thing_type": "food",
   "thing_subtypes": "dumpster"
   }

   */

  handleFormSubmit(values) {
    console.log('values are', values);
    const data = {
     longditude: values.longitude,
     latitude: values.latitude,
     distance: values.space_radius,
     type_name: values.thing_type,
     subtype_list: values.thing_subtypes
     }
    this.props.searchShareables(data);
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
      time_range: '2017-02-02T08:42:27 - 017-02-17T08:42:27',
      space_map: {
        currentPostion: state.browserEnv.location,
        latitude: state.browserEnv.latitude,
        longitude: state.browserEnv.longitude
      }
    }
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    searchShareables: () => {
      dispatch(searchShareables());
    }
  }
}

function validate(formProps) {
  console.log('form props', formProps);
  const errors = {};
  return errors;
}

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: 'shareableSearch',
    destroyOnUnmount: false,        // <------ preserve form data
    forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
    persistentSubmitErrors: true
//    validate
  })(ShareablesSearchPage));

/*

 */
