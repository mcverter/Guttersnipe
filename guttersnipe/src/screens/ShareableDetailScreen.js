import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';
import CommentList from '../components/CommentList'
import Shareable from '../components/Shareable';
import PageTitle from "../components/PageTitle";
import Map from "../components/Map";
import PropTypes from 'prop-types';
import comments from "../../redux/store/comments";
import {allShareableListItems as shareables} from "../../redux/store/shareables";
import categorization from "../../redux/store/categorizations";
import find from 'lodash.find';

class ShareableDetailScreen extends Component {
  static navigationOptions = {
    title: 'Shareable Detail',
  };

  constructor(props) {
    super(props);
  }

  render() {
    const navigation  = this.props.navigation;
    const shareable_id = navigation.getParam('id', '');
    const shareable = find(shareables, s => {
      return s.id === shareable_id
    });

    return (
      <View style={styles.shareableDetailScreenContainer}>
        <Shareable
          style={styles.shareableItem}
          shareable={shareable} navigation={navigation}/>
        <CommentList
          style={styles.commentList}
          comments={comments} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  shareableDetailScreenContainer: {},
  shareableItem: {},
  commentList: {}
});

ShareableDetailScreen.propTypes = {

};

export default ShareableDetailScreen;
