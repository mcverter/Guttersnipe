import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';
/* need new text component */
import Utils from '../utils';

import PropTypes from 'prop-types';

const Comment = ({comment}) => {
  console.log('comment props', comment);
  const {author_id, author_name, author_role,
    comment_id, comment_title, comment_text,
    date_posted, shareable_id} = comment;

  return (
        <View style={styles.commentContainer}>
            <View style={styles.title}>
              <Text>{Utils.superDecodeURI(comment_title)}</Text>
            </View>
          <View style={styles.text}>
            <Text>{Utils.superDecodeURI(comment_text)}</Text>
          </View>
          <View style={styles.author}>
            <Text> Posted by {Utils.superDecodeURI(author_name)} on {Utils.superDecodeURI(date_posted)}</Text>
          </View>
        </View>
    );
};

/*

 */
const styles = StyleSheet.create({
  author:{},
  title: {},
  text : {},
  commentContainer: {
    borderColor: 'red',
    borderWidth: 2
  }
});

Comment.propTypes = {

};

export default Comment;
