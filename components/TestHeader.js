import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import * as Progress from 'react-native-progress';

export const TestHeader = ({questionNr, questionsLength, timeLeft}) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTxt}>{`Question: ${questionNr + 1} of ${questionsLength}`}</Text>
        <Text style={styles.infoTxt}>{`Time: ${timeLeft} sec`}</Text>
      </View>
      <View style={styles.progressBar}>
        <Progress.Bar color={'white'} borderColor={'white'} progress={(questionNr + 1)/questionsLength} height={10} width={250} />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#0E7DDF'
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoTxt: {
    color: 'white',
    fontSize: 20,
    padding: 10
  },
  progressBar: {
    alignItems: 'center',
    padding: 10
  }
});
