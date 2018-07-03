import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet
} from 'react-native';
import Shareable from '../components/Shareable';

import {allShareableListItems as shareables}  from '../../redux/store/shareables';

class ShareableListScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
//    const {shareables} = this.props;
//    const shareableList = shareables.allShareableListItems;
    return (
      <View>
        {shareables.map(s=>(
          <Shareable shareable={s} key={s.id} />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({

});

ShareableListScreen.propTypes = {
};
/*
function mapDispatchToProps(dispatch){
  return {};
}

function mapStateToProps(state) {
  return {
    shareables: state.shareables.shareables,
  };
}
*/

export default /*connect(mapStateToProps, mapDispatchToProps)*/ (ShareableListScreen);
