import React from "react";
import { Text, View, Image, StyleSheet, FlatList } from "react-native";
import Comment from "./Comment";

import PropTypes from "prop-types";

const CommentList = ({ comments }) => {
  if (!comments || comments.length < 1) {
    return (
      <View>
        <Text>No Comments</Text>
      </View>
    );
  }
  return (
    <View>
      <FlatList
        keyExtractor={(item, index) => index}
        data={comments}
        renderItem={element => <Comment comment={element.item} />}
      />
    </View>
  );
};
const styles = StyleSheet.create({});

CommentList.propTypes = {};

export default CommentList;
