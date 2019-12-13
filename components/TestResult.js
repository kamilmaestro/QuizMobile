import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, TextInput} from 'react-native';

export const TestResult = ({score, testLength, saveResults, setNick, nick}) => {
  return (
    <View>
      <Text style={styles.sendingTxt}>Twój wynik to:</Text>
      <Text style={styles.sendingTxt}>{score} / {testLength}</Text>

      <Text style={styles.sendingTxt}>Podaj nick:</Text>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={setNick}
        value={nick}
      />

      <TouchableOpacity style={styles.answerBtn} onPress={saveResults}>
        <Text>Wyślij</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({

});
