import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';
import FTK from '../components/FTK';
import Button from '../components/Button';
import PageTitle from '../components/PageTitle';

import PropTypes from 'prop-types';

const LandingScreen = ({user}) => {
    return (
        <View>
          <View>
            <PageTitle>Welcome to Guttersnipe</PageTitle>
          </View>
          <View>
            <Button>Search Shareables</Button>
          </View>
          { user && (user.role === 'admin' || user.role === 'superadmin') &&
            <View>
              <Button>CreateShareable</Button>
            </View>
          }
          <View>
            <FTK/>
          </View>
        </View>
    );
};
const styles = StyleSheet.create({

});

LandingScreen.propTypes = {

};

export default LandingScreen;
