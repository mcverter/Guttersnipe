import React, {PropTypes} from 'react';
import TimeMobile from './time/TimeMobile';
import SpaceMobile from './space/SpaceMobile';
import ThingMobile from './thing/ThingMobile';

const ShareableFullMobile = (props)  => {
  console.log('props', props);

  const { shareable:{headline, summary, number_ratings,
    total_rating, thing, space, time, notes, comments} } = props;


  return (
    <div id="shareable-full">
      hello world
    </div>
  );
};
/*
      <ThingMobile thing={thing} headline={headline} summary={summary} />
      <SpaceMobile space={space} headline={headline}/>
      <TimeMobile time={time} headline={headline}/>
      {notes && <div><h3>Notes:</h3> {notes} </div>}

 */
ShareableFullMobile.propTypes = {
  shareable: PropTypes.object
};

export default ShareableFullMobile;
