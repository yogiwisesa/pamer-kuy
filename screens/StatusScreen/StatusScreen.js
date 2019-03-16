import React from 'react';
import { StyleSheet, View } from 'react-native';
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

  handleShowActionSheet = () => {
    ActionSheet.show({
      options: ["I'm watching movie", "I'm listening music"],
      title: "What are you doing?"
    }, indexSelected => {
      this.handleNavigateActionSheet(indexSelected)
    })
  };

  handleNavigateActionSheet = (indexSelected) => {
    if (indexSelected === 1) {
      this.props.navigation.push('SongsScreen');
    } else {
      this.props.navigation.push('SongsScreen');
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

export default StatusScreen;
