import React, {PropTypes, Component} from 'react';
import {renderMainType, renderTags, renderSubtypes} from './utils/transformThingInformation';

const ThingLI = ({thing: {main_type, subtypes, tags}}) => (
  <div className="thing-li">
    {renderMainType(main_type)}
    {renderSubtypes(subtypes)}
    {renderTags(tags)}
  </div>
);

ThingLI.propTypes = {
  thing: PropTypes.object
};

export default ThingLI;

