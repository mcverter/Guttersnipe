import Map from '../components/Map';

import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {allShareableListItems as shareables}  from '../../redux/store/shareables';

export default class MapScreen extends Component {
  static navigationOptions = {
    title: 'Map',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Map
          center={}
          zoom={}
          shareables={shareables}
        />
        <Button
          onPress={() => navigate('KropotkinScreen')}
          title="Conquest of Bread"
        />
      </View>
    )
  }
}
