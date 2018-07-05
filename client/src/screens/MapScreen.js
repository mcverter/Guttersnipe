import Map from '../components/Map';

import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
// import {allShareableListItems as shareables}  from '../../redux/store/shareables';

export default class MapScreen extends Component {
  static navigationOptions = {
    title: 'Map',
  };

  render() {
    console.log('map screen props', this.props);
    const { navigation } = this.props;
    const center = navigation.getParam('center', '');
    const shareables = navigation.getParam('shareables')
    const zoom = navigation.getParam('zoom', 4);
    console.log('center', center)

    return (
      <View>
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
