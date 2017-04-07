import React, {PropTypes} from 'react';
import HeadlineMobile from '../components/shareables/thing/HeadlineMobile';
import SummaryMobile from '../components/shareables/thing/SummaryMobile';
import TimeMobile from '../components/shareables/time/TimeMobile';
import SpaceMobile from '../components/shareables/space/SpaceMobile';
import ThingMobile from '../components/shareables/thing/ThingMobile';

const ShareableFullMobile = ( { shareable:{headline, summary,
  number_ratings, total_rating, thing, space, time, notes, comments} } ) => {

  return (
    <div id="shareable-full">
      <HeadlineMobile headline={headline} />
      <SummaryMobile summary={summary} />
      <ThingMobile thing={thing} headline={headline}/>
      <SpaceMobile space={space} headline={headline}/>
      <TimeMobile time={time} headline={headline}/>
      {notes && <div><h3>Notes:</h3> {notes} </div>}
    </div>
  );
};

ShareableFullMobile.propTypes = {
  shareable: PropTypes.object
};

export default ShareableFullMobile;
