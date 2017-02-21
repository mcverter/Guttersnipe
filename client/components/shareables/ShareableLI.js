import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import TimeLI from './time/TimeLI';
import SpaceLI from './space/SpaceLI';
import ThingLI from './thing/ThingLI';


const ShareableLI = ( { shareable: { headline, id,
  number_ratings, total_rating, thing, space, time } } ) => (
  <tr className="shareable-li" key={id}>
    <td>{headline}</td>
    <td><ThingLI thing={thing} /></td>
    <td><SpaceLI space={space} /></td>
    <td><TimeLI time={time} /></td>
    <td> {number_ratings && number_ratings > 0 ?
        <span>{total_rating/number_ratings}</span>:
        <span>Not Rated</span>
      }
    </td>
    <td> <Link to={"/shareables/shareable/" + id}>Full Record</Link> </td>
  </tr>
);

ShareableLI.propTypes = {
  shareable: PropTypes.object
};

export default ShareableLI;
