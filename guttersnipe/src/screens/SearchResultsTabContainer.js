import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import ShareablesList from '../components/ShareablesList';
import {connect} from "react-redux";

class ShareableResultsTabContainer extends Component {
  static navigationOptions = {
    title: 'Search Results',
  };

  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'list'
    }
  }

  render() {
    const {currentTab} = this.state;
    const {shareables, navigation} = this.props;

    const center = navigation.getParam('center', '');
    const zoom = navigation.getParam('zoom', 4);

    return (
      <View style={styles.mapPageContainer}>
        {
          currentTab === 'list' ?
            (<ShareablesList shareables={shareables} />) :
            (<ShareablesMap shareables={shareables} />)
        }
      </View>
    )
  }
}
/*

 */
const styles = StyleSheet.create({
  mapPageContainer: {}
});

const mapDispatchToProps = {};
const mapStateToProps = state => state.shareables;
export default
connect(mapStateToProps, mapDispatchToProps)
(ShareableResultsTabContainer);
