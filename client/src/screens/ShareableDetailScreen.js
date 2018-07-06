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
  constructor(props) {
    super(props);
  }

  render() {
//    const {shareable, comments} = this.props;
    const { navigation } = this.props;
    const shareable_id = navigation.getParam('id', '');
    const shareable = find(shareables, s => {
      console.log('shareable', s);
      return s.id === shareable_id
    });


    return (
      <View>
        <Shareable shareable={shareable} navigation={navigation}/>
        <CommentList comments={comments} />
      </View>
    );
  }
}

const styles = StyleSheet.create({

});

ShareableDetailScreen.propTypes = {

};

export default ShareableDetailScreen;


/*
        <View>
          <PageTitle>{shareable.name} Detail</PageTitle>
          <View>

          </View>
        </View>
        { Image ? }
<View>
  <Shareable {...shareable} />
</View>
<View>
<Map/>
</View>
<View>
  <CommentList comments={comments}/>
</View>
<View>
<Button>Search {shareable.category}</Button>
<Button>Search {shareable.subcategory}</Button>
</View>

 */
