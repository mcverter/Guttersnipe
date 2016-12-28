import React, {PropTypes} from 'react';
import {Time} from './time/time.js';
import {Space} from './space/space.js';
import {Thing} from './thing/thing.js'
import {CommentList} from './comment';

const Shareable =
    ({headline, summary, number_ratings, total_rating,
     thing, space, time, notes, comments}) => (
    <div>
        <ShareableHeading
            headline={headline}
            summary={summary}
            rating = {number_ratings ?
                total_rating / number_ratings : 0}
            />
        <Thing
            thing={thing} />
        <Space
            space={space} />
        <Time
            time={time} />
        <SummaryNotes
            notes={notes} />
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