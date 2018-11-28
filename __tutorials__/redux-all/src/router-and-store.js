import rootReducer from "";
import ReduxComponentConnect from "./ReduxComponent";

const store = createStore(
  rootReducer,
//  window.__REDUX
);

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ReduxComponentConnect} />
    </Router>
  </Provider>
  , document.querySelector('.js-main')
);
