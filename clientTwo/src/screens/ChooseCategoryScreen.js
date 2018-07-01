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

class ChooseCategoryScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const categories = this.props.categories;

    return (
      <View>
        <View>
          <PageTitle>Choose a Category</PageTitle>
        </View>
        {categories.map(c =>
          <Button
            onClick={() => goToCategory(c)}
          >{c}
          </Button>)}
      </View>
    );
  }
}
const styles = StyleSheet.create({

});

ChooseCategoryScreen.propTypes = {

};

export default ChooseCategoryScreen;
