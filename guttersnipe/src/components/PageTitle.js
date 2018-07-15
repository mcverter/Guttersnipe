import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';


const PageTitle = (props) => {
  const title = props.title;
    return (
        <View>
            <Text>{title}</Text>
        </View>
    );
};
const styles = StyleSheet.create({

});

PageTitle.propTypes = {

};

export default PageTitle;
