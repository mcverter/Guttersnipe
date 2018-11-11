import React from "react";
import { createStackNavigator } from "react-navigation";
import LandingScreen from "./pages/LandingScreen";
import MapScreen from "./pages/MapScreen";
import KropotkinScreen from "./pages/KropotkinScreen";
import AboutScreen from "./pages/AboutScreen";
import ShareableDetailScreen from "./pages/ShareableDetailScreen";
import ChooseCategoryScreen from "./pages/ChooseCategoryScreen";
import ChooseSubcategoryScreen from "./pages/ChooseSubcategoryScreen";
import ShareablesScreen from "./pages/ShareablesScreen";
import AddShareableScreen from "./pages/AddShareableScreen";

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
