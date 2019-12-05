import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import {Result} from '../components/Result';
import {ResultsHeader} from '../components/ResultsHeader';

export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isFetching: false
    }
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
    fetch('http://tgryl.pl/quiz/results')
      .then(response => response.json())
      .then(json => {
        this.setState({
          isFetching: false,
          data: json
        });
      })
      .catch(e => {
        console.error(e);
      })
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
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isFetching}
        />
      </View>
    );
  }
}
