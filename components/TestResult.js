import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, TextInput} from 'react-native';

export const TestResult = ({score, testLength, saveResults, setNick, nick}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Twój wynik to:</Text>
      <Text style={styles.scoreTxt}>{score} / {testLength}</Text>

      <Text style={styles.txt}>Podaj nick:</Text>
      <TextInput
        style={{borderColor: '#0E7DDF', borderWidth: 1.5, fontSize: 24, margin: 10}}
        onChangeText={setNick}
        value={nick}
      />

      <TouchableOpacity style={styles.btn} onPress={saveResults}>
        <Text style={styles.btnTxt}>Wyślij</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 10
  },
  txt: {
    fontSize: 22,
    margin: 5
  },
  scoreTxt: {
    alignSelf: 'center',
    margin: 5,
    fontSize: 22,
    fontWeight: 'bold'
  },
  btn: {
    margin: 10,
    borderRadius: 20,
    backgroundColor: '#0E7DDF',
    alignSelf: 'center',
    alignItems: 'center'
  },
  btnTxt: {
    paddingVertical: 10,
    paddingHorizontal: 50,
    fontSize: 28,
    color: 'white'
  }
});
