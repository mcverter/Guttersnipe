import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";

import {fonts, scalingFactors} from "./../styles/fonts"
import Dimensions from "Dimensions";
let {width} = Dimensions.get("window");

class HeadingText extends Component {
  static displayName = "HeadingText";

  render () {
    const {style, children} = this.props;
    return (
      <Text style={[style, fonts.big, scaled.big]}>
        {children}
      </Text>
    )
  }
}

const scaled = StyleSheet.create({
  normal: {
    fontSize: width * 1.0 / scalingFactors.big
  }
})

export default HeadingText;
