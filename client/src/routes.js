import React from 'react';
import {createStackNavigator} from 'react-navigation'
import LandingScreen from './screens/LandingScreen';
import MapScreen from './screens/MapScreen';
import KropotkinScreen from './screens/KropotkinScreen';
import AboutScreen from './screens/AboutScreen';
import ShareableListScreen from './screens/ShareableListScreen';
import ShareableDetailScreen from './screens/ShareableDetailScreen';
import ChooseCategoryScreen from './screens/ChooseCategoryScreen';
import ChooseSubcategoryScreen from './screens/ChooseSubcategoryScreen';

export default createStackNavigator({
  MapScreen: MapScreen,
  KropotkinScreen: KropotkinScreen,
  AboutScreen: AboutScreen,
  ShareableListScreen: ShareableListScreen,
  DetailScreen: ShareableDetailScreen,
  ChooseCategoryScreen: ChooseCategoryScreen,
  ChooseSubcategoryScreen: ChooseSubcategoryScreen,
  LandingScreen: LandingScreen,
}, {
  initialRouteName : 'LandingScreen'
});
