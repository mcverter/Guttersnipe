
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from '../create-wizard/validateCreateShareableWizard'
import renderField from '../create-wizard/renderField'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import MapWithGeocoder from './MapWithGeocoder'
/*
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/leaflet.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/leaflet.js"></script>

<!-- Load geocoding plugin after Leaflet -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet-geocoder-mapzen/1.4.1/leaflet-geocoder-mapzen.js"></script>
Step 2: In JavaScript, initialize your Leaflet map.

// This is an example of Leaflet usage; you should modify this for your needs.
var map = L.map('map').setView([40.7259, -73.9805], 12);
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
Step 3: In JavaScript, add your geocoder with your Mapzen Search API key.

L.control.geocoder('<your-api-key>').addTo(map);
Step 4: Rejoice!

There is also a tutorial
It has much more detailed walkthrough instructions and is very friendly for beginners. No coding experience is necessary! Check it out here.


js
class MyMap extends React.Component {
  componentDidMount() {
    this.map = L.map(this.element, {});
  }
  render() {
    return <div ref={(el) => { this.el = el }} />
  }
}
W
 */

const ShareableCreateSpace = (props) => {
    const { handleSubmit } = props;
    let position= [-73.99255, 40.689613]
    return (
        <form onSubmit={handleSubmit}>
            <MapWithGeocoder />
            <Field name="longitude" type="text" component={renderField} label="Longitude"/>
            <Field name="latitude" type="text" component={renderField} label="Latitude"/>
            <Field name="canonical_address" type="text" component={renderField} label="Canonical Address"/>
            <Field name="alternate_names" type="text" component={renderField} label="Alternate names"/>
            <Field name="space_notes" type="text" component={renderField} label="Additional Notes"/>
            <div>
                <button type="submit" className="next">Next</button>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'wizard',                 // <------ same form name
    destroyOnUnmount: false,        // <------ preserve form data
    forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
    validate
})(ShareableCreateSpace)