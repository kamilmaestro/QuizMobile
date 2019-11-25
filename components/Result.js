import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export const Result = ({nick, score, total, type, date}) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={[styles.content, {marginLeft: 3}]}>{nick}</Text>
      <Text style={[styles.content, {flex: 0.25}]}>{score}</Text>
      <Text style={[styles.content, {flex: 0.25}]}>{total}</Text>
      <Text style={styles.content}>{type}</Text>
      <Text style={[styles.content, {marginRight: 3}]}>{date}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    marginHorizontal: 2,
    marginTop: 5,
    borderWidth: 1.5,
    borderRadius: 20,
    borderColor: '#0E7DDF'
  },
  content: {
    flex: 1,
    marginHorizontal: 1,
    marginVertical: 10,
    textAlign: 'center',
    fontSize: 16
  }
});
