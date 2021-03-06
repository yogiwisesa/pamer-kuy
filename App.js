import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { StyleProvider, getTheme, Root } from 'native-base';
import platform from './native-base-theme/variables/platform';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import tokens from './config/TwitterKeys';
import twitter from 'react-native-simple-twitter';
// At the top of your file
import { Ionicons } from '@expo/vector-icons';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  render() {
    const store = configureStore();

    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>

        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <StyleProvider style={getTheme(platform)}>
            <Root>
              <AppNavigator />
            </Root>
           </StyleProvider>
        </View>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    twitter.setConsumerKey(tokens.consumerKey, tokens.consumerSecret)

    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png')
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});

// ...Platform.select({
//   android: {
//     marginTop: StatusBar.currentHeight
//   }
// })