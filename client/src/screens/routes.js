import React from 'react';
import { StackNavigator } from 'react-navigation';
import LandingScreen from './LandingScreen';
import KropotkinScreen from './KropotkinScreen';
import MapScreen from './MapScreen';
import AboutScreen from './AboutScreen';
import ChooseCategoryScreen from './ChooseCategoryScreen';
import ChooseSubcategoryScreen from './ChooseSubcategoryScreen';
import ShareableDetailScreen from './ShareableDetailScreen';
import ShareableListScreen from './ShareableListScreen';

const RootNavigator = StackNavigator({
  initialRouteName : {
    screen: LandingScreen
  },
  MapScreen : {
    screen: MapScreen
  },
  KropotkinScreen : {
    screen: KropotkinScreen
  },
  AboutScreen : {
    screen: AboutScreen
  },
  ChooseCategoryScreen : {
    screen: ChooseCategoryScreen
  },
  ChooseSubcategoryScreen : {
    screen: ChooseSubcategoryScreen
  },
  ShareableDetailScreen : {
    screen: ShareableDetailScreen
  },
  ShareableListScreen : {
    screen: ShareableListScreen
  },
});

export default RootNavigator;
