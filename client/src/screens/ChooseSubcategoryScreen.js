import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';
import PageTitle from '../components/PageTitle';
import Button from '../components/Button';

import PropTypes from 'prop-types';

const ChooseSubCategoryScreen = ({categories}) => {
  return (
    <View>
      <View>
        <PageTitle>Choose a Category</PageTitle>
      </View>
      {categories.map(c=><Button>{c}</Button>)
      }
    </View>
  );
};
const styles = new StyleSheet({

});

ChooseSubCategoryScreen.propTypes = {

};

export default ChooseSubCategoryScreen;
