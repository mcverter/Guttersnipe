import React, {PropTypes} from 'react';

import L from 'leaflet';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';


const SpaceFull = ({space,
  canonical_address,  alternate_names, notes}) =>  {
    const {latitude, longitude} = JSON.parse(space.position);
    const position = [longitude, latitude];

    return (
        <div>
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
    );
};

SpaceFull.propTypes = {
    space: PropTypes.object.isRequired
};

export default SpaceFull;
