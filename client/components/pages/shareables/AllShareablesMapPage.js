import React, {PropTypes} from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import {connect} from 'react-redux';
import {fetchAllShareables} from '../../../actions/shareables/shareableActions';
import {Link} from 'react-router';

class AllShareablesMapPage extends React.Component {
  constructor(props) {
    super(props);
    this.calculateCenter = this.calculateCenter.bind(this);
    this.renderMarker = this.renderMarker.bind(this);
  }

  componentWillMount() {
//    this.props.fetchAllShareables();
  }

  calculateCenter(shareables) {
    return [40.693922, -73.991764];
  }


  renderMarker(shareable) {
    const {id, headline, space} = shareable;
    const {latitude, longitude} = JSON.parse(space.position);
    const position = [longitude, latitude];

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
  componentWillReceiveProps(nextProps) {
    console.log('next props', nextProps);

    if (nextProps.isActiveView && this.map) {
      console.log('resizing');

      debugger;
      this.map.leafletElement.invalidateSize(false);
    }
  }

  render() {
    const {
      shareables: { isFetchingShareables,shareableFetchError, items}}  = this.props;


    if (isFetchingShareables || shareableFetchError || !items || items.length < 1) {
      return <div>Loading...</div>;
    }

    const position = this.calculateCenter(items);

    return (
      <div>
        <Map ref={(map) => { this.map = map; }}
             center={position} zoom={13}>
          <TileLayer
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
           {items.map(shareable => this.renderMarker(shareable))}
        </Map>
      </div>
    )
  }
}
AllShareablesMapPage.propTypes = {
  shareables: PropTypes.object.isRequired,
  fetchAllShareables: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    shareables: state.shareables
  };
}

export default connect(mapStateToProps, {fetchAllShareables})(AllShareablesMapPage);
