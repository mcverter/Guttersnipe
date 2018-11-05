import React, { Component } from "react";
import {
  View,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  Linking
} from "react-native";

import { utilOpenURL } from "./../utils";
import GsText from "../components/GsText";

import { connect } from "react-redux";
import PropTypes from "prop-types";

class addShareableScreen extends Component {
  static navigationOptions = {
    title: "Add Shareable"
  };
  constructor(props) {
    super(props);
  }
  _handlePress(url) {
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          console.log("Can't handle url: " + url);
        } else {
          return utilOpenURL(url);
        }
      })
      .catch(err => console.error("An error occurred", err));
  }

  render() {
    return (
      <View style={styles.addShareableScreenContainer}>
        <View style={styles.addShareableHeaderContainer}>
          <Text style={styles.addShareableHeaderText}>
            ADD A NEW SHAREABLE
            {"\n"}
            (Press Button Below or
            {"\n"}
            Enter Address in Browser)
          </Text>
        </View>
        <TouchableOpacity
          style={styles.addShareableInputContainer}
          onPress={() =>
            this._handlePress("https://goo.gl/forms/eIUoxhBjJCzXaWnU2")
          }
        >
          <Text style={styles.addShareableInputText}> In a Form </Text>
          <Text style={styles.addShareableInputText}>
            https://goo.gl/forms/eIUoxhBjJCzXaWnU2
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addShareableInputContainer}
          onPress={() =>
            this._handlePress(
              "https://docs.google.com/spreadsheets/d/1KbeTJR_P4kx-Wd5J9qSOUcwpf8SuHYzjgjRK-bi6Bfg/edit?usp=sharing"
            )
          }
        >
          <Text style={styles.addShareableInputText}> In a Spreadsheet</Text>
          <Text style={styles.addShareableInputText}>goo.gl/z3szjU</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  addShareableScreenContainer: {
    backgroundColor: "black",
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around"
  },
  addShareableHeaderContainer: {
    backgroundColor: "#D46A6A",
    flex: 2,
    padding: 20,
    margin: 20,
    width: "80%"
  },
  addShareableHeaderText: {
    color: "black",
    fontWeight: "900",
    textAlign: "center"
  },
  addShareableInputContainer: {
    backgroundColor: "red",
    flex: 2,
    padding: 20,
    margin: 20,
    width: "80%"
  },
  addShareableInputText: {
    color: "black",
    fontWeight: "900",
    textAlign: "center"
  }
});

addShareableScreen.propTypes = {};
export default addShareableScreen;
