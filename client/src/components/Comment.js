import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';

import PropTypes from 'prop-types';

const Comment = ({author_id, author_name, author_role,
                   comment_id, comment_title, comment_text,
                   date_posted, shareable_id}) => {
    return (
        <View>
            <View style={styles.title}>
              <Text>{comment_title}</Text>
            </View>
          <View style={styles.text}>
            <Text>{comment_text}</Text>
          </View>
          <View style={styles.author}>
            <Text> Posted by {author_name} on {date_posted}</Text>
          </View>
        </View>
    );
};
const styles = new StyleSheet({
  author,
  title,
  text
});

Comment.propTypes = {

};

export default Comment;
