import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export const ResultsHeader = () => {
  const headers = {
    nick: 'nick',
    score: 'score',
    total: 'total',
    type: 'type',
    date: 'date'
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={[styles.content, {marginLeft: 5}]}>{headers.nick}</Text>
      <Text style={[styles.content, {flex: 0.5}]}>{headers.score}</Text>
      <Text style={[styles.content, {flex: 0.5}]}>{headers.total}</Text>
      <Text style={[styles.content, {flex: 0.8}]}>{headers.type}</Text>
      <Text style={[styles.content, {marginRight: 5}]}>{headers.date}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    backgroundColor: '#0E7DDF'
  },
  content: {
    flex: 1,
    color: 'white',
    paddingHorizontal: 5,
    marginVertical: 10,
    fontSize: 17,
    fontWeight: 'bold'
  }
});
