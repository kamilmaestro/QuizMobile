import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';

export default class TestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      tasks: [],
      questionNr: 0
    };
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(`http://tgryl.pl/quiz/test/${this.props.testId}`)
      .then(response => response.json())
      .then(json => {
        this.setState({
          id: json.id,
          name: json.name,
          tasks: json.tasks
        });
      })
  }

  render() {
    return (
      <View>
        <Text>Test: {this.state.name}</Text>
      </View>
    );
  }
}
