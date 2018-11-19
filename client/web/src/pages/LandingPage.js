import React, { Component } from "react";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";

import FTK from "../components/FTK";
import GsButton from "../components/GsButton";
import PropTypes from "prop-types";

class LandingPage extends Component {
  static navigationOptions = {
    title: "Welcome to Guttersnipe"
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("foo");
    this.props.onRequestDog();
  }
  render() {
    const user = this.props.user;
    const navigation = this.props.navigation;
    return (
      <div style={styles.landingPageContainer}>
        <div style={styles.searchShareablesButtonContainer}>
          <GsButton
            styleContainer={{ backgroundColor: "red", padding: 20 }}
            styleText={{ color: "black", fontWeight: "700" }}
            color="#910f0f"
            accessibilityLabel="Click here to start search"
            title="Search Shareables"
            onPress={() => navigation.navigate("ChooseCategoryPage")}
          />
        </div>

        <div style={styles.searchShareablesButtonContainer}>
          <GsButton
            styleContainer={{ backgroundColor: "red", padding: 20 }}
            styleText={{ color: "black", fontWeight: "700" }}
            color="#910f0f"
            accessibilityLabel="Click here to add shareable"
            title="Add Shareables"
            onPress={() => navigation.navigate("AddShareablePage")}
          />
        </div>

        <RaisedButton
          style={styles.shareablesFTKContainer}
          onPress={() => navigation.navigate("AboutPage")}
        >
          <FTK style={styles.shareablesFTKText} />
        </RaisedButton>
      </div>
    );
  }
}
const styles = {
  landingPageContainer: {
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
};

LandingPage.propTypes = {};

const mapDispatchToProps = dispatch => {
  return {
    onRequestDog: () => dispatch({ type: "API_CALL_REQUEST" })
  };
};

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);

const maybeCreate = () => {
  return "goo";
  /*{user && (user.role === 'admin' || user.role === 'superadmin') &&
          <div style={styles.createShareablesButton}>
            <Button
              title="CreateShareable"
              color={styles.createShareablesButton.color}
              accessibilityLabel="Click here to create a shareable"
            />
          </div>
          } */
};
