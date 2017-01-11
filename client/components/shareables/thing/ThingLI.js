import React, {PropTypes} from 'react';

const ThingLI = ({thing}) => {
    let {main_type, subtypes, tags} = thing;
    console.log("HEllo World");
    return (
        <td>
            <dl>
                <dt>Type</dt>
                <dd>{main_type.name}</dd>
                <dt>Subtypes</dt>
                <dd>{subtypes}</dd>
                <dt>Tags</dt>
                <dd>{tags}</dd>
            </dl>
        </td>
    );
}


ThingLI.propTypes = {
};

export default ThingLI;

