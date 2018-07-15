import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

import Map from '../components/Map';

export default class MapScreen extends Component {
  static navigationOptions = {
    title: 'Shareable Map',
  };

  render() {
    const navigation  = this.props.navigation;
    const center = navigation.getParam('center', '');
    const shareables = navigation.getParam('shareables');
    const zoom = navigation.getParam('zoom', 4);

    return (
      <View style={styles.mapPageContainer}>
        <Map
          center={center}
          zoom={zoom}
          shareables={shareables}
          navigation={navigation}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mapPageContainer: {}
});
