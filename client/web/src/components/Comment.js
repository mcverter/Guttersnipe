import React from "react";

import GsText from "./GsText";

import PropTypes from "prop-types";

let commentText = "foo";
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
    <div style={styles.commentContainer}>
      <div>
        <GsText style={styles.commentText}>{comment_text}</GsText>
      </div>
      <div>
        <GsText
          style={styles.commentAuthor}
        >{`Posted by ${author_name} on ${date_posted}`}</GsText>
      </div>
    </div>
  );
};

/*

 */
const styles = {
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
};

Comment.propTypes = {};

export default Comment;
