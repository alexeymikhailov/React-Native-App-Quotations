import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import { Provider } from 'react-redux';
import AppNavigator from './navigation/AppNavigator';
import configureStore from './store';
import {
  emitActiveScreen
} from './actions';

const store=configureStore();

const getCurrentRouteName=(navigationState) => {
  if (!navigationState) {
    return null;
  }

  const route=navigationState.routes[navigationState.index];

  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator onNavigationStateChange={(prevState, currentState) => {
          const currentScreen=getCurrentRouteName(currentState);
          const prevScreen=getCurrentRouteName(prevState);

          if (prevScreen !== currentScreen) {
            store.dispatch(emitActiveScreen(currentScreen));
          }
        }} />
      </Provider>
    );
  }
}

export default App;
