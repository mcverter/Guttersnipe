import React from "react";
import { createStackNavigator } from "react-navigation";
import LandingPage from "./pages/LandingPage";
import MapPage from "./pages/MapPage";
import KropotkinPage from "./pages/KropotkinPage";
import AboutPage from "./pages/AboutPage";
import ShareableDetailPage from "./pages/ShareableDetailPage";
import ChooseCategoryPage from "./pages/ChooseCategoryPage";
import ChooseSubcategoryPage from "./pages/ChooseSubcategoryPage";
import ShareablesPage from "./pages/ShareablesPage";
import AddShareablePage from "./pages/AddShareablePage";

export default createStackNavigator(
  {
    MapPage: MapPage,
    KropotkinPage: KropotkinPage,
    AboutPage: AboutPage,
    ShareableDetailPage: ShareableDetailPage,
    ChooseCategoryPage: ChooseCategoryPage,
    ChooseSubcategoryPage: ChooseSubcategoryPage,
    LandingPage: LandingPage,
    ShareablesPage: ShareablesPage,
    AddShareablePage: AddShareablePage
  },
  {
    initialRouteName: "LandingPage"
  }
);
