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


ThingFull.propTypes = {
    main_type: PropTypes.object.isRequired,
    subtypes: PropTypes.arrayOf(PropTypes.string).isRequired,
    description_how: PropTypes.string,
    description_what: PropTypes.string,
    notes: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string)
};

export default ThingFull;

