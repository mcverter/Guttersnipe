import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

export default class ShareableResultsTabContainer extends Component {
  static navigationOptions = {
    title: 'Search Results',
  };

  render() {
    const navigation = this.props.navigation;
    const center = navigation.getParam('center', '');
    const shareables = navigation.getParam('shareables');
    const zoom = navigation.getParam('zoom', 4);

    return (
      <View style={styles.mapPageContainer}>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mapPageContainer: {}
});
