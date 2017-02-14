import React, {PropTypes, Component} from "react";
import {Link} from "react-router";
import Tabs from "react-bootstrap/lib/Tabs";
import Tab from "react-bootstrap/lib/Tab";
import { connect } from 'react-redux'
import {setBrowserLocation} from '../../actions/browserEnv/browserEnvActions';
import {fetchAllShareables} from '../../actions/shareables/shareableActions';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';


class SpaceSearchPanel extends Component {
  constructor(props) {
  }


  render() {
    position = this.props.location;

    return (
      <div>
        <h2> Pick a radius for your search </h2>

        <h2> Pick a center for your search </h2>
          <h2> Map </h2>
            <Map center={position} zoom={13}>
                <TileLayer
                    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                    <Popup>
                        <span>Location</span>
                    </Popup>
                </Marker>
            </Map>
      </div>
    )
  }
}

export default SpaceSearchPanel;
