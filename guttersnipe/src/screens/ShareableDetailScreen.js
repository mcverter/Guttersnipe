import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';
import PropTypes from 'prop-types';
import comments from "../../redux/store/comments";
import MapView, {Marker, Callout} from 'react-native-maps';
import Shareable from "../components/Shareable";
import CommentList from "../components/CommentList";


class ShareableDetailScreen extends Component {
  static navigationOptions = {
    title: 'Shareable Detail',
  };

  constructor(props) {
    super(props);
  }

  render() {
    const navigation  = this.props.navigation;
    const shareable = navigation.getParam('shareable', '');

    return (
      <View style={styles.shareableDetailScreenContainer}>
        <Shareable
          style={styles.shareableItem}
          shareable={shareable} navigation={navigation}/>
        <View style={styles.mapContainer}>
          <MapView style={styles.map}
                   initialRegion={{
                     latitudeDelta: 0.0052,
                     longitudeDelta: 0.0051,
                     latitude: shareable.latitude,
                     longitude: shareable.longitude
                   }}>
            <Marker
              coordinate={{latitude: shareable.latitude, longitude: shareable.longitude, lat: shareable.latitude, longitude: shareable.longitude}}
              title={shareable.name}
              description={shareable.name} />
          </MapView>
        </View>
        <CommentList
          style={styles.commentList}
          comments={shareable.comments} />
      </View>
    );
  }
}

/*


 */
const styles = StyleSheet.create({
  shareableDetailScreenContainer: {},
  shareableItem: {},
  commentList: {},
  mapContainer: {
  borderWidth: 2,
  margin: 2,
  padding: 2,
  borderColor: '#000',
  borderStyle: 'solid'
  },
  map: {
    height: 200,
    width: '100%'
  }
});

ShareableDetailScreen.propTypes = {

};

export default ShareableDetailScreen;
