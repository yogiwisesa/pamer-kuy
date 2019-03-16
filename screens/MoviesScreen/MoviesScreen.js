import React from 'react';
import { StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import moment from "moment";
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
import {
  LoadSearchMovieChooserAction,
  ResetSearchMovieAction
} from '../../redux/movies/actions';
import { GenerateNewActivityAction } from '../../redux/activity/actions';

export class MovieScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    let typeOf = navigation.getParam('TypeOfMovie', 'movie');
    if (typeOf === 'tv') {
      typeOf = 'tv show';
    }

    return {
      title: `Search your ${typeOf}!`
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      keyword: '',
      type: 'movie',
      generatedActivity: {
        type: '',
        text: ''
      }
    };
  }

  componentDidMount() {
    this.setState({
      type: this.props.navigation.getParam('TypeOfMovie', 'movie')
    });
    this.props.ResetSearchMovieAction();
  }

  handleTextChanged = text => {
    console.log('search...');
    this.props.LoadSearchMovieChooserAction(this.state.type, text.trim());
    this.setState({
      keyword: text
    });
  };

  handleGenerateActivity = index => {
    const selectedMovie = this.props.MovieReducer.data[index];
    this.setState(
      prevState => {
        let text = '';
        if (this.state.type === 'tv') {
          text = `📺 ${selectedMovie.original_name} (📅 ${
            moment(selectedMovie.first_air_date).format('YYYY')
          } - ⭐ ${selectedMovie.vote_average})`;
        } else {
          text = `🎬 ${selectedMovie.original_title} (📅 ${
            moment(selectedMovie.release_date).format('YYYY')
          } - ⭐ ${selectedMovie.vote_average})`;
        }

        return {
          generatedActivity: {
            type: prevState.type,
            text
          }
        };
      },
      () => {
        this.props.GenerateNewActivityAction(this.state.generatedActivity);
        this.props.navigation.pop();
      }
    );
  };

  render() {
    let placeholderSearch = '';
    if (this.state.type === 'tv') {
      placeholderSearch = 'Type your tv show here...';
    } else {
      placeholderSearch = 'Type your movie here..';
    }

    return (
      <Container>
        <Content style={styles.contentContainer}>
          <Item regular>
            <Input
              placeholder={placeholderSearch}
              onChangeText={this.handleTextChanged}
              value={this.state.keyword}
            />
          </Item>
          <Card>
            {this.props.MovieReducer.loading && !isEmpty(this.state.keyword) && (
              <CardItem bordered style={{ justifyContent: 'center' }}>
                <Spinner />
              </CardItem>
            )}
            {!this.state.keyword && isEmpty(this.props.MovieReducer.data) && (
              <CardItem bordered style={{ justifyContent: 'center' }}>
                <Text>Just try it! don't be afraid 😄</Text>
              </CardItem>
            )}
            {isEmpty(this.props.MovieReducer.data) &&
              !this.props.MovieReducer.loading &&
              !!this.state.keyword && (
                <CardItem>
                  <Text>Uh oh, Sorry, we can't find anything 😢</Text>
                </CardItem>
              )}

            {!isEmpty(this.props.MovieReducer.error) && (
              <CardItem bordered style={{ justifyContent: 'center' }}>
                <Text>{this.props.MovieReducer.error}</Text>
              </CardItem>
            )}
            {!isEmpty(this.props.MovieReducer.data) &&
              this.props.MovieReducer.data.map((item, index) => (
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
                          source={{
                            uri: `https://image.tmdb.org/t/p/w500${
                              item.poster_path
                            }`
                          }}
                        />
                      </Col>
                      {this.state.type === 'tv' && (
                        <Col size={75}>
                          <Text
                            style={{ fontWeight: 'bold', color: '#424242' }}
                          >
                            {`${item.original_name} (${moment(item.first_air_date).format('YYYY')})`}
                          </Text>
                          <Text style={{ color: '#424242' }}>
                            {item.vote_average}
                          </Text>
                        </Col>
                      )}
                      {this.state.type === 'movie' && (
                        <Col size={75}>
                          <Text
                            style={{ fontWeight: 'bold', color: '#424242' }}
                          >
                            {`${item.original_title} (${moment(item.release_date).format('YYYY')})`}
                          </Text>
                          <Text style={{ color: '#424242' }}>
                            {item.vote_average}
                          </Text>
                        </Col>
                      )}
                    </Grid>
                  </Body>
                </CardItem>
              ))}
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 8
  }
});

const mapStateToProps = state => ({
  MovieReducer: state.MovieReducer
});

const mapDispatchToProps = {
  LoadSearchMovieChooserAction,
  GenerateNewActivityAction,
  ResetSearchMovieAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieScreen);
