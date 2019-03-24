import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import StatusScreen from '../screens/StatusScreen/StatusScreen';
import SongsScreen from '../screens/SongsScreen/SongsScreen';
import MovieScreen from '../screens/MoviesScreen/MoviesScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';

export default createAppContainer(createStackNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  LoginScreen,
  StatusScreen,
  SongsScreen,
  MovieScreen
}));