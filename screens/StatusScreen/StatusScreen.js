import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import {
  ActionSheet,
  Container,
  Header,
  Title,
  Button,
  Text,
  Body,
  Content,
  Item,
  Form,
  Card,
  CardItem,
  Input,
  Textarea
} from 'native-base';

export class StatusScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Pamer Kuy'
    };
  };

  handleShowActionSheet = () => {
    ActionSheet.show({
      options: ["I'm listening music", "I'm watching movie",  "I'm watching TV Show"],
      title: "What are you doing?"
    }, indexSelected => {
      this.handleNavigateActionSheet(indexSelected);
    })
  };

  handleNavigateActionSheet = (indexSelected) => {
    console.log(indexSelected);
    if (indexSelected === 0) {
      this.props.navigation.push('SongsScreen');
    } else if (indexSelected === 1) {
      this.props.navigation.push('MovieScreen', { TypeOfMovie:'movie' });
    } else if (indexSelected === 2) {
      this.props.navigation.push('MovieScreen', { TypeOfMovie:'tv' });
    }
  };

  render() {
    return (
      <Container>
        <Content style={styles.contentContainer}>
          <Card>
            <CardItem>
              <Body>
                <Form style={{ flexDirection: 'row', ...styles.marginVertical}}>
                  <Textarea style={{ flex: 1}} placeholder="What are you thinking?" bordered />
                </Form>

                {!!this.props.ActivityReducer.generatedActivity.text && <Text style={styles.marginVertical}>{this.props.ActivityReducer.generatedActivity.text}</Text>}

                <Button onPress={this.handleShowActionSheet} full bordered>
                    <Text>What are you doing?</Text>
                  </Button>
              </Body>
            </CardItem>
          </Card>
          
            <Button full>
              <Text>Share it to the world!</Text>
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
    paddingTop: 8,
    paddingLeft: 8,
    paddingRight: 8
  },
  button: {
    width: 100
  }
});

const mapStateToProps = state => ({
  ActivityReducer: state.ActivityReducer
});

const mapDispatchToProps = {
  
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusScreen);