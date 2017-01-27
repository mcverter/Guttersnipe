import React, {PropTypes} from 'react';

import Time from './time/TimeFull';
import Space from './space/SpaceFull';
import Thing from './thing/ThingFull';

import CommentList from './comment/CommentList';

const ShareableFull = ( { shareable:{headline, summary,
  number_ratings, total_rating, thing, space, time, notes, comments} } ) => (
  <div>
    <div className="jumbotron"> {headline} </div>
    <div> {summary} </div>
    <div> {number_ratings ? total_rating / number_ratings : 0} </div>
    <Thing thing={thing} />
    <Space space={space} />
    <Time time={time} headline={headline} />
    <div> {notes} </div>
  </div>
);

ShareableFull.propTypes = {
  shareable: PropTypes.object.isRequired
  /*
   headline: PropTypes.string.isRequired,
   summary: PropTypes.string.isRequired,
   number_ratings: PropTypes.number,
   total_rating: PropTypes.number,
   thing: PropTypes.object.isRequired,
   space: PropTypes.object.isRequired,
   time: PropTypes.object.isRequired,
   notes:PropTypes.string,
   comments: PropTypes.arrayOf(PropTypes.object)
   */
};

export default ShareableFull;
