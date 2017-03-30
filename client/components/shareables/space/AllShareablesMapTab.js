import React, {PropTypes} from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import {connect} from 'react-redux';
import {Link} from 'react-router';

export class AllShareablesMapTabComponent extends React.Component {
  constructor(props) {
    super(props);
    this.renderMarker = this.renderMarker.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isActiveView && this.map) {
      this.map.leafletElement.invalidateSize(false);
      const shareableItems = this.props.shareables.items;
      const bounds = shareableItems.map (item=>{return [
        JSON.parse(item.space.position).latitude,
        JSON.parse(item.space.position).longitude
      ]});
      this.map.leafletElement.fitBounds(bounds);
    }
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
            <a href={"/shareables/shareable/" + id}> Full Record </a>
          </div>
        </Popup>
      </Marker>
    );
  }

  render() {
    const {
      shareables: { isFetchingShareables,shareableFetchError, items, points}}  = this.props;

    if (isFetchingShareables || shareableFetchError || !items || items.length < 1) {
      return <div>Loading...</div>;
    }

    return (
      <div id="all-shareables-map-tab">
        <Map ref={(map) => { this.map = map; }}>
          <TileLayer
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {points.map(shareable => this.renderMarker(shareable))}
        </Map>
      </div>
    );
  }
}
AllShareablesMapTabComponent.propTypes = {
  shareables: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    shareables: state.shareables
  };
}

export default connect(mapStateToProps)(AllShareablesMapTabComponent);
