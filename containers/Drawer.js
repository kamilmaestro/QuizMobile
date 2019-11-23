import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const APP_LOGO = <Icon name='wechat' size={90} color={'#0E7DDF'}/>;

type Props = {};
export default class Drawer extends Component<Props> {

  render() {
    return (
      <View style={styles.drawerContainer}>
        <Text>Quiz app</Text>
        <View style={styles.logoContainer}>
          {APP_LOGO}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  drawerContainer: {
    backgroundColor: 'white'
  },
  logoContainer: {
    margin: 10
  }
});
