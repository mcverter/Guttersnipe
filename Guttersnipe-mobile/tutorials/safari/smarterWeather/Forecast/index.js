import React from "react";

import {StyleSheet, Text, View} from "react-native";

const Forecast = ({main, description, temp}) => (
  <View style={styles.forecast}>
    <Text style={styles.bigText}>
      {main}
    </Text>
    <Text style={styles.mainText}>
      CUrrent conditions: {description}
    </Text>
    <Text style={styles.bigText}>
      {temp} 'F
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {height: 130},
  forecast: {
    alignItems: "center"
  },
  bigText: {
    flex: 2,
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "#FFF"
  },
  mainText: {
    flex: 1,
    fontSize: 16,
    textAlign: "center",
    color: "#FFF"
  }
})

export default Forecast;
