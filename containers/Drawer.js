import React, {Component} from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {GoToBtn} from '../components/GoToBtn';
import {Navigation} from 'react-native-navigation';
import _ from 'lodash'

export default class Drawer extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      tests: []
    };
  }

  fetchData() {
    fetch('http://tgryl.pl/quiz/tests')
      .then(response => response.json())
      .then(json => {
        this.setState({
          isFetching: false,
          tests: json
        });
      })
      .catch(e => {
        console.error(e);
      });
  }

  randomTest() {
    if(typeof this.state.tests === 'undefined' || this.state.tests.length === 0) {
      this.fetchData();
      Alert.alert('Loading tests', 'Click again to get a random test');
    } else {
      let tests = this.state.tests.map(test => test.id);
      const randomId = _.sample(tests);
      this.goToTest(randomId);
    }
  }

  goToTest = (testId) => {
    this.goToScreen('TestPage', testId)
  };

  goToScreen = (screenName, testId) => {
    Navigation.mergeOptions('drawerId', {
      sideMenu: {
        left: {
          visible: false
        }
      }
    });
    Navigation.push('MAIN_STACK', {
      component: {
        name: screenName,
        options: {
          topBar: {
            title: {
              text: screenName === 'TestPage' ? 'Test' : screenName
            }
          }
        },
        passProps: {
          testId: testId
        }
      }
    })
  };

  render() {
    return (
      <View style={styles.drawerContainer}>
        <Text style={styles.titleTxt}>Quiz app</Text>
        <View style={styles.logoContainer}>
          <Icon style={styles.icon} name='wechat' size={125}/>
        </View>
        <View style={styles.btnContainer}>
          <GoToBtn onPress={() => this.goToScreen('HomePage')} screenName={'Home page'}/>
          <GoToBtn onPress={() => this.goToScreen('Results')} screenName={'Results'}/>
          <GoToBtn onPress={() => this.randomTest()} screenName={'Random test'}/>
          <GoToBtn onPress={() => this.fetchData()} screenName={'Get tests'}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  logoContainer: {
    margin: 10,
    alignItems: 'center'
  },
  titleTxt: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'RobotoCondensed-Regular'
  },
  icon: {
    color: '#0E7DDF'
  },
  btnContainer: {
    margin: 10
  }
});
