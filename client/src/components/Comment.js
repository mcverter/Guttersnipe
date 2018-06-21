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
            <View>
              <Text></Text>
            </View>
        </View>
    );
};
const styles = new StyleSheet({

});

Comment.propTypes = {

};

export default Comment;
