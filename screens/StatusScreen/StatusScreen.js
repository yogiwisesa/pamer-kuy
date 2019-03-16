import React from 'react';
import { View, StyleSheet, TextInput, Button, SafeAreaView } from 'react-native';

export class StatusScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
          <View style={{flex: 1}}>
          <Button title="What are you doing?"/>
          <Button title="Tell the world now!"/>
          <TextInput style={{padding: 4, borderWidth: 1}}placeholder="What are you thinking?"/>
      </View>
      </SafeAreaView>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flex: 1
  },
  spaceVertical: {
    marginBottom: 10,
  }
}); 

export default StatusScreen;