import React, {PropTypes} from 'react';
import {renderMainType, renderTags, renderSubtypes} from './utils/transformThingInformation';
import Panel from 'react-bootstrap/lib/Panel'

const summaryStyle = {

  width: '80%',
  'font-size': '150%',
  'backgroundColor': 'lightgray'
};

const SummaryMobile = (summary) => {
  debugger;
  if (summary) {
    return(
      <div style={summaryStyle}>
        <h3>Summary</h3>
        {summary}
      </div>
    )
  }
  else {
    return (<span></span>);
  }
};


const style = {
  width: '80%',
  'font-size': '150%',
  'backgroundColor': 'lightgray'
};

const MobileNavButton = ({headline}) => (
  <div style={style}>{headline}</div>
)

//export default MobileNavButton;


const ThingMobile = ({headline, thing: {description_how, description_what, notes,
  main_type, subtypes, tags} })=> {
  return (
    <Panel className="thing-mobile" header="Thing">
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


ThingMobile.propTypes = {
  thing: PropTypes.object,
  headline: PropTypes.string
};

export default ThingMobile;
