import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';

import PropTypes from 'prop-types';

const PageTitle = ({title}) => {
    return (
        <View>
            <Text>{title}</Text>
        </View>
    );
};
const styles = new StyleSheet({

});

PageTitle.propTypes = {

};

export default PageTitle;
