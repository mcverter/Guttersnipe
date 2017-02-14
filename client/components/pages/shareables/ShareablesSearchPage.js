import React, {PropTypes, Component} from "react";
import {Link} from "react-router";
import Button from "react-bootstrap/lib/Button";
import Tab from "react-bootstrap/lib/Tab";
import { connect } from 'react-redux'
import SpaceSearchPanel from '../../shareables/space/SpaceSearchPanel'
import TimeSearchPanel from '../../shareables/time/TimeSearchPanel'
import ThingSearchPanel from '../../shareables/space/SpaceSearchPanel'

class ShareablesSearchPage extends Component {

  render() {
    return (
      <div>
        <TimeSearchPanel/>
        <SpaceSearchPanel location={this.props.location}/>
        <ThingSearchPanel/>

        <Button>Search</Button>

      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return null;
};

function mapStateToProps(state) {
  return {location: state.browserEnv.location};
}

export default connect(mapStateToProps, mapDispatchToProps)(ShareablesSearchPage);
