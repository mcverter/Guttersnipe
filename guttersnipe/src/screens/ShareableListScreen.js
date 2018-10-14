import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Button,
  StyleSheet,
  FlatList,
  Text
} from 'react-native';
import Shareable from '../components/Shareable';
import Utils from '../utils'
import geoShareables from '../../redux/store/geocodedJSON';

class ShareableListScreen extends Component {
  static navigationOptions = {
    title: 'Shareable List',
  };

  constructor(props) {
    super(props);
  }

  render() {
    const navigation = this.props.navigation;
    const subcategory = navigation.getParam('subcategory', 'dumpster');
    const shareables = geoShareables.filter(s=>s.subcategory === subcategory);
    const centerLatLng = Utils.findCenterLatLng(shareables.map(s=> {
      return [s.latitude,  s.longitude];
    }));

    return (
      <View style={styles.shareableListContainer}>
        <Button
          style={styles.viewMapButton}
          color='purple'
          title="View List in Map"
          onPress={()=>{
            navigation.navigate('MapScreen', {
              shareables: shareables,
              center: {latitude: centerLatLng[0], longitude: centerLatLng[1]},
              zoom: 4
            })}}
        />
        <FlatList
          style={styles.shareableList}
          data={shareables}
          renderItem={(element) => {
            const item = element.item;
            return (
              <View
                style={styles.shareableItemContainer}
              >
                <Shareable
                  style={styles.shareableItem}
                  shareable={item}
                  navigation={this.props.navigation}/>
                <Button
                  style={styles.viewDetailButton}
                  color="orange"
                  title="View Detail"
                  onPress={()=>{
                    navigation.navigate('ShareableDetailScreen', {
                      shareable: item,
                      zoom: 4
                    })}}
                />
              </View>
            )}}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewMapButton : {},
  viewDetailButton : {},
  shareableListContainer: {},
  shareableList: {},
  shareableItemContainer: {},
  shareableItem: {}
});

ShareableListScreen.propTypes = {
};
/*
function mapDispatchToProps(dispatch){
  return {};
}

function mapStateToProps(state) {
  return {
    shareables: state.shareables.shareables,
  };
}
*/

export default /*connect(mapStateToProps, mapDispatchToProps)*/ (ShareableListScreen);
