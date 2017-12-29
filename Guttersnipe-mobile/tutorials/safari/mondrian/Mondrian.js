import {View} from 'react-native';
import React  from 'react';
import styles from './styles';

const Mondrian = props => (
  <View style={styles.parent}>
    <View style={styles.topBlock}>
      <View style={styles.leftCol}>
        <View style={[styles.cellOne, styles.base]}></View>
        <View style={[styles.base, styles.cellTwo]}></View>
      </View>
      <View style={[styles.cellThree, styles.base]}></View>
    </View>
    <View style={styles.bottomBlock}>
      <View style={[styles.cellFour, styles.base]}></View>
      <View style={[styles.cellFive, styles.base]}></View>
      <View style={styles.bottomRight}>
        <View style={[styles.cellSix, styles.base]}></View>
        <View style={[styles.cellSeven, styles.base]}></View>
      </View>
    </View>
  </View>
);

export default Mondrian;
