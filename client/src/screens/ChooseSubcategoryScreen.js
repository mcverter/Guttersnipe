import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Text,
  View,
  Image,
  Button,
  StyleSheet
} from 'react-native';
import PageTitle from '../components/PageTitle';

import PropTypes from 'prop-types';

class ChooseSubcategoryScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const categorization = this.props.categorization;
    const { navigation } = this.props;
    const category = navigation.getParam('category', '');
    const subcategories = categorization[category];

    return (
      <View>
        <View>
          <PageTitle>Choose a Category</PageTitle>
        </View>
        {subcategories.map(s =>
          <Button
            key={s}
            title={s}
            onPress={()=>{
              this.props.navigation.navigate('ShareableListScreen', {
                subcategory: s
              });
            }}
          >{s}
          </Button>)}
      </View>
    );
  }
}
const styles = StyleSheet.create({

});

ChooseSubcategoryScreen.propTypes = {

};

function mapDispatchToProps(dispatch){
  return {};
}

function mapStateToProps(state) {
  return {
    categorization: state.categorization.categorization,
  };
}


export default connect(mapStateToProps, mapDispatchToProps) (ChooseSubcategoryScreen);
