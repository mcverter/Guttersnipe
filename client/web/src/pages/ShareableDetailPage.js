import React, { Component } from "react";

//import Mapdiv, { Marker, Callout } from "react-native-maps";
import Shareable from "../components/Shareable";
import CommentList from "../components/CommentList";

/** TODO  remove comments */
import comments from "@guttersnipe-shared/redux/store/comments";

    //"@guttersnipe-shareable/redux/store/comments";

import { connect } from "react-redux";
import PropTypes from "prop-types";

class ShareableDetailPage extends Component {
  static navigationOptions = {
    title: "Shareable Detail"
  };

  constructor(props) {
    super(props);
  }

  render() {
    const navigation = this.props.navigation;
    const shareable = navigation.getParam("shareable", "");
  return (<div></div>);
    /*
    return (
      <div style={styles.shareableDetailPageContainer}>
        <Shareable
          style={styles.shareableItem}
          shareable={shareable}
          navigation={navigation}
        />
        <div style={styles.mapContainer}>
          <Mapdiv
            style={styles.map}
            initialRegion={{
              latitudeDelta: 0.0052,
              longitudeDelta: 0.0051,
              latitude: shareable.latitude,
              longitude: shareable.longitude
            }}
          >
            <Marker
              coordinate={{
                latitude: shareable.latitude,
                longitude: shareable.longitude,
                lat: shareable.latitude,
                long: shareable.longitude
              }}
              title={shareable.name}
              description={shareable.name}
            />
          </Mapdiv>
        </div>
        <CommentList style={styles.commentList} comments={shareable.comments} />
      </div>
    );
    */
  }
}

const styles = {
  shareableDetailPageContainer: {},
  shareableItem: {},
  commentList: {},
  mapContainer: {
    borderWidth: 2,
    margin: 2,
    padding: 2,
    borderColor: "#000",
    borderStyle: "solid"
  },

  map: {
    height: 200,
    width: "100%"
  }
};

ShareableDetailPage.propTypes = {};

export default ShareableDetailPage;
