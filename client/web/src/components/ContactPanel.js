import React from "react";
import RaisedButton from "material-ui/RaisedButton";

import GsText from "./GsText";

import { utilOpenURL } from "../utils";

import PropTypes from "prop-types";

const sendMailToAdmin = () => {
  utilOpenURL("mailto:roadrunner@waste.org");
};

const ContactPanel = () => {
  return (
    <div>
      <div>
        <GsText style={styles.contactPanel}>Contact</GsText>
      </div>
      <RaisedButton onPress={sendMailToAdmin}>
        <img
          style={{ height: 50, alignSelf: "center" }}
          source={require("../otherassets/images/roadrunnerAtWaste.png")}
        />
        <GsText style={styles.contactPanel}>
          email: roadrunner [at] waste [dot] org
        </GsText>
      </RaisedButton>
    </div>
  );
};

const styles = StyleSheet.create({
  contactPanel: { fontWeight: "700" }
});

export default ContactPanel;
