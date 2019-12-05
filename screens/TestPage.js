import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';

const tasks = [
  {
    'question': 'Bitwa pod grunwaldem:',
    'answers': [
      {
        'content': '1401',
        'isCorrect': false
      },
      {
        'content': '1405',
        'isCorrect': false
      },
      {
        'content': '1410',
        'isCorrect': true
      },
      {
        'content': '1411',
        'isCorrect': false
      },
    ],
    'duration': 30
  },
  {
    'question': 'Second:',
    'answers': [
      {
        'content': 'siedem',
        'isCorrect': false
      },
      {
        'content': 'dwa',
        'isCorrect': true
      },
      {
        'content': 'dwanaście',
        'isCorrect': false
      },
      {
        'content': 'osiem',
        'isCorrect': false
      },
    ],
    'duration': 30
  },
  {
    'question': 'third',
    'answers': [
      {
        'content': 'trzy',
        'isCorrect': true
      },
      {
        'content': 'who knows',
        'isCorrect': false
      },
      {
        'content': 'ehhh',
        'isCorrect': false
      },
      {
        'content': 'i dont know',
        'isCorrect': false
      },
    ],
    'duration': 30
  },
];

export default class TestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionNr: 0
    };
  }

  render() {
    return (
      <View>
        <Text>Test</Text>
      </View>
    );
  }
}
