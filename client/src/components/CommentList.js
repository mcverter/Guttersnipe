import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList
} from 'react-native';
import Comment from './Comment'

import PropTypes from 'prop-types';
import comments from "../../redux/store/comments";

console.log("static comments", comments);

const CommentList = ({comments}) => {
  console.log('prop comments', comments)
  return (
    <View>
      <FlatList
        keyExtractor={(item, index) => index}
        data={comments}
        renderItem={({item}) => (
         <Comment comment={item}/>
        )}/>
    </View>
  );
};
const styles = StyleSheet.create({

});

CommentList.propTypes = {


};

export default CommentList;
