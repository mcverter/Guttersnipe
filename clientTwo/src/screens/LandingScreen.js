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
  constructor(props) {
    super(props);
  }

  render() {
    const {user, navigation} = this.props;
    return (
      <View>
        <View>
          <PageTitle>
            <Text>Welcome to Guttersnipe</Text>
          </PageTitle>
        </View>
        <View>
          <Button
            title="Search Shareables"
            onPress={() => navigation.navigate('ChooseCategoryScreen')}/>
        </View>
        {user && (user.role === 'admin' || user.role === 'superadmin') &&
        <View>
          <Button title="CreateShareable"/>
        </View>
        }
        <TouchableOpacity
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

});

LandingScreen.propTypes = {

};

export default LandingScreen;
