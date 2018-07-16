import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';

import PropTypes from 'prop-types';

const FTK = () => {
    return (
        <View style={styles.ftkContainer}>
          <Text style={styles.ftkText}>!!!!!!!!!</Text>
          <Text style={styles.ftkText}> !! FOR !!</Text>
          <Text style={styles.ftkText}> !! THE !!</Text>
          <Text style={styles.ftkText}>!! KIDS !!</Text>
          <Text style={styles.ftkText}> !!!!!!!!!!</Text>
        </View>
    );
};
const styles = StyleSheet.create({
  ftkText: {
    color: 'red',
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 10
  },
  ftkContainer: {
    display: 'flex',
    alignItems: 'center',
    borderColor: 'purple',
    borderWidth: 1,
    borderRadius: 5,
    padding: 2,
    margin: 2
  }

});

FTK.propTypes = {

};

export default FTK;
