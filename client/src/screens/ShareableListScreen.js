import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  FlatList,
  Text
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
    /*
            {shareables.map(s=>(
          <Shareable shareable={s} key={s.id} />
        ))}  */
    console.log(shareables);
    return (
        <FlatList
          data={shareables}
          renderItem={({item}) => {
            return <Shareable shareable={item} navigation={this.props.navigation}/>}}
          keyExtractor={(item, index) => index}


          //          renderItem={({item})} => <Text>foo</Text>}
        />
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
