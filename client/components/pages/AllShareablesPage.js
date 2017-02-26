import React, {PropTypes, Component} from "react";
import { connect } from 'react-redux';
import {Link} from "react-router";

import Tabs from "react-bootstrap/lib/Tabs";
import Tab from "react-bootstrap/lib/Tab";

import AllShareablesListTab from './AllShareablesListTab';
import AllShareablesMapTab from './AllShareablesMapTab';
import AllShareablesCalendarTab from './AllShareablesCalendarTab';

import {setBrowserLocation} from '../../actions/browserEnv/browserEnvActions';
import {fetchAllShareablesIfNeeded} from '../../actions/shareables/shareableActions';

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
  }

  setMapAsActiveView() {
    this.setState({mapIsActiveView: true});
  }

  unsetMapAsActiveView() {
    this.setState({mapIsActiveView: false});
  }

  render() {
    return (
      <div className="all-shareables-pg">
        <Link to="/shareables/search"> Search Results</Link>
        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
          <Tab eventKey={1} onEnter={this.unsetMapAsActiveView}  title="List"><AllShareablesListTab/></Tab>
          <Tab eventKey={2} onEnter={this.setMapAsActiveView} title="Map"><AllShareablesMapTab isActiveView={this.state.mapIsActiveView} /></Tab>
          <Tab eventKey={3} onEnter={this.unsetMapAsActiveView} title="Calendar"><AllShareablesCalendarTab/></Tab>
        </Tabs>
      </div>

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

AllShareablesPage.propTypes = {
  fetchAllShareablesIfNeeded: PropTypes.func,
}

export default connect(null, mapDispatchToProps) (AllShareablesPage);
