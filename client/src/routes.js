import React from 'react';
import { StackNavigator } from 'react-navigation';
import LandingScreen from './screens/LandingScreen';
import KropotkinScreen from './screens/KropotkinScreen';
import MapScreen from './screens/MapScreen';
import AboutScreen from './screens/AboutScreen';
import ChooseCategoryScreen from './screens/ChooseCategoryScreen';
import ChooseSubcategoryScreen from './screens/ChooseSubcategoryScreen';
import ShareableDetailScreen from './screens/ShareableDetailScreen';
import ShareableListScreen from './screens/ShareableListScreen';

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
