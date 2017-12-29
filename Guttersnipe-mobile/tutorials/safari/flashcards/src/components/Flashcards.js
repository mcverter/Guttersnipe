import React from "react";
import {StyleSheet, View} from "react-native";

import Heading from './Header';
import DeckScreen from './DecksScreen/DecksScreen';
import NewCardScreen from './NewCardScreen';
import ReviewScreen from './ReviewScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30
  }
});

const Flashcards = () => {
  const _renderScene = () => {
    return <DeckScreen/>
  }

  return (
    <View style={styles.container}>
      <Heading />
      {_renderScene()}
    </View>
  )
}
