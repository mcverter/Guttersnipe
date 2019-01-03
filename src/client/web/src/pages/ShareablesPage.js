import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import ShareablesList from "../components/ShareablesList";
import ShareablesMap from "../components/ShareablesMap";

import { connect } from "react-redux";

class ShareableResultsTabContainer extends Component {
  static navigationOptions = {
    title: "Search Results"
  };

  constructor(props) {
    super(props);
    this.state = {
      currentTab: "list"
    };
  }

  switchTab = tabName => {
    this.setState({ currentTab: tabName });
  };

  render() {
    const { currentTab } = this.state;
    const { shareables, navigation } = this.props;
    const zoom = 4;

    return (
      <div style={styles.mapPageContainer}>
        {currentTab === "list" ? (
          <div>
            <RaisedButton
              onPress={() => {
                this.switchTab("map");
              }}
              title={"Switch to Map div"}
            />
            <ShareablesList shareables={shareables} navigation={navigation} />
          </div>
        ) : (
          <div>
            <RaisedButton
              onPress={() => {
                this.switchTab("list");
              }}
              title={"Switch to List div"}
            />
            <ShareablesMap shareables={shareables} navigation={navigation} />
          </div>
        )}
      </div>
    );
  }
}
/*

 */
const styles = {
  mapPageContainer: {}
};

const mapDispatchToProps = {};
const mapStateToProps = state => state.shareables;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShareableResultsTabContainer);
