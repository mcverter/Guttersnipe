import React, {PropTypes} from 'react';
import Comment from './CommentFull';

const CommentList = (comments) => (
  <div className="comment-list">
    {comments.map(comment =>
      <Comment key={comment.id} comment={comment} />
    )}
  </div>
);

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object)
};

export default CommentList;
