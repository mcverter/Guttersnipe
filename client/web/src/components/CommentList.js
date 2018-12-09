import React from "react";
import Comment from "./Comment";
import PropTypes from "prop-types";

const CommentList = ({ comments }) => {
  if (!comments || comments.length < 1) {
    return (
      <div>
        <span>No Comments</span>
      </div>
    );
  }
  return (
    <div>
      <ul>
        {comments.map(c => (
          <li><Comment comment={c}/></li>))}
      </ul>
    </div>
  );
};
const styles = {};

CommentList.propTypes = {
  comments: PropTypes.array
};

export default CommentList;
