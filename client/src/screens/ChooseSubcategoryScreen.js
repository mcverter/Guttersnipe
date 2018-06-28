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

const ChooseSubCategoryScreen = ({subcategories}) => {
  return (
    <View>
      <View>
        <PageTitle>Choose a Category</PageTitle>
      </View>
      {subcategories.map(s=>
        <Button
          onClick={()=>goToSubcategory(s)}
        >{s}</Button>)
      }
    </View>
  );
};
const styles = StyleSheet.create({

});

ChooseSubCategoryScreen.propTypes = {

};

export default ChooseSubCategoryScreen;
