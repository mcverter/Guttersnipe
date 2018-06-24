import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';
import Shareable from './Shareable'

import PropTypes from 'prop-types';

const ShareableList = ({shareables}) => {
    return (
        <View>
          {
            shareables.map(s=><Shareable {...s} />)
          }

        </View>
    );
};
const styles = StyleSheet.create({

});

ShareableList.propTypes = {


};

export default ShareableList;
