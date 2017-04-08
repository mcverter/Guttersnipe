import React, {PropTypes} from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-geocoder-mapzen';

import Panel from 'react-bootstrap/lib/Panel'
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {fetchAllPointsIfNeeded}  from '../../../actions/points/pointActions'
import {setBrowserLocation} from '../../../actions/browserEnv/browserEnvActions'

export class FullMapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.renderMarker = this.renderMarker.bind(this);
    this.createMap = this.createMap.bind(this);
    this.state = {address: ''};
  }
  componentWillMount() {
    this.props.setBrowserLocation();
    this.props.fetchAllPoints();
  }

  componentDidUpdate() {
    if (this.el) {
      this.createMap();
    }
  }
  createMap() {
    const self = this;
    let location = this.props.browserLocation;
    let map = L.map(this.el, {"zoomControl": false}).setView(location, 12);
    let  geoCoderOptions = {
      bounds: false,
      position: 'bottomright',
      expanded: false
    };
    L.control.zoom({position: 'topright'}).addTo(map)
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    this.geocoder = L.control.geocoder('mapzen-a2w6xkx', geoCoderOptions).addTo(map);
    this.geocoder.on('select', function(data) {
      //self.setState({address: data.feature.properties.label})
    });


    this.props.points.items.forEach((point)=>{
      const headline = point.properties.headline;
      const summary = point.properties.summary;
      const id = point.properties.id;
      const position = point.geometry.coordinates;
      L.marker(point.geometry.coordinates).addTo(map)
        .bindPopup(
          `<div>
                <h3> ${headline}</h3>
                <p> ${summary} </p>
          </div>`
        )
    });
    map.invalidateSize(false);
  }

  renderMarker(point) {
    const headline = point.properties.headline;
    const id = point.properties.id;
    const position = point.geometry.coordinates;

    return(
      <Marker key={`marker${id}`} position={position}>
        <Popup key={`popup${id}`}>
          <div>
            <h3> {headline}</h3>
            <a href={"/shareables/point/" + id}> Full Record </a>
          </div>
        </Popup>
      </Marker>
    );
  }

  render() {
      console.log(this.props);

    const {
      points: { isFetchingPoints,pointFetchError, items, points}}  = this.props;

    if (isFetchingPoints || pointFetchError || !items || items.length < 1) {
      return <div>Loading...</div>;
    }
    const address=this.state.address;
    return (
      <Panel id="space-create-panel">
        {address &&
        <div className="result-address">
          <strong><em>Address: </em> </strong>{address}
        </div>}

        <div ref={(el) => { this.el = el }}
             className="map-with-geocoder-input" />
      </Panel>
    );
  }
}
FullMapComponent.propTypes = {
  points: PropTypes.object,
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllPoints: () => {
      dispatch(fetchAllPointsIfNeeded());
    },
    setBrowserLocation: () => {
      dispatch(setBrowserLocation());
    }
  };
};

function mapStateToProps(state) {
  return {
    points: state.points,
    browserLocation: state.browserEnv.location
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FullMapComponent);
