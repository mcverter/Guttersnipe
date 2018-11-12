import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import MapPage from "./pages/MapPage";
import KropotkinPage from "./pages/KropotkinPage";
import AboutPage from "./pages/AboutPage";
import ShareableDetailPage from "./pages/ShareableDetailPage";
import ChooseCategoryPage from "./pages/ChooseCategoryPage";
import ChooseSubcategoryPage from "./pages/ChooseSubcategoryPage";
import ShareablesPage from "./pages/ShareablesPage";
import AddShareablePage from "./pages/AddShareablePage";

const Router = () => (
 <Router>
	<Route exact path="/" component={LandingPage} />
	<Route path="/map" component={MapPage} />
	<Route path="/kropotkin" component={KropotkinPage} />
	<Route path="about" component={AboutPage} />
	<Route path="/shareable/:id" component={ShareableDetailPage} />
	<Route path="/category" component={ChooseCategoryPage} />
	<Route path="/subcategory" component={ChooseSubcategorylPage} />
	<Route path="/shareables" component={ShareablesPage} />
	<Route path="/add" component={AddShareablePage} />
</Router>
)
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
