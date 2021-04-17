import React, {Component} from 'react';
import {SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';
import Navigation from './src/components/navigation/Index';
import store from './src/components/services/store';

export default class App extends Component {
  render() {
    return (
      <>
        <SafeAreaView />
        <Provider store={store}>
          <Navigation />
        </Provider>
      </>
    );
  }
}
