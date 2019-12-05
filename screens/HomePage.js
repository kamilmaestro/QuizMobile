import React, {Component} from 'react';
import {View, ScrollView, StyleSheet, FlatList, RefreshControl} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {Footer} from './../components/Footer'
import {TestOverview} from '../components/TestOverview';
import Regulations from './Regulations';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      tests: []
    };
  }

  componentDidMount() {
    this.fetchData()
  }

  onRefresh() {
    this.setState({ isFetching: true}, () => {
      this.fetchData()
    });
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

  goToScreen = (screenName) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screenName,
        options: {
          topBar: {
            title: {
              text: screenName
            }
          }
        }
      }
    })
  };

  splitTags = (tags) => {
    return tags.join(' ')
  };

  render() {
    return (
      <View>
        <Regulations/>
        <ScrollView refreshControl={
          <RefreshControl refreshing={this.state.isFetching} onRefresh={() => this.onRefresh()} />
        }>
          <FlatList data={this.state.tests}
            renderItem={({item}) =>
              <TestOverview click={() => this.goToScreen('TestPage')} name={item.name} tags={this.splitTags(item.tags)} description={item.description}/>
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

const styles =StyleSheet.create({
  footer: {
    marginTop: 10,
    backgroundColor: '#0E7DDF'
  }
});
