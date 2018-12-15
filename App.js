/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  state = {
    newTodo: '',
  }

  onChangeText(newTodo) {
    this.setState({ newTodo });
  }

  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.form}
          onChangeText={text => this.onChangeText(text)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 60,
  },
  form: {
    backgroundColor: '#EEE',
    padding: 10,
  },
});
