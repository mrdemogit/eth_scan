import { createStore, applyMiddleware, compose } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { createRootEpics, createRootReducer } from '.';
import { createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';
import * as datasource from '../Datasource';

export const history = createHistory();

const initialState = {};
const enhancers = [];
const epicMiddleware = createEpicMiddleware({ dependencies: { datasource } });
const middleware = [];

middleware.push(epicMiddleware);

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({
    collapsed: true,
  });
  middleware.push(logger);

  // @ts-ignore
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers,
);

export default () => {
  const store = createStore(
    createRootReducer(),
    initialState,
    composedEnhancers,
  );
  epicMiddleware.run(createRootEpics());
  return store;
};
