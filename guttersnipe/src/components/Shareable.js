import React from 'react';
import {
  View,
  Image,
  Button,
  StyleSheet,
  Text
} from 'react-native';
import Utils from '../utils'
import GsText from '../components/GsText';

import PropTypes from 'prop-types';


const Shareable = (props)  => {
  const shareable = props.shareable;
  const navigation = props.navigation;
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
      <View style={styles.shareableTitleContainer}>
        <View style={{flexGrow: 5}}>
          <GsText style={styles.shareableName}>{name}</GsText>
        </View>
        <View style={{flexGrow: 2, display: 'flex', flexDirection: 'row'}}>
          <View>
            <Text style={styles.category}>{category + '   ' }</Text>
          </View>
          <View>
            <Text style={styles.subcategory}>{'(' + subcategory + ')'}</Text>
          </View>
        </View>
      </View>
      {!!description &&
      <View>
        <GsText style={styles.description}>{description}</GsText>
      </View>}
      <View>
        <GsText style={styles.address}>{address}</GsText>
      </View>
      {!!time &&
      <View>
        <GsText style={styles.time}>{time}</GsText>
      </View>}
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
  shareableName: {
    fontWeight: '700',
  },
  category: {
    color: '#b24040'
  },
  subcategory: {
    color: '#e8a2a2'
  },
  description: {
    color: '#000',
    fontWeight: '800'
  },
  address: {
    fontStyle: 'italic',
    color: '#4F0010',
    fontWeight: '500'
  },
  time: {
    fontStyle: 'italic',
    color: '#9B4D8A',
    fontWeight: '500'
  },
  viewMapButton: {
    color: 'purple'
  },
  shareableTitleContainer: {
    display: 'flex',
    flexDirection: 'row'
  }
});

Shareable.propTypes = {

};

export default Shareable;
