import React from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
} from 'react-native'

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#DDD',
  },
  todoContainer: {
    backgroundColor: '#FFF',
    padding: 10,
  }
});

export default (props) => (
  <ScrollView style={styles.scrollView}>
    {
      props.todos.map((todo, index) => (
        <View key={todo+index} style={styles.todoContainer}>
          <Text key={todo + index}>{todo}</Text>
        </View>
      ))
    }
  </ScrollView>
);
