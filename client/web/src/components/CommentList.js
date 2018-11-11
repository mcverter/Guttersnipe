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
      <FlatList
        keyExtractor={(item, index) => index}
        data={comments}
        renderItem={element => <Comment comment={element.item} />}
      />
    </div>
  );
};
const styles = StyleSheet.create({});

CommentList.propTypes = {};

export default CommentList;
