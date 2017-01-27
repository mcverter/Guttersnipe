import React, {PropTypes} from 'react';

import {Link} from 'react-router';

import TimeLI from './time/TimeLI';
import SpaceLI from './space/SpaceLI';
import ThingLI from './thing/ThingLI';


const ShareableLI = ( { shareable: { headline, id,
  number_ratings, total_rating, thing, space, time } } ) => (
  <tr key={id}>
    <td>{headline}</td>
    <td><ThingLI thing={thing} /></td>
    <td><SpaceLI space={space} /></td>
    <td><TimeLI time={time} /></td>
    <td> Rating:
      {number_ratings && <span>{total_rating/number_ratings}</span>}
    </td>
    <td> <Link to={"shareable/" + id}>Full Record</Link> </td>
  </tr>
);

ShareableLI.propTypes = {
};

export default ShareableLI;
