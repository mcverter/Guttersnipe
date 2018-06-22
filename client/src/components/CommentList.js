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
const styles = new StyleSheet({

});

CommentList.propTypes = {


};

export default CommentList;
