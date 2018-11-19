import React from "react";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import MapPage from "./pages/MapPage";
import KropotkinPage from "./pages/KropotkinPage";
import AboutPage from "./pages/AboutPage";
import ShareableDetailPage from "./pages/ShareableDetailPage";
import ChooseCategoryPage from "./pages/ChooseCategoryPage";
import ChooseSubcategoryPage from "./pages/ChooseSubcategoryPage";
import ShareablesPage from "./pages/ShareablesPage";
import AddShareablePage from "./pages/AddShareablePage";

const GSRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/map" component={MapPage} />
      <Route path="/kropotkin" component={KropotkinPage} />
      <Route path="about" component={AboutPage} />
      <Route path="/shareable/:id" component={ShareableDetailPage} />
      <Route path="/category" component={ChooseCategoryPage} />
      <Route path="/subcategory" component={ChooseSubcategoryPage} />
      <Route path="/shareables" component={ShareablesPage} />
      <Route path="/add" component={AddShareablePage} />
    </Switch>
  </BrowserRouter>
)
export default GSRouter;
