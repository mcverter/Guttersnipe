import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import Map from './Map';
import Shareable from './Shareable';

import PropTypes from 'prop-types';

const ShareableMap = (props) => {
  const shareables = props.shareables;
  return (
    <Map
      shareables={shareables}
    />
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

ShareableMap.propTypes = {
  shareables: PropTypes.object,

};

export default ShareableMap;
