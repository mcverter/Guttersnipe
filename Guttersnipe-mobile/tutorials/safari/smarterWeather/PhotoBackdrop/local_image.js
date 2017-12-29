import React from "react";
import {Image} from "react-native"
import styles from "./style";

export default PhotoBackdrop = ({children}) => (
  <Image
    style={styles.backdrop}
    source={require("./flowers.png")}
    resizeMode="cover"
  >
    {children}
  </Image>
)
