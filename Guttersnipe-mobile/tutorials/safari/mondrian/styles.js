import {StyleSheet} from 'react-native';
import React  from 'react';

const styles = StyleSheet.create({
  parent: {
    flexDirection: "column",
    position: "absolute",
    top: 30,
    left: 0,
    right: 0,
    bottom: 0
  },
  base: {
    borderColor: "#000",
    borderWidth: 5
  },
  topBlock: {
    flexDirection: "row",
    flex: 5
  },
  bottomBlock: {
    flex: 2,
    flexDirection: "row"
  },
  leftCol: {
    flex: 2
  },
  bottomRight: {
    flexDirection: "column",
    flex: 2
  },
  cellOne: {
    flex: 1,
    borderBottomWidth: 15
  },
  cellTwo: {
    flex: 3
  },
  cellThree: {
    backgroundColor : "#FF0000",
    flex: 5
  },
  cellFour: {
    flex: 3,
    backgroundColor: "#0000FF"
  },
  cellFive: {
    flex: 6
  },
  cellSix: {
    flex: 1
  },
  cellSeven: {
    flex: 1,
    backgroundColor: "#FFFF00"
  },

})


export default styles;
