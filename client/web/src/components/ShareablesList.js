import React from "react";
import RaisedButton from "material-ui/RaisedButton";

import Shareable from "./Shareable";

export default (ShareablesList = ({ shareables, navigation }) => {
  return (
    <div>
      <FlatList
        style={styles.shareableList}
        data={shareables}
        renderItem={element => {
          const item = element.item;
          return (
            <div style={styles.shareableItemContainer}>
              <Shareable
                style={styles.shareableItem}
                shareable={item}
                navigation={navigation}
              />
              <RaisedButton
                style={styles.divDetailButton}
                color="orange"
                title="div Detail"
                onPress={() => {
                  navigation.navigate("ShareableDetailScreen", {
                    shareable: item
                  });
                }}
              />
            </div>
          );
        }}
        keyExtractor={(item, index) => `${index}`}
      />
    </div>
  );
});

const styles = StyleSheet.create({
  divMapButton: {},
  divDetailButton: {},
  shareableListContainer: {},
  shareableList: {},
  shareableItemContainer: {},
  shareableItem: {}
});
