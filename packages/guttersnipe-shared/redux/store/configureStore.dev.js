import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers";
import createSagaMiddleware from "redux-saga";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import logger from "redux-logger";
import rootSaga from "../sagas/shareables";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
//    initialState,
  composeEnhancers(applyMiddleware(
    sagaMiddleware,
    logger,
    reduxImmutableStateInvariant()
  ))
);

sagaMiddleware.run(rootSaga);
export {store};

