import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import roadrunnerImage from "@guttersnipe-shared/assets/images/roadrunnerAtWaste.png";
import GsText from "./GsText";

import PropTypes from "prop-types";

const sendMailToAdmin = () => {};

const ContactPanel = () => {
  return (
    <div>
      <div>
        <GsText style={styles.contactPanel}>Contact</GsText>
      </div>
      <RaisedButton onPress={sendMailToAdmin}>
        <img
          style={{ height: 50, alignSelf: "center" }}
          src={roadrunnerImage}
        />qho
        <GsText style={styles.contactPanel}>
          email: roadrunner [at] waste [dot] org
        </GsText>
      </RaisedButton>
    </div>
  );
};

const styles = {
  contactPanel: { fontWeight: "700" }
};

export default ContactPanel;
