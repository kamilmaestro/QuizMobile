import React, {Component} from 'react';
import {View, ScrollView, StyleSheet, FlatList, RefreshControl, AsyncStorage} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {Footer} from './../components/Footer'
import {TestOverview} from '../components/TestOverview';
import Regulations from './Regulations';
import _ from 'lodash'
import {Loader} from '../components/Loader';
import SQLite from 'react-native-sqlite-storage';

let DB;
const getDB = () => DB ? DB : DB = SQLite.openDatabase({ name: 'sqlitedb.db', createFromLocation: 1 });

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    getDB();
    this.state = {
      isFetching: true,
      tests: [],
      internetConnection: false
    };
  }

  componentDidMount = async() => {
    try {
      const value = await AsyncStorage.getItem('databaseDownloadDate');
      if (value == null) {
        this.fetchData();
      } else {
        let now = new Date();
        let then = new Date(JSON.parse(value).value);
        const utc1 = Date.UTC(then.getFullYear(), then.getMonth(), then.getDate());
        const utc2 = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
        if( Math.floor((utc1-utc2) / 86400000) >= 1 ) {
          this.fetchData();
        } else {
          this.downloadDataFromDatabase(DB);
        }
      }
    } catch (error) {}
  };

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
        this.addTestsToDatabase(DB, json);
        this.downloadTestData();
      })
      .catch(e => {
        this.setState({ internetConnection: false});
        console.error(e);
      });
  }

  addTestsToDatabase = (DB, data) => {
    DB.transaction((tx) => {
      tx.executeSql('DELETE FROM tests; DELETE FROM test; VACUUM;', [], (tx, results) => {});
      for(let i = 0; i < data.length; i++) {
        tx.executeSql(
          'INSERT INTO tests (id, name, description, tags, level, numberOfTasks) VALUES (?, ?, ?, ?, ?, ?);',
          [data[i].id, data[i].name, data[i].description, JSON.stringify(data[i].tags), data[i].level, data[i].numberOfTasks]
        );
      }
    });
  };

  downloadTestData = () => {
    for(let i = 0; i < this.state.tests.length; i++) {
      fetch('http://tgryl.pl/quiz/test/' + this.state.tests[i].id)
        .then((data) => data.json())
        .then((d) => {
          DB.transaction((tx) => {
            tx.executeSql(
              'INSERT INTO test (id, name, description, level, tasks, tags) VALUES (?, ?, ?, ?, ?, ?);',
              [d.id, d.name, d.description, JSON.stringify(d.level), JSON.stringify(d.tasks), JSON.stringify(d.tags)]
            );
          });
          this.setState({
            isFetching: false,
            internetConnection: true
          });
          AsyncStorage.setItem('databaseDownloadDate', JSON.stringify({"value":Date()}));
        })
        .catch((error) => {
          this.setState({internetConnection: false});
        });
    }
  };

  downloadDataFromDatabase = (DB) => {
    DB.transaction((tx) => {
      tx.executeSql('SELECT * FROM tests;', [], (tx, results) => {
        let tests = [];
        for(let i = 0; i < results.rows.length; i++) {
          tests[i] = results.rows.item(i);
        }
        this.setState({
          isFetching: false,
          internetConnection: true,
          tests: tests
        });
      });
    });
  };

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
    return Array.isArray(tags) ?
      tags.join(' ') : tags.replace('[', '').replace(']', '').replace(',', ' ').replace(/"/g, '');
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
