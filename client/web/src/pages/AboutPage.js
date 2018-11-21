import React, { Component } from "react";

//import Video from "react-native-video";
import FTK from "../components/FTK";
import GsText from "../components/GsText";
import LegalNotice from "../components/LegalNotice";
import ContactPanel from "../components/ContactPanel";
import guttersnipeVideo from "@assets/video/Guttersnipe.mp4";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import RaisedButton from "material-ui/RaisedButton";
const vid = require("@assets/video/Guttersnipe.mp4")
const videoIsVisible = false;

class AboutPage extends Component {
  static navigationOptions = {
    title: "About Guttersnipe"
  };
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={styles.aboutPageContainer}>
        <div style={styles.videoPanel}>
          <div style={styles.videoContainer}>
            <video
              source={vid}
              rate={1.0}
              volume={1.0}
              muted={false}
              resizeMode="cover"
              style={{ width: "100%", height: 200 }}
              poster={"../../shared/assets/images/JoeStrummerGuttersnipe.png"}
            />
          </div>
        </div>

        <div style={styles.aboutFTKContainer}>
          <FTK style={styles.aboutFTKText} />
        </div>

        <div style={styles.kropotkin}>
          <RaisedButton
            title="Read Kropotkin"
            style={styles.readKropotkinButton}
            color={"black"}
            onPress={() => this.props.navigation.navigate("KropotkinPage")}
          />
        </div>

        <LegalNotice />
        <ContactPanel />
      </div>
    );
  }
}

const styles = {
  aboutPageContainer: {},

  videoPanel: {},
  videoContainer: {},
  video: {
    height: 200,
    width: "100%"
  },

  aboutFTKText: {
    color: "black",
    textAlign: "center",
    fontFamily: "courier",
    fontWeight: "900"
  },
  aboutFTKContainer: {
    backgroundColor: "red",
    padding: 15
  },

  legalPanel: {
    borderColor: "black",
    borderWidth: 1
  },

  readKropotkinButton: {
    color: "orange"
  },

  contactPanel: {}
};

AboutPage.propTypes = {};
/*
const mapStateToProps = (state) => {
  /*  const {
      data,
    } = state.value;
    return {data};
  return {};
};

const mapDispatchToProps = () => {
};
*/
export default /*connect(mapStateToProps, { requestRegistryData })*/ AboutPage;
