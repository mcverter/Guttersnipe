import React from 'react';
import Utils from "../utils";
import {
  View,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity
} from 'react-native';
import GsText from './GsText';

const ContactPanel = () => {
  return (
    <View >
      <View>
        <GsText style={styles.contactPanel}>Contact</GsText>
      </View>
      <TouchableOpacity
        onPress={()=>Utils.openURL("mailto:roadrunner@waste.org")}>
        <Image
          style={{height: 50, alignSelf: 'center'}}
          source={require('../assets/images/roadrunnerAtWaste.png')}
        />
        <GsText style={styles.contactPanel}>email: roadrunner [at] waste [dot] org</GsText>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  contactPanel: {fontWeight: "700"},
});

export default ContactPanel;
