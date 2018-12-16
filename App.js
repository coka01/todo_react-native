/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput,
  TouchableOpacity, ScrollView, AsyncStorage} from 'react-native';
import TodoList from './TodoList';

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
    todos: [],
  }

  // コンストラクタ
  constructor(props) {
    super(props);
    this.loadTodos();
  }

  // テキストボックスのテキストが変更されるたびに呼ばれる処理
  onChangeText(newTodo) {
    this.setState({ newTodo });
  }

  // Addボタンタップ時の処理
  onPressAdd() {
    const { newTodo } = this.state;
    // setStateはすぐに反映されないため、setState()直後にstateを参照しても古い情報が返ってくる
    // 第二引数にcallbackを設定できるため、そこでデータ保存処理を行う
    this.setState ({
      newTodo: '',
      todos: [newTodo, ...this.state.todos],
    }, () => this.storeTodos());
  }

  // 削除ボタンタップ時の処理
  onPressDelete(index) {
    this.setState({
      // index番目の配列を抜いた配列を生成する
      todos: this.state.todos.filter((t, i) => i !== index),
    }, () => this.storeTodos());
  }

  // Todoの保存処理
  storeTodos() {
    // String配列をStringに変換する
    const str = JSON.stringify(this.state.todos);
    AsyncStorage.setItem('todos', str);
  }

  // 保存したTodoの読み出し処理
  loadTodos() {
    // 非同期で取得. 第二引数にはcallbackを設定できる.
    AsyncStorage.getItem('todos').then((str) => {
      // 値が取得できたらString配列に戻す
      const todos = str ? JSON.parse(str) : [];
      this.setState({todos});
    })
  }

  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.newTodo}
          style={styles.form}
          onChangeText={text => this.onChangeText(text)}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => this.onPressAdd()}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
        <TodoList
          todos={this.state.todos}
          onPressDelete={(index) => this.onPressDelete(index)} />
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
  addButton: {
    backgroundColor: '#333',
    padding: 14,
    borderRadius: 20,
    marginTop: 10,
  },
  addButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  }
});
