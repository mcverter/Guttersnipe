import Map from '../components/Map';

import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {allShareableListItems as shareables}  from '../../redux/store/shareables';
import categorization from "../../redux/store/categorizations";

export default class MapScreen extends Component {
  static navigationOptions = {
    title: 'Map',
  };

  render() {
    const { navigation } = this.props;
    const center = navigation.getParam('center', '');
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
        <Button
          onPress={() => navigate('KropotkinScreen')}
          title="Conquest of Bread"
        />
      </View>
    )
  }
}
