import React, {Component} from "react";
import {StyleSheet, Text, View, SectionList} from "react-native";

class LayoutTesting extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.parent}>
        <Text style={styles.child}>Child One</Text>
        <Text style={styles.child}>Child Two</Text>
        <Text style={styles.child}>Child Three</Text>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  parent: {
    backgroundColor: "#F5FCFF",
    borderColor: "#0099AA",
    borderWidth: 5,
    marginTop: 30,
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  child: {
    flex: 1,
    borderColor: "#AA0099",
    borderWidth: 2,
    textAlign: "center",
    fontSize: 24
  }

});
export default LayoutTesting;
