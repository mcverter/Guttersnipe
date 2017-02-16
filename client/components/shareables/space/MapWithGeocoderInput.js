import React, {Component, PropTypes} from 'react';

import L from 'leaflet';
import 'leaflet-geocoder-mapzen';

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
            bounds: true,
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
    }

    render() {
        return <div ref={(el) => { this.el = el }} /> ;
    }
}

MapWithGeocoder.propTypes = {
 // input: PropTypes.object
};
