import React, {PropTypes, Component} from "react";
import { connect } from 'react-redux';
import {Link} from "react-router";
import Button from "react-bootstrap/lib/Button";

import Tabs from "react-bootstrap/lib/Tabs";
import Tab from "react-bootstrap/lib/Tab";
import Panel from "react-bootstrap/lib/Panel"
import AllShareablesListTab from '../shareables/thing/AllShareablesListTab';
import AllShareablesMapTab from '../shareables/space/AllShareablesMapTab';
import AllShareablesCalendarTab from '../shareables/time/AllShareablesCalendarTab';

import {setBrowserLocation} from '../../actions/browserEnv/browserEnvActions';
import {fetchAllShareablesIfNeeded, searchShareables} from '../../actions/shareables/shareableActions';

class AllShareablesPage extends Component {
  constructor(props) {
    super(props);

    this.setMapAsActiveView = this.setMapAsActiveView.bind(this);
    this.unsetMapAsActiveView = this.unsetMapAsActiveView.bind(this);
    this.resetSearchResults = this.resetSearchResults.bind(this);

    this.state = ({
      mapIsActiveView: false
    });
  }

  componentWillMount() {
    this.props.fetchAllShareablesIfNeeded();
  }

  resetSearchResults() {
        this.props.searchShareables();

  }

  setMapAsActiveView() {
    this.setState({mapIsActiveView: true});
  }

  unsetMapAsActiveView() {
    this.setState({mapIsActiveView: false});
  }

  render() {
    return (
      <Panel id="all-shareables-pg">
        <Panel>
          <button><Link to="/shareables/search"> Search For Shareables</Link></button>
          <button onClick={this.resetSearchResults}> Clear Search Filters</button>
        </Panel>
        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
          <Tab eventKey={1} onEnter={this.unsetMapAsActiveView}  title="List"><AllShareablesListTab/></Tab>
          <Tab eventKey={2} onEnter={this.setMapAsActiveView} title="Map"><AllShareablesMapTab isActiveView={this.state.mapIsActiveView} /></Tab>
          <Tab eventKey={3} onEnter={this.unsetMapAsActiveView} title="Calendar"><AllShareablesCalendarTab/></Tab>
        </Tabs>
      </Panel>

    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllShareablesIfNeeded: () => {
      dispatch(fetchAllShareablesIfNeeded());
    },
    searchShareables: () => {
      dispatch(searchShareables())
    },

    setBrowserLocation: () => {
      dispatch(setBrowserLocation());
    }
  };
};

AllShareablesPage.propTypes = {
  fetchAllShareablesIfNeeded: PropTypes.func,
};

export default connect(null, mapDispatchToProps) (AllShareablesPage);
