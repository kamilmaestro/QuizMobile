import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

export const GoToBtn = ({screenName, onPress}) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Text>{screenName}</Text>
      </TouchableOpacity>
    </View>
  )
};
