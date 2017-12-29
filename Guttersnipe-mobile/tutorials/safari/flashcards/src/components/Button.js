import React, {Component} from "react";
import {StyleSheet, View, TouchableOpacity} from "react-native";

import colors from './../styles/colors';

class Button extends Component {
  static displayName = "Button";

  render() {
    let opacity = this.props.disabled ? 1 : 0.5;
    const {onPress, style, children} = this.props;

    return (
      <TouchableOpacity
      activeOpacity={opacity}
      onPress={onPress}
      style={style}
      >
        {children}
      </TouchableOpacity>
    )
  }
}

Button.defaultProps = {disabled: false}

const styes = StyleSheet.create({
  wideButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 10,
    backgroundColor: colors.pink
  }
})


export default Button;
