import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

export const Footer = (props) => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>Get to know your ranking results</Text>
      <TouchableOpacity style={styles.resultsBtn} onPress={props.click}>
        <Text style={styles.resultsBtnText}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  footer: {
    margin: 10,
    borderWidth: 1.5,
    borderColor: '#0E7DDF',
    borderRadius: 20
  },
  footerText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 22
  },
  resultsBtn: {
    alignItems: 'center',
    marginTop: 10,
    margin: 10,
    borderWidth: 1.5,
    borderColor: 'white',
    borderRadius: 20,
    alignSelf: 'center'
  },
  resultsBtnText: {
    color: 'white',
    fontSize: 28,
    paddingHorizontal: 50,
    paddingVertical: 10
  }
});
