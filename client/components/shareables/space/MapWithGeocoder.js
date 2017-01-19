import React, {Component} from 'react';
import L from 'leaflet';
import 'leaflet-geocoder-mapzen';

export default class MapWithGeocoder extends Component {
    constructor(props) {
        super(props);
        this.geocoder = {}
    }

    componentDidMount() {
        let map = L.map(this.el).setView([40.7259, -73.9805], 12);
        let  geoCoderOptions = {
            bounds: true,
            position: 'topright',
            expanded: true
        };
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        this.geocoder = L.control.geocoder('mapzen-a2w6xkx', geoCoderOptions).addTo(map);
        this.geocoder.on('select', ((data) => {
            console.log(data)
        }))

    }
/*
atlng
:
L.LatLng
lat
:
40.74983
lng
:
-73.991668

geometry
:
Object
coordinates
:
Array[2]
type
:
"Point"
__proto__
:
Object
properties
:
Object
accuracy
:
"point"
borough
:
"Manhattan"
borough_gid
:
"whosonfirst:borough:421205771"
country
:
"United States"
country_a
:
"USA"
country_gid
:
"whosonfirst:country:85633793"
county
:
"New York County"
county_gid
:
"whosonfirst:county:102081863"
distance
:
2.82
gid
:
"openaddresses:address:us/ny/statewide:0e8e8eedd6bb6107"
housenumber
:
"2"
id
:
"us/ny/statewide:0e8e8eedd6bb6107"
label
:
"2 Penn Plaza, Manhattan, New York, NY, USA"
layer
:
"address"
locality
:
"New York"
locality_gid
:
"whosonfirst:locality:85977539"
name
:
"2 Penn Plaza"
neighbourhood
:
"Chelsea"
neighbourhood_gid
:
"whosonfirst:neighbourhood:85810589"
region
:
"New York"
region_a
:
"NY"
region_gid
:
"whosonfirst:region:85688543"
source
:
"openaddresses"
source_id
:
"us/ny/statewide:0e8e8eedd6bb6107"
street
:
"Penn Plaza"
__proto__
:
Object
 */



    render() {
        return <div ref={(el) => { this.el = el }} />;
    }
}