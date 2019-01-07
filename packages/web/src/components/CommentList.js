import React from "react";
import Comment from "./Comment";
import PropTypes from "prop-types";

const CommentList = ({ comments }) => {
  if (!comments || comments.length < 1) {
    return (
      <div style={styles.noComments}>
        <span>No Comments</span>
      </div>
    );
  }
  return (
    <div style={styles.comments}>
      <ul>
        {comments.map(c => (
          <li><Comment comment={c}/></li>))}
      </ul>
    </div>
  );
};
const styles = {
  comments: {},
  noComments: {}
};

CommentList.propTypes = {
  comments: PropTypes.array
};

export default CommentList;
