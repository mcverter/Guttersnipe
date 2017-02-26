import React, {PropTypes} from 'react';
import "../../../../node_modules/leaflet/dist/images/marker-icon-2x.png";
import "../../../../node_modules/leaflet/dist/images/marker-icon.png";
import "../../../../node_modules/leaflet/dist/images/marker-shadow.png";
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import Panel from 'react-bootstrap/lib/Panel';

const SpaceFull = ({space}) =>  {
      const {latitude, longitude} = JSON.parse(space.position);
    const position = [latitude, longitude];
        return (
        <Panel className="space-full" header="Space">
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
        </Panel>
    );
};

SpaceFull.propTypes = {
    space: PropTypes.object
};

export default SpaceFull;