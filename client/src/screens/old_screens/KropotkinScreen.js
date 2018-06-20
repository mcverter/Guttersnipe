import Kropotkin from '../components/Kropotkin';

import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
export default class KropotkinScreen extends Component {
  static navigationOptions = {
    title: 'Conquest of Bread',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Kropotkin/>
        <Button
          onPress={() => navigate('MapScreen')}
          title="Map"
        />
      </View>
    )
  }
}
