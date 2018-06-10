import Kropotkin from '../components/Kropotkin';

import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
export default class DummyScreen extends Component {
  static navigationOptions = {
    title: 'The Conquest of Bread',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>Hello, Dummy Screen!</Text>
        <Button
          onPress={() => navigate('Kropotkin')}
          title="Kropotkin"
        />
      </View>
    )
  }
}
