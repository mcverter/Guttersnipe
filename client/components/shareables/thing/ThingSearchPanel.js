import React, {PropTypes, Component} from "react";
import {Link} from "react-router";
import Tabs from "react-bootstrap/lib/Tabs";
import Tab from "react-bootstrap/lib/Tab";
import { connect } from 'react-redux'
import {setBrowserLocation} from '../../actions/browserEnv/browserEnvActions';
import {fetchAllShareables} from '../../actions/shareables/shareableActions';


class ThingSearchPanel extends Component {
  constructor(props) {
  }


  render() {
    return (
      <div>
        <h2>  Search by Main Type</h2>
        <h2> Search by Subtypes</h2>
        <h2> Search by Tags </h2>
      </div>
    )
  }
}

export default ThingSearchPanel;
