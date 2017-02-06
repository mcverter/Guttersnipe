import React, {PropTypes, Component} from "react";
import {Link} from "react-router";
import Tabs from "react-bootstrap/lib/Tabs";
import Tab from "react-bootstrap/lib/Tab";
import AllShareablesListPage from './AllShareablesListPage';
import AllShareablesMapPage from './AllShareablesMapPage';


class AllShareablesPage extends Component {

  render() {
    return (
      <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
        <Tab eventKey={1} title="List"><AllShareablesListPage/></Tab>
        <Tab eventKey={2} title="Map"><AllShareablesMapPage/></Tab>
        <Tab eventKey={3} title="Calendar">Tab 3 content</Tab>
      </Tabs>
    )
  }
}

export default AllShareablesPage;
