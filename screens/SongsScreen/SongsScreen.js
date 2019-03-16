import React from 'react';
import { StyleSheet, Alert } from 'react-native';
import { LoadSearchSongAction } from '../../redux/songs/actions';
import { GenerateNewActivityAction } from '../../redux/activity/actions';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import {
  Container,
  Content,
  Text,
  Input,
  Item,
  List,
  ListItem,
  Thumbnail,
  Card,
  CardItem,
  Body,
  Grid,
  Col,
  Spinner,
  Toast
} from 'native-base';

export class SongsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Search your song!'
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      keyword: '',
      generatedActivity: {
        type: '',
        text: ''
      }
    };
  }

  handleTextChanged = text => {
    this.props.LoadSearchSongAction(text.trim());
    this.setState({
      keyword: text
    });
  };

  handleGenerateActivity = index => {
    const selectedSong = this.props.SongReducer.data[index];
    this.setState(
      {
        generatedActivity: {
          type: 'song',
          text: `Listening 🎵 ${selectedSong.name} by ${selectedSong.artist}`
        }
      },
      () => {
        this.props.GenerateNewActivityAction(this.state.generatedActivity);
        this.props.navigation.pop();
      }
    );
  };

  render() {
    return (
      <Container>
        <Content style={styles.contentContainer}>
          <Item regular>
            <Input
              placeholder="Type your song here..."
              onChangeText={this.handleTextChanged}
              value={this.state.keyword}
            />
          </Item>
          <Card>
            {this.props.SongReducer.loading && !isEmpty(this.state.keyword) && (
              <CardItem bordered style={{ justifyContent: 'center' }}>
                <Spinner />
              </CardItem>
            )}
            {!this.state.keyword && isEmpty(this.props.SongReducer.data) && (
              <CardItem bordered style={{ justifyContent: 'center' }}>
                <Text>Just try it! don't be afraid 😄</Text>
              </CardItem>
            )}
            {isEmpty(this.props.SongReducer.data) && !this.props.SongReducer.loading && !!this.state.keyword && (
              <CardItem>
                <Text>Uh oh, Sorry, we can't find anything 😢</Text>
              </CardItem>
            )}

            {!isEmpty(this.props.SongReducer.error) && (
              <CardItem bordered style={{ justifyContent: 'center' }}>
                <Text>{this.props.SongReducer.error}</Text>
              </CardItem>
            )}
            {this.props.SongReducer.data.map((item, index) => (
              <CardItem
                button
                bordered
                key={index}
                onPress={() => {
                  this.handleGenerateActivity(index);
                }}
              >
                <Body>
                  <Grid>
                    <Col size={25}>
                      <Thumbnail
                        square
                        source={{
                          uri: item.image[2]['#text']
                        }}
                      />
                    </Col>
                    <Col size={75}>
                      <Text style={{ fontWeight: 'bold', color: '#424242' }}>
                        {item.name}
                      </Text>
                      <Text style={{ color: '#424242' }}>{item.artist}</Text>
                    </Col>
                  </Grid>
                </Body>
              </CardItem>
            ))}
          </Card>
        </Content>
      </Container>
    );
  };
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 8
  }
});

const mapStateToProps = state => ({
  SongReducer: state.SongReducer
});

const mapDispatchToProps = {
  LoadSearchSongAction,
  GenerateNewActivityAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SongsScreen);
