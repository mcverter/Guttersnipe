import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import Shareable from './Shareable';

import PropTypes from 'prop-types';

const ShareableList = (props) => {
  const shareables = props.shareables;
    return (
        <View
          style={styles.shareableListItems}
        >
          {
            shareables.map(s=><Shareable {...s} />)
          }

        </View>
    );
};
const styles = StyleSheet.create({
  shareableListItems: {}
});

ShareableList.propTypes = {
  shareables: PropTypes.object,

};

export default ShareableList;
