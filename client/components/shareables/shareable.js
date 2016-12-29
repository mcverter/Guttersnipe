import React, {PropTypes} from 'react';
import Time from './time/Time';
import Space from './space/Space';
import Thing from './thing/Thing';
import CommentList from './comment/CommentList';

const Shareable =
    ({headline, summary, number_ratings, total_rating,
     thing, space, time, notes, comments}) => (
    <div>
        <div>
            {headline}
        </div>
        <div>
            {summary}
        </div>
        <div>
            {number_ratings ?
                total_rating / number_ratings : 0}
         </div>
        <Thing
            thing={thing} />
        <Space
            space={space} />
        <Time
            time={time} />
        <div>
            {notes}
            </div>
        <CommentList
            comments={comments} />
    </div>
);

Shareable.propTypes = {
    headline: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    number_ratings: PropTypes.number,
    total_rating: PropTypes.number,
    thing: PropTypes.object.isRequired,
    space: PropTypes.object.isRequired,
    time: PropTypes.object.isRequired,
    notes:PropTypes.string,
    comments: PropTypes.arrayOf(PropTypes.object)
};

export default Shareable;