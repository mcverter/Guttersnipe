import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';
import GsText from './GsText';

import PropTypes from 'prop-types';

const LegalNotice = () => {
  return (
    <View style={styles.legalPanel}>
      <View>
        <GsText style={styles.legalHeading}>LEGAL NOTICE</GsText>
      </View>
      <View style={styles.legalBody}>
        <View>
          <Text  style={styles.noJeopardy}>Through your usage of Guttersnipe, you agree
            to not put yourself or any other person in legal jeopardy.</Text>
        </View>
        <View >
          <GsText style={styles.freeToUse}>You are free to use Guttersnipe as you wish.</GsText>
        </View>
        <View>
          <Text style={styles.rightsRites}>All Wrongs Righted </Text>
          <Text style={styles.rightsRites}>All Rites Reversed</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({

  legalPanel: {
    borderColor: 'black',
    borderWidth: 1,
    display: 'flex'
  },

  legalHeading: {
    fontWeight: "700"
  },
  legalBody: {
  },
  noJeopardy: {
    color: '#800000',
    textAlign: "center"
  },
  freeToUse: {
    color: 'red',
    textAlign: "center"
  },
  rightsRites: {
    textAlign: "center",
    color: '#ff9933'

  },
});

LegalNotice.propTypes = {

};

export default LegalNotice;
