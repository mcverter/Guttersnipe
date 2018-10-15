import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import Utils from "../utils";


class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {shareables, navigation} = this.props;
    const [latitude, longitude] = Utils.findCenterLatLng(shareables.map(s=> {return [s.latitude,  s.longitude];}));
    const zoom = 4;

    return (
      <View style={styles.mapContainer}>
        <MapView style={styles.map}
                 initialRegion={{
                   latitude: latitude,
                   longitude: longitude,
                   latitudeDelta: 0.0922,
                   longitudeDelta: 0.0421,
                 }}>
          {shareables.map(s=> {
              const coordinate={lat: s.latitude, lng: s.longitude, latitude: s.latitude, longitude: s.longitude};
              return (
                <Marker
                  key={`${s.name}${s.longitude}${s.latitude}`}
                  coordinate={coordinate}
                  title={s.name}
                  description={'Click for details'}>
                  <Callout
                    onPress={()=>{
                      navigation.navigate('ShareableDetailScreen', {
                        shareable: s,
                        zoom: 4
                      })}}/>
                </Marker>
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
    top: 0,
    left: 0,
  },
  map: {
    top: 0,
    left: 0,
    width: 500,
    height: 500,


  },
});


export default (Map);


