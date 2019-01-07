import React, { Component } from "react";

//import Mapdiv, { Marker, Callout } from "react-native-maps";
import { findCenterLatLng } from "../utils";

class Map extends Component {
  render() {
    const { shareables} = this.props;
    const [latitude, longitude] = findCenterLatLng(
      shareables.map(s => {
        return [s.latitude, s.longitude];
      })
    );
    const zoom = 4;
    return (<div></div>)
    /*  return (
        <div style={styles.mapContainer}>
          <Mapdiv
            style={styles.map}
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
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
      );*/
  }
}

const styles = {
  mapContainer: {
    display: "flex",
    flex: 1,
    top: 0,
    left: 0
  },
  map: {
    top: 0,
    left: 0,
    width: 500,
    height: 500
  }
};

export default Map;
