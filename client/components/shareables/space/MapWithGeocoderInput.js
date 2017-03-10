import React, {Component, PropTypes} from 'react';
import Panel from 'react-bootstrap/lib/Panel';

import L from 'leaflet';
import 'leaflet-geocoder-mapzen';
import "../../../../node_modules/leaflet/dist/images/marker-icon-2x.png";
import "../../../../node_modules/leaflet/dist/images/marker-icon.png";
import "../../../../node_modules/leaflet/dist/images/marker-shadow.png";


export default class MapWithGeocoder extends Component {
  constructor(props) {
    super(props);
    this.Geocoder = {};
  }

  componentDidMount() {
    let map = L.map(this.el).setView([
      this.props.formInput.value.latitude,
      this.props.formInput.value.longitude], 12);
    let  geoCoderOptions = {
      bounds: false,
      position: 'topright',
      expanded: true
    };
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    this.geocoder = L.control.geocoder('mapzen-a2w6xkx', geoCoderOptions).addTo(map);
    this.geocoder.on('select', ((data) => {
      this.props.formInput.onChange({
        latitude: data.latlng.lat,
        longitude: data.latlng.lng,
        canonicalAddress: data.feature.properties.label
      });
    }));
    // needed when exposing the search panel
    if (this.props.forceRedraw) {
      setTimeout(()=>{ map.invalidateSize();}, 500)
    } else {
      map.invalidateSize();
    }
  }

  render() {
    const address = this.props.formInput.value.canonicalAddress;
    return (
      <Panel id="space-create-panel">
        <div ref={(el) => { this.el = el }}
             className="map-with-geocoder-input" />
        {address &&
        <div className="result-address">
          <strong><em>Address: </em> </strong>{address}
        </div>}
      </Panel>
    );
  }
}

MapWithGeocoder.propTypes = {
  formInput: PropTypes.object,
  forceRedraw: PropTypes.bool
};
