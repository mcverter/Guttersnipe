import React, { Component } from "react";

// import Mapdiv, { Marker, Callout } from "react-native-maps";
import PropTypes from "prop-types";

class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { center, zoom, shareables, navigation } = this.props;
    return (<div></div>);
   /* return (
      <div style={styles.mapContainer}>
        <Mapdiv
          style={styles.map}
          initialRegion={{
            latitude: center.latitude,
            longitude: center.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          {shareables.map(s => {
            const coordinate = {
              lat: s.latitude,
              lng: s.longitude,
              latitude: s.latitude,
              longitude: s.longitude
            };
            return (
              <Marker
                key={`${s.name}${s.longitude}${s.latitude}`}
                coordinate={coordinate}
                title={s.name}
                description={"Click for details"}
              >
                <Callout
                  onPress={() => {
                    navigation.navigate("ShareableDetailScreen", {
                      shareable: s
                    });
                  }}
                />
              </Marker>
            );
          })}
        </Mapdiv>
      </div>
    ); */
  }
}

Map.propTypes = {
  center: PropTypes.array,
  shareables: PropTypes.array,
  navigation: PropTypes.object
};

const styles = {
  mapContainer: {
    display: "flex",
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%"
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 500,
    height: 500
  }
};

export default Map;
