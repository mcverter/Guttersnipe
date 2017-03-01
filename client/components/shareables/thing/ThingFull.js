import React, {PropTypes} from 'react';
import {renderMainType, renderTags, renderSubtypes} from './utils/transformThingInformation';
import Panel from 'react-bootstrap/lib/Panel'

const ThingFull = ({headline, thing: {description_how, description_what, notes,
  main_type, subtypes, tags} })=> {
  return (
    <Panel className="thing-full" header="Thing">
      <h3> Description of {headline}</h3>
      {description_how &&
      <div>
        <h4> Way of acquiring {headline} </h4>
        {description_how}
      </div>}
      {description_what &&
      <div> <h4>Description of {headline}</h4>
        {description_what}
      </div>}
      <div>
        {renderMainType(main_type)}
      </div>
      {subtypes &&
      <div>
        {renderSubtypes(subtypes)}
      </div>
      }
      {tags && JSON.parse(tags).length > 0 &&    // hack
      <div>
        {renderTags(tags)}
      </div>
      }
      {notes && <div><h3>Notes:</h3>{notes}</div>}
    </Panel>
  );
};


ThingFull.propTypes = {
  thing: PropTypes.object,
  headline: PropTypes.string
};

export default ThingFull;


/*    main_type: PropTypes.string,
 subtypes: PropTypes.arrayOf(PropTypes.string),
 description_how: PropTypes.string,
 description_what: PropTypes.string,
 notes: PropTypes.string,
 tags: PropTypes.arrayOf(PropTypes.string)
 */
