import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Button,
  Text
} from "react-native";
import Shareable from './Shareable';

export default ShareablesList = ({shareables, navigation}) => {
  return (
    <View>
    <FlatList
      style={styles.shareableList}
      data={shareables}
      renderItem={(element) => {
        const item = element.item;
        return (
          <View
            style={styles.shareableItemContainer}
          >
            <Shareable
              style={styles.shareableItem}
              shareable={item}
              navigation={navigation}/>
            <Button
              style={styles.viewDetailButton}
              color="orange"
              title="View Detail"
              onPress={() => {
                navigation.navigate('ShareableDetailScreen', {
                  shareable: item,
                })
              }}
            />
          </View>
        )
      }}
      keyExtractor={(item, index) => `${index}`}
    />
    </View>
  )
}
const styles = StyleSheet.create({
  viewMapButton: {},
  viewDetailButton: {},
  shareableListContainer: {},
  shareableList: {},
  shareableItemContainer: {},
  shareableItem: {}
});
