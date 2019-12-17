import React, {Component} from 'react';
import {View, ScrollView, StyleSheet, FlatList, RefreshControl, Text} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {Footer} from './../components/Footer'
import {TestOverview} from '../components/TestOverview';
import Regulations from './Regulations';
import _ from 'lodash'
import {Loader} from '../components/Loader';
import SQLite from 'react-native-sqlite-storage';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: true,
      tests: [],
      internetConnection: false
    };
  }

  componentDidMount() {
    this.fetchData()
  }

  onRefresh() {
    this.setState({ isFetching: true, internetConnection: false}, () => {
      this.fetchData()
    });
  }

  fetchData() {
    fetch('http://tgryl.pl/quiz/tests')
      .then(response => response.json())
      .then(json => {
        this.setState({
          isFetching: false,
          tests: _.shuffle(json),
          internetConnection: true
        });
      })
      .catch(e => {
        this.setState({ internetConnection: false});
        console.error(e);
      });
  }

  goToTest = (testId) => {
    this.goToScreen('TestPage', testId)
  };

  goToScreen = (screenName, testId) => {
    Navigation.push(this.props.componentId, {
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

  splitTags = (tags) => {
    return tags.join(' ')
  };

  render() {
    if (this.state.internetConnection === false || this.state.isFetching === true) {
      return (
        <Loader/>
      )
    } else {
      return (
        <View>
          <Regulations/>
          <ScrollView refreshControl={
            <RefreshControl refreshing={this.state.isFetching} onRefresh={() => this.onRefresh()}/>
          }>
            <FlatList data={this.state.tests}
                      renderItem={({item}) =>
                        <TestOverview click={() => this.goToTest(item.id)} name={item.name}
                                      tags={this.splitTags(item.tags)} description={item.description}/>
                      }
                      keyExtractor={(item, index) => index.toString()}
            />
            <View style={styles.footer}>
              <Footer click={() => this.goToScreen('Results')} text={'Check!'}/>
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}

const styles =StyleSheet.create({
  footer: {
    marginTop: 10,
    backgroundColor: '#0E7DDF'
  }
});
