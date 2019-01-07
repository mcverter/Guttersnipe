import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";

import PropTypes from "prop-types";

const FTK = ({ style }) => {
  return (
    <Text style={style}>
      *********
      {"\n"}
      !! FOR !!
      {"\n"}
      !! THE !!
      {"\n"}
      !! KIDS !!
      {"\n"}
      *********
    </Text>
  );
};
const styles = StyleSheet.create({
  ftkText: {
    color: "red",
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: 10
  },
  ftkContainer: {
    display: "flex",
    alignItems: "center",
    borderColor: "purple",
    borderWidth: 1,
    borderRadius: 5,
    padding: 2,
    margin: 2
  }
});

FTK.propTypes = {
  style: PropTypes.object
};

export default FTK;
