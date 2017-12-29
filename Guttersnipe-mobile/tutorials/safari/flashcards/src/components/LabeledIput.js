import React from "react";
import {StyleSheet, View} from "react-native";

import Input from "./Input";
import NormalText from "./NormalText";

const LabeledInput = ({label, onEntry, onChange, clearOnSubmit, inputStyle}) => (
 <View style={styles.wrapper}>
   <NormalText style={styles.label}>
     {label}
   </NormalText>
   <Input
     onEntry={onEntry}
     onChange={onChange}
     clearOnSubmit={clearOnSubmit}
     style={inputStyle}
   />
 </View>
);

const styles = StyleSheet.create({
  label: {
    paddingLeft: 10
  },
  wrapper: {
    padding: 5
  }
});

export default LabeledInput;
