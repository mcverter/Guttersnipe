import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';
import CommentList from '../components/CommentList'
import Shareable from '../components/Shareable';
import PageTitle from "../components/PageTitle";
import Map from "../components/Map";
import Button from "../components/Button";

import PropTypes from 'prop-types';


const ShareableDetailScreen = ({shareable,
                               comments}) => {
    return (
        <View>
          <View>
            <PageTitle>{shareable.name} Detail</PageTitle>
            <View>

            </View>
          </View>
          {/* Image ? */}
          <View>
            <Shareable {...shareable} />
          </View>
          <View>
            <Map />
          </View>
          <View>
            <CommentList comments={comments}/>
          </View>
          <View>
            <Button>Search {shareable.category}</Button>
            <Button>Search {shareable.subcategory}</Button>
          </View>
        </View>
    );
};
const styles = new StyleSheet({

});

ShareableDetailScreen.propTypes = {

};

export default ShareableDetailScreen;
