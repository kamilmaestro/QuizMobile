import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export const Result = ({nick, score, total, type, date}) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={[styles.content, {marginLeft: 5}]}>{nick}</Text>
      <Text style={[styles.content, {flex: 0.5}]}>{score}</Text>
      <Text style={[styles.content, {flex: 0.5}]}>{total}</Text>
      <Text style={[styles.content, {flex: 0.8}]}>{type}</Text>
      <Text style={[styles.content, {marginRight: 5}]}>{date}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 2,
    marginTop: 3,
    marginBottom: 3,
    borderWidth: 1.5,
    borderRadius: 20,
    borderColor: '#0E7DDF'
  },
  content: {
    flex: 1,
    paddingHorizontal: 5,
    marginVertical: 10,
    fontSize: 16
  }
});
