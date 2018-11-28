import rootReducer from "";
import ReduxComponentConnect from "./ReduxComponent";
const sagaMiddleware = createSagaMiddleWare();

const store = createStore(
  rootReducer,
//  window.__REDUX,
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run();
render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ReduxComponentConnect} />
    </Router>
  </Provider>
  , document.querySelector('.js-main')
);
