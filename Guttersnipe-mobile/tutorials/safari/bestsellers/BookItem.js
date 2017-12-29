import React, {Component} from "react";
import {StyleSheet, Text, View, Image, ListView} from "react-native";

const styles = StyleSheet.create({
  bookItem: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderBottomColor: "#AAA",
    borderBottomWidth: 5,
    padding: 5,
    height: 175
  },
  cover: {flex:1, height:150, resizeMode: "contain"},
  info: {
  },
  author: {fontSize: 18},
  title: {fontSize: 18, fontWeight: "bold"}
})


export default BookItem = ({coverURL, author, title}) => {
 return (
  <View style={styles.bookItem}>
    <Image  style={styles.cover} source={{uri: coverURL}}/>
    <View style={styles.info}>
      <Text style={styles.author}>{author}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  </View>
 )
}

/*

 */
