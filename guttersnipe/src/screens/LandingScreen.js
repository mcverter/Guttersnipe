import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Button } from "react-native";
import { connect } from "react-redux";

import FTK from "../components/FTK";
import GsButton from "../components/GsButton";
// import { currentShareablesSaga } from "../../redux/actions/shareable";
import PropTypes from "prop-types";

class LandingScreen extends Component {
  static navigationOptions = {
    title: "Welcome to Guttersnipe"
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // debugger;
    // const result = this.props.currentShareablesSaga();
    console.log("foo");
  }
  render() {
    const user = this.props.user;
    const navigation = this.props.navigation;
    return (
      <View style={styles.landingScreenContainer}>
        <View style={styles.searchShareablesButtonContainer}>
          <GsButton
            styleContainer={{ backgroundColor: "red", padding: 20 }}
            styleText={{ color: "black", fontWeight: "700" }}
            color="#910f0f"
            accessibilityLabel="Click here to start search"
            title="Search Shareables"
            onPress={() => navigation.navigate("ChooseCategoryScreen")}
          />
        </View>

        <View style={styles.searchShareablesButtonContainer}>
          <GsButton
            styleContainer={{ backgroundColor: "red", padding: 20 }}
            styleText={{ color: "black", fontWeight: "700" }}
            color="#910f0f"
            accessibilityLabel="Click here to add shareable"
            title="Add Shareables"
            onPress={() => navigation.navigate("AddShareableScreen")}
          />
        </View>

        <TouchableOpacity
          style={styles.shareablesFTKContainer}
          onPress={() => navigation.navigate("AboutScreen")}
        >
          <FTK style={styles.shareablesFTKText} />
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  landingScreenContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#910f0f",
    height: "100%"
  },

  shareablesFTKText: {
    color: "red",
    textAlign: "center",
    fontFamily: "courier",
    fontWeight: "900"
  },
  searchShareablesButtonContainer: {
    padding: 25
    //    marginBottom: 50
  },
  shareablesFTKContainer: {
    backgroundColor: "black",
    padding: 75
  },
  createShareablesButton: {}
});

LandingScreen.propTypes = {};

const mapDispatchToProps = dispatch => ({
  //  currentShareablesSaga: currentShareablesSaga
});

/*
const mapDispatchToProps = (dispatch) => ( { // <- forgot the wrapping with ( here
    loginDefault: (username , password) => {
        dispatch(AUTH_ACTIONS.actions.loginDefault(username, password))
    }
} )
 */

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingScreen);

const maybeCreate = () => {
  return "goo";
  /*{user && (user.role === 'admin' || user.role === 'superadmin') &&
          <View style={styles.createShareablesButton}>
            <Button
              title="CreateShareable"
              color={styles.createShareablesButton.color}
              accessibilityLabel="Click here to create a shareable"
            />
          </View>
          } */
};
