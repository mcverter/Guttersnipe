import React from 'react';
import {
  View,
  Image,
  Button,
  StyleSheet
} from 'react-native';
import Utils from '../utils'
import GsText from '../components/GsText';

import PropTypes from 'prop-types';


const Shareable = (props)  => {
  const shareable = props.shareable;
  const navigation = props.navigation;
  console.log('shareable', shareable);
  console.log('navigation', navigation);
  const id = shareable.id;
  const subcategory = shareable.subcategory;
  const category = shareable.category;
  const name = shareable.name;
  const description = shareable.description;
  const address = shareable.address;
  const  time = shareable.time;
  const geolocation = shareable.geolocation;
  const icalendar = shareable.icalendar;

  return (
    <View style={styles.shareableContainer}>
      <View>
        <GsText>{name}</GsText>
      </View>
      <View>
        <GsText style={styles.category}>{category}</GsText>
        <GsText style={styles.subcategory}>{subcategory}</GsText>
      </View>
      {!!description &&
      <View>
        <GsText>{description}</GsText>
      </View>}
      <View>
        <GsText>{address}</GsText>
      </View>
      {!!time &&
      <View>
        <GsText>{time}</GsText>
      </View>}
      <View>
        <Button
          style={styles.viewMapButton}
          title="View Map"
          onPress={()=>{
            navigation.navigate('MapScreen', {
              shareables: [shareable],
              center: {longitude: shareable.longitude, latitude: shareable.latitude},
              zoom: 4
            })}}
        />
      </View>
      {!!icalendar &&
      <View>
        <GsText>View Calendar</GsText>
      </View>}
    </View>
  );
};
const styles = StyleSheet.create({
  shareableContainer: {
    borderWidth: 2,
    margin: 2,
    padding: 2,
    borderColor: '#000',
    borderStyle: 'solid'
  },
  name: {},
  category: {},
  subcategory: {},
  description: {},
  address: {},
  time: {},
  viewMapButton: {
    color: 'purple'
  }
});

Shareable.propTypes = {

};

export default Shareable;
