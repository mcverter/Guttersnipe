import {createStore, combineReducers, applyMiddleware} from 'redux';
import {routerReducer as router, routerMiddleware} from 'react-router-redux';
import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import fetchQuestionSaga from './sagas/fetch-question-saga';
import fetchQuestionsSaga from './sagas/fetch-questions-saga';
import * as reducers from './reducers';

export default function(history, defaultState={}) {
  const middleware = routerMiddleware(history);
  const sagaMiddleware = createSagaMiddleware();

  const middlewareChain = [middleware, sagaMiddleware];

  if (process.env.NODE_ENV=== 'development') {
    const logger = createLogger();
    middlewareChain.push(logger);
  }

  const store = createStore(combineReducers({
    ...reducers,
    router
  }), defaultState, applyMiddleware(...middlewareChain));

  sagaMiddleware.run(fetchQuestionSaga);
  sagaMiddleware.run(fetchQuestionsSaga);

  return store;
}

