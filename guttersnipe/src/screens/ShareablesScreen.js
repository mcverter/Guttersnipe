import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import ShareablesList from '../components/ShareablesList';
import ShareablesMap from '../components/ShareablesMap'
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

  switchTab = (tabName) => {this.setState({currentTab: tabName});}

  render() {
    const {currentTab} = this.state;
    const {shareables, navigation} = this.props;
    const zoom = 4;


    return (
      <View style={styles.mapPageContainer}>
        {
          currentTab === 'list' ?
            (<View>
              <Button
                onPress={()=>{this.switchTab("map")}}
                title={"Switch to Map View"} />
              <ShareablesList
                shareables={shareables}
                navigation={navigation} />
            </View>)
            :
            (<View>
              <Button
                onPress={()=>{this.switchTab("list")}}
                title={"Switch to List View"} />
              <ShareablesMap shareables={shareables} navigation={navigation}/>
            </View>)
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
