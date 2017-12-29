import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";

import {fonts, scalingFactors} from "./../styles/fonts"
import Dimensions from "Dimensions";
let {width} = Dimensions.get("window");

class NormalText extends Component {
  static displayName = "NormalText";

  render () {
    const {style, children} = this.props;
    return (
      <Text style={[style, fonts.normal, scaled.normal]}>
        {children}
      </Text>
    )
  }
}

const scaled = StyleSheet.create({
  normal: {
    fontSize: width * 1.0 / scalingFactors.normal
  }
})

export default NormalText;
