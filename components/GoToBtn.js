import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';

export const GoToBtn = ({screenName, onPress}) => {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.btnText}>{screenName}</Text>
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  mainContainer: {
    margin: 5,
    borderWidth: 1.5,
    borderRadius: 20,
    borderColor: '#0E7DDF'
  },
  btnText: {
    alignSelf: 'center',
    paddingVertical: 5,
    fontSize: 24,
    fontFamily: 'OpenSans-Regular'
  }
});
