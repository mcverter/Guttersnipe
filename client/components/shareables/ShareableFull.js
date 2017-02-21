import React, {PropTypes} from 'react';

import Time from './time/TimeFull';
import Space from './space/SpaceFull';
import Thing from './thing/ThingFull';

import CommentList from './comment/CommentList';

const ShareableFull = ( { shareable:{headline, summary,
  number_ratings, total_rating, thing, space, time, notes, comments} } ) => {
  return (
    <div className="shareable-full">
      <div className="jumbotron"> {headline} </div>
      {summary && <div><h3>Summary</h3>{summary} </div>}
      {number_ratings ? <div><h3>Rating</h3> {total_rating/number_ratings} </div>:''}
      <Thing thing={thing} headline={headline}/>
      <Space space={space} headline={headline}/>
      <Time time={time} headline={headline}/>
      {notes && <div><h3>Notes:</h3> {notes} </div>}
    </div>);
};

ShareableFull.propTypes = {
  shareable: PropTypes.object
  /*
        {number_ratings && <div><h3>Rating</h3> total_rating/number_ratings </div>}

   headline: PropTypes.string,
   summary: PropTypes.string,
   number_ratings: PropTypes.number,
   total_rating: PropTypes.number,
   thing: PropTypes.object,
   space: PropTypes.object,
   time: PropTypes.object,
   notes:PropTypes.string,
   comments: PropTypes.arrayOf(PropTypes.object)
   */
};

export default ShareableFull;
