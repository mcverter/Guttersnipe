import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  Button,
  StyleSheet
} from 'react-native';
import PageTitle from '../components/PageTitle';

import PropTypes from 'prop-types';

class ChooseSubCategoryScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const subcategories = this.props.subcategories;

    return (
      <View>
        <View>
          <PageTitle>Choose a Category</PageTitle>
        </View>
        {subcategories.map(s =>
          <Button
            onClick={() => goToSubcategory(s)}
          >{s}</Button>)
        }
      </View>
    );
  }
}
const styles = StyleSheet.create({

});

ChooseSubCategoryScreen.propTypes = {

};

export default ChooseSubCategoryScreen;
