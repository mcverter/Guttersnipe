import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Button
} from 'react-native';
import FTK from '../components/FTK';
import PageTitle from '../components/PageTitle';

import PropTypes from 'prop-types';

class LandingScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <View>
          <PageTitle>Welcome to Guttersnipe</PageTitle>
        </View>
        <View>
          <Button
            onPress={() => {
            }}
          >Search Shareables</Button>
        </View>
        {user && (user.role === 'admin' || user.role === 'superadmin') &&
        <View>
          <Button>CreateShareable</Button>
        </View>
        }
        <View>
          <FTK
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({

});

LandingScreen.propTypes = {

};

export default LandingScreen;
