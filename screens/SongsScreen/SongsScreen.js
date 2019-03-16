import React from 'react';
import { StyleSheet } from 'react-native';
import { LoadSearchSongAction } from '../../redux/songs/actions';
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
      keyword: ''
    };
  }

  handleTextChanged = text => {
    this.props.LoadSearchSongAction(text);
    this.setState({
      keyword: text
    });
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
                <Text>Just try it! don't be afraid :D</Text>
              </CardItem>
            )}
            {!isEmpty(this.props.SongReducer.error) && (
              <CardItem bordered style={{ justifyContent: 'center' }}>
                <Text>{this.props.SongReducer.error}</Text>
              </CardItem>
            )}
            {this.props.SongReducer.data.map((item, index) => (
              <CardItem button bordered key={index}>
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
  SongReducer: state.SongReducer
});

const mapDispatchToProps = {
  LoadSearchSongAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SongsScreen);
