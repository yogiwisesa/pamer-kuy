import React from 'react';
import { StyleSheet, Platform, StatusBar, View } from 'react-native';
import { Container, Content, Text, Button, Title } from 'native-base';

export class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <Container>
        <View style={styles.contentContainer}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.pamerkuyTitle}>Pamer Kuy</Text>
            <Text style={styles.pamerkuySubitle}>
              Selalu pamerkan apa yang kau lakukan!
            </Text>
          </View>
          <Button full rounded>
            <Text>Login Twitter</Text>
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
  },
  layoutBottom: {
    position: 'absolute',
    bottom: 0
  }
});

export default LoginScreen;
