import React, { Component } from "react";
import FTK from "../components/FTK";
import LegalNotice from "../components/LegalNotice";
import ContactPanel from "../components/ContactPanel";
import RaisedButton from "material-ui/RaisedButton";
const vid = require("@guttersnipe-shared/assets/video/Guttersnipe.mp4");

class AboutPage extends Component {
  render() {
    return (
      <div style={styles.aboutPageContainer}>
        <div style={styles.videoPanel} >
          <div style={styles.videoContainer}>
            <video style={{ width: "100%", height: 200 }}>
              <source src={vid} type="video/mp4" />
            </video>
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
