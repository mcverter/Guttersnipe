import React from 'react';
import {
  Text,
  View,
  Image,
  Button,
  StyleSheet
} from 'react-native';
import Utils from '../utils'

import PropTypes from 'prop-types';


const Shareable = ({shareable, navigation})  => {
  console.log('shareable', shareable);
  console.log('navigation', navigation);
  const {
    id,
    subcategory,
    category,
    name,
    description,
    address,
    time,
    geolocation,
    icalendar} = shareable;

  return (
    <View style={styles.shareableContainer}>
      <View>
        <Text>{Utils.superDecodeURI(name)}</Text>
      </View>
      <View>
        <Text style={styles.category}>{Utils.superDecodeURI(category)}</Text>
        <Text style={styles.subcategory}>{Utils.superDecodeURI(subcategory)}</Text>
      </View>
      {!!description &&
      <View>
        <Text>{Utils.superDecodeURI(description)}</Text>
      </View>}
      <View>
        <Text>{Utils.superDecodeURI(address)}</Text>
      </View>
      {!!time &&
      <View>
        <Text>{Utils.superDecodeURI(time)}</Text>
      </View>}
      <View>
        <Button
          title="View Map"
          onPress={()=>{
            navigation.navigate('MapScreen', {})}}
        />
      </View>
      {!!icalendar &&
      <View>
        <Text>View Calendar</Text>
      </View>}
      <View><Text>View Full Detail</Text></View>
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
  time: {}
});

Shareable.propTypes = {

};

export default Shareable;
