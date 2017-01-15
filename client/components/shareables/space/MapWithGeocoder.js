/**
 * Created by mitchell on 1/13/2017.
 */

import React from 'react'
import L from 'leaflet';
import 'leaflet-geocoder-mapzen';



export default class MapWithGeocoder extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let map = L.map(this.el).setView([40.7259, -73.9805], 12);
        let  geoCoderOptions = {
            bounds: true,
            position: 'topright',
            expanded: true
        };
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        L.control.geocoder('mapzen-a2w6xkx', geoCoderOptions).addTo(map);

    }
    render() {
        return <div ref={(el) => { this.el = el }} />
    }
}

