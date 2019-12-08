import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {TestHeader} from '../components/TestHeader';

export default class TestPage extends Component {
  constructor(props) {
    super(props);
    //this.fetchData();
    this.state = {
      id: '',
      name: '',
      tasks: [{
        question: '',
        answers: [{
          content: '',
          isCorrect: false
        }],
        duration: 0
      }],
      score: 0,
      questionNr: 0
    };
  }

  componentWillMount() {
    this.fetchData();
    //this.countTimeLeft();
  }

  fetchData() {
    fetch(`http://tgryl.pl/quiz/test/${this.props.testId}`)
      .then(response => response.json())
      .then(json => {
        this.setState(() => ({
          id: json.id,
          name: json.name,
          tasks: json.tasks
        }));
      })
  }

  countTimeLeft() {
    let timer = setInterval(countdown, 1000);
    let timeLeft = this.state.tasks[this.state.questionNr].duration;

    const countdown = () => {
      timeLeft === 0 ?
        this.state.questionNr++ : timeLeft--;
    }
  }

  // newQuestion() {
  //   this.setState(() => ({
  //     questionNr: this.state.questionNr + 1
  //   }));
  // }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View>
          {console.log(this.state.tasks[1])}
          <TestHeader questionNr={this.state.questionNr}
                      questionsSize={this.state.tasks.length}
                      timeLeft={this.state.tasks[this.state.questionNr].duration}
                      />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {

  }
});
