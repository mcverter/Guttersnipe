import React, {PropTypes} from 'react';
import TimeCreate from './time/TimeFull';
import SpaceCreate from './space/SpaceCreate';
import ThingCreate from './thing/ThingCreate';

const ShareableCreate =
    ({shareable}) => {
        let {headline, summary,
             number_ratings, total_rating,
             thing, space, time,
             notes, comments} = shareable;
        return (
            <div >
                <div className="jumbotron">
            {headline}
                </div>
                <div>
            {summary}
                </div>
                <div>
            {number_ratings ?
            total_rating / number_ratings : 0}
                </div>
                <ThingCreate
                    thing={thing} />
                <SpaceCreate
                    space={space} />
                <TimeCreate
                    time={time} headline={headline} />
                <div>
            {notes}
                </div>
            </div>
        );
    };

ShareableCreate.propTypes = {
    shareable: PropTypes.object.isRequired
};

export default ShareableCreate;