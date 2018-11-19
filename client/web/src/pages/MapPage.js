import React, { Component } from "react";

import Map from "../components/Map";

export default class MapPage extends Component {
  static navigationOptions = {
    title: "Shareable Map"
  };

  render() {
    const navigation = this.props.navigation;
    const center = navigation.getParam("center", "");
    const shareables = navigation.getParam("shareables");
    const zoom = navigation.getParam("zoom", 4);

    return (
      <div style={styles.mapPageContainer}>
        <Map
          center={center}
          zoom={zoom}
          shareables={shareables}
          navigation={navigation}
        />
      </div>
    );
  }
}

const styles = {
  mapPageContainer: {}
};
