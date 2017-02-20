import React, {PropTypes, Component} from "react";
import { connect } from 'react-redux';
import {Link} from "react-router";

import Tabs from "react-bootstrap/lib/Tabs";
import Tab from "react-bootstrap/lib/Tab";

import AllShareablesListPage from './AllShareablesListPage';
import AllShareablesMapPage from './AllShareablesMapPage';
import AllShareablesCalendarPage from './AllShareablesCalendarPage';

import {setBrowserLocation} from '../../../actions/browserEnv/browserEnvActions';
import {fetchAllShareablesIfNeeded} from '../../../actions/shareables/shareableActions';

class AllShareablesPage extends Component {
  constructor(props) {
    super(props);

    this.setMapAsActiveView = this.setMapAsActiveView.bind(this);
    this.unsetMapAsActiveView = this.unsetMapAsActiveView.bind(this);

    this.state = ({
      mapIsActiveView: false
    });
  }

  componentWillMount() {
    this.props.fetchAllShareablesIfNeeded();
    this.props.setBrowserLocation();
  }

  setMapAsActiveView() {
    this.setState({mapIsActiveView: true});
  }

  unsetMapAsActiveView() {
    this.setState({mapIsActiveView: false});
  }

  render() {
    return (
      <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
        <Tab eventKey={1} onEnter={this.unsetMapAsActiveView}  title="List"><AllShareablesListPage/></Tab>
        <Tab eventKey={2} onEnter={this.setMapAsActiveView} title="Map"><AllShareablesMapPage isActiveView={this.state.mapIsActiveView} /></Tab>
        <Tab eventKey={3} onEnter={this.unsetMapAsActiveView} title="Calendar"><AllShareablesCalendarPage/></Tab>
      </Tabs>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllShareablesIfNeeded: () => {
      dispatch(fetchAllShareablesIfNeeded());
    },
    setBrowserLocation: () => {
      dispatch(setBrowserLocation());
    }
  };
};

AllShareablesCalendarPage.propTypes = {
  fetchAllShareablesIfNeeded: PropTypes.func,
  setBrowserLocation: PropTypes.func
}

export default connect(null, mapDispatchToProps) (AllShareablesPage);
