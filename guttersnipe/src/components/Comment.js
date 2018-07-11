import React from 'react';
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';
/* need new GsText component */
import GsText from '../components/GsText';

import PropTypes from 'prop-types';

const Comment = ({comment}) => {
  console.log('comment props', comment);
  const {author_id, author_name, author_role,
    comment_id, comment_title, comment_text,
    date_posted, shareable_id} = comment;

  return (
        <View style={styles.commentContainer}>
            <View style={styles.title}>
              <GsText>{comment_title}</GsText>
            </View>
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
