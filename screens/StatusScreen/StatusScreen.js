import React from 'react';
import { StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import twitter from 'react-native-simple-twitter';
import { StackActions, NavigationActions } from 'react-navigation';
import {AsyncStorage} from 'react-native';
import {
  ActionSheet,
  Container,
  Button,
  Text,
  Body,
  Content,
  Form,
  Card,
  CardItem,
  Icon,
  Textarea,
  Toast,
  Spinner
} from 'native-base';

export class StatusScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Pamer Kuy',
      headerLeft: null,
      headerRight: (
        <Button transparent onPress={navigation.getParam('handleLogout')}>
          <Icon name="close-circle-outline" style={{ margin: 8 }} />
        </Button>
      )
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      twitterToken: {
        token: '',
        tokenSecret: ''
      },
      generatedTextToPost: '',
      statusText: '',
      isPostingTwitterLoading: false
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({ handleLogout: this.handleLogout })

    const { token, tokenSecret } = this.props.TwitterReducer.token;
    console.log(`ya ${token} ${tokenSecret}`);
    if (token && tokenSecret) {
      this.setState({
        twitterToken: {
          token,
          tokenSecret
        }
      });
    } else {
      this.navigateToLoginScreen();
    }
  }

  handleLogout = async () => {
    await AsyncStorage.clear();
    this.navigateToLoginScreen();
  };

  handleStatusChange = text => {
    this.setState({
      statusText: text
    });
  };

  handleGenerateText = () => {
    if (this.props.ActivityReducer.generatedActivity.text) {
      if (this.state.statusText) {
        this.setState(
          prevState => {
            return {
              generatedTextToPost: `${prevState.statusText} ${
                this.props.ActivityReducer.generatedActivity.text
              }`
            };
          },
          () => this.handlePostToTwitter()
        );
      } else {
        this.setState(
          prevState => {
            return {
              generatedTextToPost: `${
                this.props.ActivityReducer.generatedActivity.text
              }`
            };
          },
          () => this.handlePostToTwitter()
        );
      }
    } else {
      Toast.show({
        text: `Tell me what you do!! 😡`
      });
      return false;
    }
  };

  handlePostToTwitter = () => {
    this.setState({
      isPostingTwitterLoading: true
    });

    twitter.setAccessToken(
      this.state.twitterToken.token,
      this.state.twitterToken.tokenSecret
    );

    twitter
      .post('statuses/update.json', { status: this.state.generatedTextToPost })
      .then(r => {
        if (!r.errors) {
          Toast.show({
            text: `Shared successfully! 🎉🎉🎉`,
            buttonText: 'OK'
          });
        } else {
          console.log(JSON.stringify(r.errors, undefined, 2));
          Toast.show({
            text: `Post Failed!\n${JSON.stringify(r.errors, undefined, 2)}`,
            buttonText: 'OK'
          });
        }
        this.setState({
          isPostingTwitterLoading: false
        });
      })
      .catch(e => {
        console.log(JSON.stringify(e));
        this.setState({
          isPostingTwitterLoading: false
        });
      });
  };

  handleShowActionSheet = () => {
    ActionSheet.show(
      {
        options: [
          "I'm listening music",
          "I'm watching movie",
          "I'm watching TV Show"
        ],
        title: 'What are you doing?'
      },
      indexSelected => {
        this.handleNavigateActionSheet(indexSelected);
      }
    );
  };

  handleNavigateActionSheet = indexSelected => {
    if (indexSelected === 0) {
      this.props.navigation.push('SongsScreen');
    } else if (indexSelected === 1) {
      this.props.navigation.push('MovieScreen', { TypeOfMovie: 'movie' });
    } else if (indexSelected === 2) {
      this.props.navigation.push('MovieScreen', { TypeOfMovie: 'tv' });
    }
  };

  navigateToLoginScreen() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'LoginScreen' })]
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.contentContainer}>
          <Card>
            <CardItem>
              <Body>
                <Form
                  style={{ flexDirection: 'row', ...styles.marginVertical }}
                >
                  <Textarea
                    style={{ flex: 1 }}
                    placeholder="What are you thinking?"
                    onChangeText={this.handleStatusChange}
                    value={this.state.statusText}
                    bordered
                  />
                </Form>

                {!!this.props.ActivityReducer.generatedActivity.text && (
                  <Text style={styles.marginVertical}>
                    {this.props.ActivityReducer.generatedActivity.text}
                  </Text>
                )}

                <Button
                  onPress={this.handleShowActionSheet}
                  full
                  bordered
                  style={{ marginBottom: 8 }}
                >
                  <Text>What are you doing?</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>

          <Button
            onPress={this.handleGenerateText}
            disabled={this.state.isPostingTwitterLoading}
            full
          >
            {this.state.isPostingTwitterLoading ? (
              <Spinner />
            ) : (
              <Text>Share it to the world! 🌎</Text>
            )}
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  marginVertical: {
    marginBottom: 8
  },
  contentContainer: {
    padding: 8,
    justifyContent: 'space-between',
    flex: 1
  },
  button: {
    width: 100
  }
});

const mapStateToProps = state => ({
  ActivityReducer: state.ActivityReducer,
  TwitterReducer: state.TwitterReducer
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusScreen);
