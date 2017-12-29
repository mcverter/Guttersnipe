import React, {Component} from "react";
import Button from "./../Button";
import styles from './style';

const style = {backgroundColor: "#DDD"}

export default LocationButton = props => {
  const _onPress = () => {
    navigator.geolocation.getCurrentPosition(
      initialPosition => {
        props.onGetCoords(
          initialPosition.coords.latitude,
          initialPosition.coords.longitude

        );
      },
      {enableHighAccuracy: true, timeout: 2000, maximumAge: 1000}
    )

    return (
      <Button
      label="Use Current Location"
      style={style}
      onPress={_onPress}
      />
    )
  }
}
