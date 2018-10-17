import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

import PropTypes from "prop-types";

const GsButton = ({ onPress, title, styleText, styleContainer }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styleContainer}>
      <Text style={styleText}>{title}</Text>
    </TouchableOpacity>
  );
};

GsButton.propTypes = {};

export default GsButton;
