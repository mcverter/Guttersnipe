import React from "react";
import { View, Image, StyleSheet } from "react-native";
import GsText from "../components/GsText";
import PropTypes from "prop-types";

let commentText = "foo bar";

const mitchell_comment = {
  comment_text: commentText,
  author_id: 5,
  author_name: "mitchell",
  author_role: "admin",
  comment_id: "2",
  date_posted: "November 26 1998",
  comment_title: commentText
    .split(" ")
    .slice(0, 3)
    .join(" ")
};

const Comment = props => {
  const comment = props.comment || mitchell_comment;
  const {
    author_id,
    author_name,
    author_role,
    comment_id,
    comment_title,
    comment_text,
    date_posted,
    shareable_id
  } = comment;

  return (
    <View style={styles.commentContainer}>
      <View>
        <GsText style={styles.commentText}>{comment_text}</GsText>
      </View>
      <View>
        <GsText
          style={styles.commentAuthor}
        >{`Posted by ${author_name} on ${date_posted}`}</GsText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentAuthor: {
    fontStyle: "italic",
    fontSize: 10
  },
  commentText: {
    color: "black",
    fontWeight: "500"
  },
  commentContainer: {
    borderColor: "#74132D",
    borderWidth: 2
  }
});

Comment.propTypes = {};

export default Comment;

function defaultComment() {
  return {
    comment_text: "foo bar",
    author_id: 5,
    author_name: "mitchell",
    author_role: "admin",
    comment_id: "2",
    date_posted: "November 26 1998",
    comment_title: commentText
      .split(" ")
      .slice(0, 3)
      .join(" ")
  };
}
