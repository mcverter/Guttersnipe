import React from 'react';
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';
/* need new GsText component */
import GsText from '../components/GsText';

import PropTypes from 'prop-types';

const Comment = (props) => {
  const commentText = props.comment;
  console.log('comment props', comment);
  const comment = {
    comment_text: commentText,
    author_id: 5,
    author_name: 'mitchell',
    author_role: 'admin',
    comment_id: '2',
    date_posted: "November 26 1998",
    comment_title: commentText.split(' ').slice(0,3).join(' ')
  }
  const author_id = comment.author_id;
  const author_name = comment.author_name;
  const author_role = comment.author_role;
  const comment_id = comment.comment_id;
  const comment_title = comment.comment_title;
  const comment_text = comment.comment_text;
  const date_posted = comment.date_posted;
  const shareable_id = comment.shareable_id;

  return (
    <View style={styles.commentContainer}>
      <View style={styles.GsText}>
        <GsText>{comment_text}</GsText>
      </View>
      <View style={styles.author}>
        <GsText>{`Posted by ${author_name} on ${date_posted}`}</GsText>
      </View>
    </View>
  );
};

/*

 */
const styles = StyleSheet.create({
  author:{},
  title: {},
  GsText : {},
  commentContainer: {
    borderColor: 'red',
    borderWidth: 2
  }
});

Comment.propTypes = {

};

export default Comment;
