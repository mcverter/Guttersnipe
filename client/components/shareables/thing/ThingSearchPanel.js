import React, {PropTypes, Component} from "react";
import {Link} from "react-router";
import { connect } from 'react-redux'


class ThingSearchPanel extends Component {

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
