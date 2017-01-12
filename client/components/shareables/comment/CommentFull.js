import React, {PropTypes} from 'react';

const CommentFull = ({comment, author, date}) => (
    <div>
        <p> {comment} </p>
        <p><h4> by </h4> {author}</p>
        <p>{date}</p>
    </div>
);


CommentFull.propTypes = {
    comment: PropTypes.string,
    author: PropTypes.string,
    date: PropTypes.date
};

export default CommentFull;