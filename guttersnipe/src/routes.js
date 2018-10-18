import React from "react";
import { createStackNavigator } from "react-navigation";
import LandingScreen from "./screens/LandingScreen";
import MapScreen from "./screens/MapScreen";
import KropotkinScreen from "./screens/KropotkinScreen";
import AboutScreen from "./screens/AboutScreen";
import ShareableDetailScreen from "./screens/ShareableDetailScreen";
import ChooseCategoryScreen from "./screens/ChooseCategoryScreen";
import ChooseSubcategoryScreen from "./screens/ChooseSubcategoryScreen";
import ShareablesScreen from "./screens/ShareablesScreen";
import AddShareableScreen from "./screens/AddShareableScreen";

export default createStackNavigator(
  {
    MapScreen: MapScreen,
    KropotkinScreen: KropotkinScreen,
    AboutScreen: AboutScreen,
    ShareableDetailScreen: ShareableDetailScreen,
    ChooseCategoryScreen: ChooseCategoryScreen,
    ChooseSubcategoryScreen: ChooseSubcategoryScreen,
    LandingScreen: LandingScreen,
    ShareablesScreen: ShareablesScreen,
    AddShareableScreen: AddShareableScreen
  },
  {
    initialRouteName: "LandingScreen"
  }
);
