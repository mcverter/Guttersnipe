import React from 'react';
import { StackNavigator } from 'react-navigation';
import KropotkinScreen from './KropotkinScreen';
import DummyScreen from './DummyScreen';
import MapScreen from './MapScreen';
import ShareableListScreen from './ShareableListScreen';
import DetailScreen from './DetailScreen';
import SearchScreen from './SearchScreen';

const RootNavigator = StackNavigator({
  initialRouteName : {
    screen: KropotkinScreen
  },
  MapScreen : {
    screen: MapScreen
  },
  KropotkinScreen : {
    screen: KropotkinScreen
  },
  DummyScreen : {
    screen:  DummyScreen
  },
  ListScreen: {
    screen: ShareableListScreen
  },
  DetailScreen: {
    screen: DetailScreen
  },
  SearchScreen : {
    screen: SearchScreen
  }

});

export default RootNavigator;
