import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import PropTypes from 'prop-types';

const GsButton = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={props.styleContainer}>
      <Text style={props.styleText}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

GsButton.propTypes = {

};

export default GsButton;
