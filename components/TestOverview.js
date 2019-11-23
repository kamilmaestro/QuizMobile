import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

export const TestOverview = (props) => {
  return (
    <View style={styles.testContainer}>
      <TouchableOpacity onPress={props.click}>
        <Text style={styles.testTitle}>{props.title}</Text>
      </TouchableOpacity>
      <View style={styles.details}>
        <Text style={styles.typeTxt}>{props.type}</Text>
        <Text style={styles.descriptionTxt}>{props.description}</Text>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  testContainer: {
    margin: 10,
    borderWidth: 1.5,
    borderColor: '#0E7DDF',
    borderRadius: 20
  },
  testTitle: {
    fontSize: 26,
    marginTop: 10,
    marginHorizontal: 10
  },
  details: {
    marginHorizontal: 10,
    marginVertical: 5
  },
  typeTxt: {
    fontSize: 18,
    fontStyle: 'italic'
  },
  descriptionTxt: {
    fontSize: 16
  }
});
