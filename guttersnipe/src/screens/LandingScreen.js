import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Button
} from 'react-native';
import FTK from '../components/FTK';
import PageTitle from '../components/PageTitle';

import PropTypes from 'prop-types';

class LandingScreen extends Component {
  static navigationOptions = {
    title: 'Welcome to Guttersnipe',
  };

  constructor(props) {
    super(props);
  }

  render() {
    const user = this.props.user;
    const navigation = this.props.navigation;
    return (
      <View style={styles.landingScreenContainer}>
        <View style={styles.landingScreenTitle}>
          <PageTitle>
            <Text>Welcome to Guttersnipe</Text>
          </PageTitle>
        </View>
        <View style={styles.searchShareablesButton}>
          <Button
            color="#910f0f"
            accessibilityLabel="Click here to start search"
            title="Search Shareables"
            onPress={() => navigation.navigate('ChooseCategoryScreen')}/>
        </View>
        {user && (user.role === 'admin' || user.role === 'superadmin') &&
        <View style={styles.createShareablesButton}>
          <Button
            title="CreateShareable"
            color={styles.createShareablesButton.color}
            accessibilityLabel="Click here to create a shareable"
          />
        </View>
        }
        <TouchableOpacity
          style={styles.shareablesFTK}
        onPress={() => navigation.navigate('AboutScreen')}
        >
          <FTK
          />
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  landingScreenContainer : {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  shareablesFTK: {},
  landingScreenTitle: {},
  searchShareablesButton: {},
  createShareablesButton: {}
});

LandingScreen.propTypes = {

};

export default LandingScreen;
