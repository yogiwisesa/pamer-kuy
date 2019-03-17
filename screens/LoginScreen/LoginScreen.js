import React from 'react';
import { StyleSheet, Platform, StatusBar, View } from 'react-native';
import { Container, Content, Text, Button, Title, Toast } from 'native-base';
import { TWLoginButton } from 'react-native-simple-twitter';
import { connect } from 'react-redux';
import { SetTwitterTokenAction } from '../../redux/twitter/actions';
import { AsyncStorage } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

export class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  async componentDidMount() {
    console.log('kuy');
    try {
      const token = await AsyncStorage.getItem('pamerkuy-token@oauth_token');
      const tokenSecret = await AsyncStorage.getItem(
        'pamerkuy-token@oauth_token_secret'
      );

      if (token && tokenSecret) {
        this.props.SetTwitterTokenAction({
          token,
          tokenSecret
        });

        this.navigateToNextScreen();
      }
    } catch (err) {
      console.log(JSON.stringify(err, undefined, 2));
      console.log('Data not available!');
    }
  }

  onGetAccessToken = async token => {
    try {
      await AsyncStorage.clear();
      await AsyncStorage.setItem(
        'pamerkuy-token@oauth_token',
        token.oauth_token
      );
      await AsyncStorage.setItem(
        'pamerkuy-token@oauth_token_secret',
        token.oauth_token_secret
      );

      this.props.SetTwitterAction({
        token: token.oauth_token,
        tokenSecret: token.oauth_token_secret
      });

      this.navigateToNextScreen();
    } catch (error) {
      console.log(JSON.stringify(error, undefined, 2));
      Toast.show({
        text: `Login Failed!\n${error}`,
        buttonText: 'OK'
      });
    }
  };

  navigateToNextScreen() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'StatusScreen' })]
    });
    this.props.navigation.dispatch(resetAction);
  }

  onSuccess = user => {};

  onPress = () => {
    console.log('Pressed');
  };

  onClose = e => {
    Toast.show({
      text: `Login canceled!`,
      buttonText: 'OK'
    });
  };

  onError = err => {
    Toast.show({
      text: `Login Failed!\n${err}`,
      buttonText: 'OK'
    });
  };

  render() {
    return (
      <Container>
        <View style={styles.contentContainer}>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.pamerkuyTitle}>Pamer Kuy</Text>
            <Text style={styles.pamerkuySubitle}>
              Selalu pamerkan yang kau lakukan!
            </Text>
          </View>
          <Button full rounded onPress={() => console.log('kuy')}>
            <TWLoginButton
              style={{ width: '100%', height: 60 }}
              type="TouchableOpacity"
              onPress={this.onPress}
              onGetAccessToken={this.onGetAccessToken}
              onSuccess={this.onSuccess}
              onClose={this.onClose}
              onError={this.onError}
            >
              <Text style={{ textAlign: 'center' }}>Twitterでログインする</Text>
            </TWLoginButton>
          </Button>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingTop: 8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight
      },
      ios: {
        marginTop: StatusBar.currentHeight
      }
    })
  },
  pamerkuyTitle: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  pamerkuySubitle: {
    fontSize: 15,
    fontWeight: '100',
    color: '#A0A0A0'
  }
});

const mapStateToProps = state => ({
  TwitterReducer: state.TwitterReducer
});

const mapDispatchToProps = {
  SetTwitterTokenAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
