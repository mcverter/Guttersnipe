import React, {PropTypes} from 'react';
import TimeLI from './time/TimeLI';
import SpaceLI from './space/SpaceLI';
import ThingLI from './thing/ThingLI';

const ShareableLI =
    ({shareable}) => {
        let {headline,
             number_ratings, total_rating,
             thing, space, time,
             notes, comments} = shareable;
        return (
            <tr id={key}>
                <td>{headline}</td>
                <td><ThingLI={thing} /></td>
                <td><TimeLI={thing} /></td>
                <td><SpaceLI={thing} /></td>
                <td> Rating: </td>
                <Link >Full Record</Link>
            </tr>
        );
    };

ShareableFull.propTypes = {
    shareable: PropTypes.object.isRequired
 ;

export default ShareableLI;