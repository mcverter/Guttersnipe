import React from "react";
import {Text,View,TouchableHighlight} from "react-native";

import styles from './style';

const Button = ({onPress, style, label}) => {
  <TouchableHighlight onPress={onPress}>
    <View style={[styles.button, style]}>
      <Text>
        {label}
      </Text>
    </View>
  </TouchableHighlight>
}

export default Button;
