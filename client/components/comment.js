/**
 * Created by mitchell_verter on 12/23/16.
 */
import React, {PropTypes} from 'react';

const Comment = (props) => (
    <div>
        <p> props.comment </p>
        <p><h4> by </h4> props.author</p>
        <p>props.date</p>
    </div>
)

const CommentList = (props) => (
    <div>
        {props.map(comment =>
            <Comment comment=comment />
        )}
    </div>
)