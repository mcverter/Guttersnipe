import React from "react";
import RaisedButton from "material-ui/RaisedButton";

import Shareable from "./Shareable";

const ShareablesList = ({ shareables, navigation }) => {
  return (
    <div>
      <ul>
        {shareables.map(s=>(
          <li>
            <Shareable
              style={styles.shareableItem}
              navigation={navigation}
              shareable={s}/>
            <RaisedButton
              style={styles.divDetailButton}
              color="orange"
              title="div Detail"
              onPress={() => {
                navigation.navigate("ShareableDetailScreen", {
                  shareable: s
                });
              }}
            />
          </li>))}
      </ul>
    </div>
  );
};

const styles = {
  divMapButton: {},
  divDetailButton: {},
  shareableListContainer: {},
  shareableList: {},
  shareableItemContainer: {},
  shareableItem: {}
};

export default ShareablesList;
