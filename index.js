import React from 'react';
import {AppRegistry} from 'react-native';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';
import {name as appName} from './app.json';

import rootReducer from './src/services/rootReducer';

export const ROOTSTORE = createStore(
  rootReducer,
  undefined,
  applyMiddleware(thunk),
);

const RootApp = () => (
  <Provider store={ROOTSTORE}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => RootApp);
