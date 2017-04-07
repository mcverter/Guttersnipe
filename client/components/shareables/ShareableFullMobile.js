import React, {PropTypes} from 'react';
import HeadlineMobile from './HeadlineMobile';
import SummaryMobile from './SummaryMobile';
import TimeMobile from './time/TimeMobile';
import SpaceMobile from './space/SpaceMobile';
import ThingMobile from './thing/ThingMobile';
import Panel from 'react-bootstrap/lib/Panel'
const ShareableFullMobile = ( { shareable:{headline, summary,
  number_ratings, total_rating, thing, space, time, notes, comments} } ) => {

  debugger;

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
