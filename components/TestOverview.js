import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

export const TestOverview = ({click, name, tags, description}) => {
  return (
    <View style={styles.testContainer}>
      <TouchableOpacity onPress={click}>
        <Text style={styles.testName}>{name}</Text>
        <View style={styles.details}>
          <Text style={styles.tagsTxt}>{tags}</Text>
          <Text style={styles.descriptionTxt}>{description}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  testContainer: {
    marginHorizontal: 10,
    marginTop: 10,
    borderWidth: 1.5,
    borderColor: '#0E7DDF',
    borderRadius: 20
  },
  testName: {
    fontSize: 26,
    marginTop: 10,
    marginHorizontal: 10
  },
  details: {
    marginHorizontal: 10,
    marginVertical: 5
  },
  tagsTxt: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  descriptionTxt: {
    fontSize: 16
  }
});
