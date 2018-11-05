import React, {PropTypes} from 'react';

const SpaceLI = ({space}) => {
    const {canonical_address} = space;

    return (
        <div className="space-li"> {canonical_address}</div>
    );
};

SpaceLI.propTypes = {
    space: PropTypes.object
};

export default SpaceLI;

