import React, {PropTypes, Component} from "react";
import {Link} from "react-router";
import { connect } from 'react-redux'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';


class SpaceSearchPanel extends Component {

  render() {
//    const position = this.props.location;

    return (
      <div>
        <h2> Pick a radius for your search </h2>
        <select>
        </select>

        <h2> Pick a center for your search </h2>
          <h2> Map </h2>
      </div>
    )
  }
}

export default SpaceSearchPanel;

/*
            <Map center={this.props.location} zoom={13}>
                <TileLayer
                    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={this.props.location}>
                    <Popup>
                        <span>Location</span>
                    </Popup>
                </Marker>
            </Map>

 */
