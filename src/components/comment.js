import React, {PropTypes} from 'react';

const Comment = ({comment, author, date}) => (
    <div>
        <p> {comment} </p>
        <p><h4> by </h4> {author}</p>
        <p>{date}</p>
    </div>
);

const CommentList = (comments) => (
    <div>
        {comments.map(comment =>
            <Comment key={comment.id} comment={comment} />
        )}
    </div>
);

Comment.propTypes = {
    comment: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.date.isRequired
};

export default CommentList;