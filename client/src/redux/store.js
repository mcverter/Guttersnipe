const appConfig = require('../../../config/main');
import { createStore, applyMiddleware, compose } from 'redux';
// import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

export function configureStore(history, initialState?: Store): Redux.Store<Store> {

  const middlewares: Redux.Middleware[] = [
//  routerMiddleware(history),
  thunk,
];

/** Add Only Dev. Middlewares */
if (appConfig.env !== 'production' && process.env.BROWSER) {
  const logger = createLogger();
  middlewares.push(logger);
}

const composeEnhancers = (appConfig.env !== 'production' &&
  typeof window === 'object' &&
  composeWithDevTools) || compose;

const store: Redux.Store<Store> = createStore(rootReducer, initialState, composeEnhancers(
  applyMiddleware(...middlewares),
));

if (appConfig.env === 'development' && (module as any).hot) {
  (module as any).hot.accept('./rootReducer', () => {
    store.replaceReducer((require('./rootReducer')));
  });
}

return store;
}
