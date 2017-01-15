import React, {PropTypes} from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';

const SpaceFull = ({space}) => {
    const {longitude, latitude, canonical_address,
        alternate_names, notes} =  space;
    const position = [latitude, longitude];
    L.control.geocoder('mapzen-a2w6xkx ').addTo(map);

    return (
        <div>
            <Map center={position} zoom={13}>
                <TileLayer
                    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                    <Popup>
                        <span>A pretty CSS3 popup.
                            <br/>
                            Easily customizable.</span>
                    </Popup>
                </Marker>
            </Map>
        </div>
    );
};

SpaceFull.propTypes = {
    space: PropTypes.object.isRequired
};

export default SpaceFull;

/*
 "space"    : {
 "longitude" : "",
 "latitude": "",
 "canonical_address": "",
 "alternate_names": [
 ],
 "notes": ""
 },

 <Marker position={position}>
 <Popup>
 <span>A pretty CSS3 popup.
 <br/>
 Easily customizable.</span>
 </Popup>
 </Marker>

 */