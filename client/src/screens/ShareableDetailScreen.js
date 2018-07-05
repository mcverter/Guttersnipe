import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';
import CommentList from '../components/CommentList'
import Shareable from '../components/Shareable';
import PageTitle from "../components/PageTitle";
import Map from "../components/Map";
import PropTypes from 'prop-types';


class ShareableDetailScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {shareable, comments} = this.props;
    return (
      <View>
        <Text>Hello</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});

ShareableDetailScreen.propTypes = {

};

export default ShareableDetailScreen;


/*
        <View>
          <PageTitle>{shareable.name} Detail</PageTitle>
          <View>

          </View>
        </View>
        { Image ? }
<View>
  <Shareable {...shareable} />
</View>
<View>
<Map/>
</View>
<View>
  <CommentList comments={comments}/>
</View>
<View>
<Button>Search {shareable.category}</Button>
<Button>Search {shareable.subcategory}</Button>
</View>

 */
