import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity
} from "react-native";

import GsText from "./GsText";

import { utilOpenURL } from "../utils";

import PropTypes from "prop-types";

const sendMailToAdmin = () => {
  utilOpenURL("mailto:roadrunner@waste.org");
};

const ContactPanel = () => {
  return (
    <View>
      <View>
        <GsText style={styles.contactPanel}>Contact</GsText>
      </View>
      <TouchableOpacity onPress={sendMailToAdmin}>
        <Image
          style={{ height: 50, alignSelf: "center" }}
          source={require("../otherassets/images/roadrunnerAtWaste.png")}
        />
        <GsText style={styles.contactPanel}>
          email: roadrunner [at] waste [dot] org
        </GsText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  contactPanel: { fontWeight: "700" }
});

export default ContactPanel;
