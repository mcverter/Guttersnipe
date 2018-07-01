import Map from '../components/Map';

import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
export default class MapScreen extends Component {
  static navigationOptions = {
    title: 'Map',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Map/>
        <Button
          onPress={() => navigate('KropotkinScreen')}
          title="Conquest of Bread"
        />
      </View>
    )
  }
}
