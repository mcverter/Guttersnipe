import {StyleSheet} from "react-native";

const baseFontSize = 24;

const styles = StyleSheet.create({
  bigText: {
    fontSize: baseFontSize + 8,
    color: "#FFF"
  },
  mainText: {
    fontSize: baseFontSize,
    color: "#FFF"
  }
});

styles.baseFontSize = baseFontSize;

export default styles;
