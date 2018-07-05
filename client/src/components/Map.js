
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';


class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('Map props', this.props);
    const {center, zoom, shareables, navigation} = this.props;

    return (
      <View style={styles.mapContainer}>
        <MapView style={styles.map}
                 initialRegion={{
                   latitude: center.longitude,
                   longitude: center.latitude,
                   latitudeDelta: 0.0922,
                   longitudeDelta: 0.0421,
                 }}>
          {shareables.map(s=> {
            console.log('mapping shareable', s);
            const coordinate={lat: s.longitude, lng: s.latitude, latitude: s.longitude, longitude: s.latitude};
            console.log('coordinate', coordinate);
             return (
              <Marker
                key={s.id}
                coordinate={coordinate}
                title={s.name}
                description={s.name}
              />
             );
            }
          )}
        </MapView>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  mapContainer: {
    display: "flex",
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    height: "100%",
    width: "100%"
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 500,
    height: 500,


  },
});


export default (Map);


