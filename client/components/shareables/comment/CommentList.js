import React, {PropTypes} from 'react';
import Comment from './Comment';

const CommentList = (comments) => (
    <div>
        {comments.map(comment =>
            <Comment key={comment.id} comment={comment} />
        )}
    </div>
);

CommentList.propTypes = {
    comments: PropTypes.arrayOf(PropTypes.object)
};

export default CommentList;