
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import MapView from 'react-native-maps';
// import {fetchSingleShareable} from './../actions/shareables/shareableActions';
import {connect} from 'react-redux';


class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    this.props.fetchS(1)
  }
  render() {
    console.log(this.props);

    return (
      <View style={styles.mapContainer}>
        <MapView style={styles.map}
                 initialRegion={{
                   latitude: 37.78825,
                   longitude: -122.4324,
                   latitudeDelta: 0.0922,
                   longitudeDelta: 0.0421,
                 }}>
        </MapView>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  mapContainer: {
    display: "flex",
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    height: "100%",
    width: "100%"
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 500,
    height: 500,


  },
});


function mapStateToProps(state) {
  return {
    shareableItems: state.shareables.items,
    selectedIndex: state.shareables.selectedIndex,
    isFetchingShareables: state.shareables.isFetchingShareables
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchS: (id) => {
      dispatch(fetchSingleShareable(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);


