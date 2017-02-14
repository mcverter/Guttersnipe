import React, {PropTypes, Component} from "react";
import {Link} from "react-router";
import Button from "react-bootstrap/lib/Button";
import Tab from "react-bootstrap/lib/Tab";
import { connect } from 'react-redux'
import {setBrowserLocation} from '../../actions/browserEnv/browserEnvActions';
import {fetchAllShareables} from '../../actions/shareables/shareableActions';
import SpaceSearchPanel from './space/SpaceSearchPanel'
import TimeSearchPanel from './time/TimeSearchPanel'
import ThingSearchPanel from './space/SpaceSearchPanel'

class ShareablesSearchPage extends Component {
  constructor(props) {
  }


  render() {
    return (
      <div>
        <TimeSearchPanel/>
        <SpaceSearchPanel/>
        <ThingSearchPanel/>

        <Button>Search</Button>

      </div>
    )
  }
}

export default ShareablesSearchPage;
