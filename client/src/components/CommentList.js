import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';
import Comment from './Comment'

import PropTypes from 'prop-types';

const CommentList = ({comments}) => {
  return (
    <View>
      {
        comments.map(s=><Comment {...s} />)
      }

    </View>
  );
};
const styles = StyleSheet.create({

});

CommentList.propTypes = {


};

export default CommentList;
