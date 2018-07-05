import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Button,
  StyleSheet,
  FlatList,
  Text
} from 'react-native';
import Shareable from '../components/Shareable';
import Utils from '../utils'

import {allShareableListItems as shareables}  from '../../redux/store/shareables';

class ShareableListScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {navigation} = this.props;
//    const shareableList = shareables.allShareableListItems;
    /*
            {shareables.map(s=>(
          <Shareable shareable={s} key={s.id} />
        ))}  */
    console.log(shareables);
    const centerLatLng = Utils.findCenterLatLng(shareables.map(s=> {
      console.log('finding center', s)
      return [s.latitude,  s.longitude];
    }));
    console.log('center lt lg', centerLatLng);

    return (
      <View>
        <Button
          title="View in Map"
          onPress={()=>{
            navigation.navigate('MapScreen', {
              shareables: shareables,
              center: {latitude: centerLatLng[0], longitude: centerLatLng[1]},
              zoom: 4
            })}}
        />
        <FlatList
          data={shareables}
          renderItem={({item}) => {
            return (
              <View>
                <Shareable
                  shareable={item}
                  navigation={this.props.navigation}/>
                <Button
                  title="View Detail"
                  onPress={()=>{
                    navigation.navigate('ShareableDetailScreen', {
                      id: item.id,
                      zoom: 4
                    })}}
                />

              </View>
            )}}
          keyExtractor={(item, index) => index}


          //          renderItem={({item})} => <Text>foo</Text>}
        />
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
