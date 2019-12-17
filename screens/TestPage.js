import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, TextInput} from 'react-native';
import {TestHeader} from '../components/TestHeader';
import {Loader} from '../components/Loader';
import shortId from 'shortid';
import {Navigation} from 'react-native-navigation';
import {TestResult} from '../components/TestResult';
import _ from 'lodash'

export default class TestPage extends Component {
  constructor(props) {
    super(props);
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
      questionNr: 0,
      isFetching: true,
      nick: ''
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(`http://tgryl.pl/quiz/test/${this.props.testId}`)
      .then(response => response.json())
      .then(json => {
        this.setState({
          id: json.id,
          name: json.name,
          tasks: _.shuffle(json.tasks),
          isFetching: false
        });
      })
      .catch(e => {
        console.error(e);
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

  newQuestion(isCorrect) {
    this.checkQuestion(isCorrect);
    this.setState(() => ({
      isFetching: false
    }));
  }

  checkQuestion(isCorrect) {
    this.setState({
      isFetching: true,
      score: isCorrect ? this.state.score + 1 : this.state.score,
      questionNr: this.state.questionNr + 1
    });
  }

  saveTestResults = () => {
    fetch('http://tgryl.pl/quiz/result', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nick: this.state.nick,
        score: this.state.score,
        total: this.state.tasks.length,
        type: this.state.name,
        date: new Date().toISOString().split('T')[0]
      }),
    })
    .then(() => {
      Navigation.pop('MAIN_STACK');
    })
    .catch((e) => {
      alert(e);
    });
  };

  render() {
    if(this.state.isFetching === true) {
      return (
        <Loader/>
      )
    } else {
      if(this.state.questionNr === this.state.tasks.length) {
        return (
          <View>
            <TestResult score={this.state.score}
                        testLength={this.state.tasks.length}
                        saveResults={() => this.saveTestResults()}
                        setNick={nick => this.setState({nick})}
                        nick={this.state.nick}
            />
          </View>
        );
      } else {
        let answers = [];
        this.state.tasks[this.state.questionNr].answers.map(answer => {
          answers.push(
            <TouchableOpacity key={shortId.generate()} style={styles.answerBtn} onPress={() => this.newQuestion(answer.isCorrect)}>
              <Text style={styles.answerBtnText}>{answer.content}</Text>
            </TouchableOpacity>
          );
        });

        return (
          <View>
            <TestHeader questionNr={this.state.questionNr}
                        questionsLength={this.state.tasks.length}
                        timeLeft={this.state.tasks ? this.state.tasks[this.state.questionNr].duration : ''}
            />
            <View style={styles.testBody}>
              <Text style={styles.testQuestion}>{this.state.tasks[this.state.questionNr].question}</Text>
              <View style={styles.answers}>
                {_.shuffle(answers)}
              </View>
            </View>
          </View>
        );
      }
    }
  }
}

const styles = StyleSheet.create({
  testBody: {
    margin: 5
  },
  sendingTxt: {

  },
  testQuestion: {
    margin: 5,
    fontSize: 22
  },
  answers: {
    marginTop: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1.5,
    borderColor: '#0E7DDF',
    borderRadius: 20
  },
  answerBtn: {
    width: '100%',
    alignItems: 'center',
    margin: 5,
    borderWidth: 1.5,
    borderColor: '#0E7DDF',
    borderRadius: 20,
    alignSelf: 'center'
  },
  answerBtnText: {
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 5
  }
});
