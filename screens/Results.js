import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import {Result} from '../components/Result';
import {ResultsHeader} from '../components/ResultsHeader';

const DATA = [{
    nick: 'marek',
    score: '18',
    total: '206',
    type: 'Sport',
    date: '11/20/2019'
  },
  {
    nick: 'Ann<3',
    score: '19',
    total: '25',
    type: 'History',
    date: '11/25/2019'
  },
  {
    nick: 'john1',
    score: '13',
    total: '20',
    type: 'Sport',
    date: '11.26.2019'
  },
  {
    nick: 'Ann<3',
    score: '19',
    total: '25',
    type: 'History',
    date: '11/25/2019'
  },{
    nick: 'Ann<3',
    score: '19',
    total: '25',
    type: 'History',
    date: '11/25/2019'
  },{
    nick: 'Ann<3',
    score: '19',
    total: '25',
    type: 'History',
    date: '11/25/2019'
  },{
    nick: 'Ann<3',
    score: '19',
    total: '25',
    type: 'History',
    date: '11/25/2019'
  },{
    nick: 'Ann<3',
    score: '19',
    total: '25',
    type: 'History',
    date: '11/25/2019'
  },{
    nick: 'Ann<3',
    score: '19',
    total: '25',
    type: 'History',
    date: '11/25/2019'
  },{
    nick: 'Ann<3',
    score: '19',
    total: '25',
    type: 'History',
    date: '11/25/2019'
  },{
    nick: 'Ann<3',
    score: '19',
    total: '25',
    type: 'History',
    date: '11/25/2019'
  },{
    nick: 'Ann<3',
    score: '19',
    total: '25',
    type: 'History',
    date: '11/25/2019'
  },{
    nick: 'Ann<3',
    score: '19',
    total: '25',
    type: 'History',
    date: '11/25/2019'
  },{
    nick: 'Ann<3',
    score: '19',
    total: '25',
    type: 'History',
    date: '11/25/2019'
  }];

export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: DATA
    }
  }

  render() {
    return (
      <View>
        <View>
          <ResultsHeader/>
        </View>
        <FlatList data={this.state.data}
          renderItem={({item}) =>
            <Result nick={item.nick} score={item.score} total={item.total} type={item.type} date={item.date}/>
          }
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
