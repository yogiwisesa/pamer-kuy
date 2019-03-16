import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import StatusScreen from '../screens/StatusScreen/StatusScreen';
import SongsScreen from '../screens/SongsScreen/SongsScreen';

export default createAppContainer(createStackNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  SongsScreen: SongsScreen,
  StatusScreen: StatusScreen,
}));