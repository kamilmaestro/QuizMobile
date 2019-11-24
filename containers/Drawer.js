import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {GoToBtn} from '../components/GoToBtn';
import {Navigation} from 'react-native-navigation';

export default class Drawer extends Component{
  constructor(props) {
    super(props);
  }

  goToScreen = (screenName) => {
    Navigation.mergeOptions('drawerId', {
      sideMenu: {
        left: {
          visible: false
        }
      }
    });
    Navigation.push('MAIN_STACK', {
      component: {
        name: screenName,
        options: {
          topBar: {
            title: {
              text: screenName
            }
          }
        }
      }
    })
  };

  render() {
    return (
      <View style={styles.drawerContainer}>
        <Text style={styles.titleTxt}>Quiz app</Text>
        <View style={styles.logoContainer}>
          <Icon style={styles.icon} name='wechat' size={125}/>
        </View>
        <View>
          <GoToBtn onPress={() => this.goToScreen('HomePage')} screenName={'Home page'}/>
          <GoToBtn onPress={() => this.goToScreen('Results')} screenName={'Results'}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  logoContainer: {
    margin: 10,
    alignItems: 'center'
  },
  titleTxt: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 34,
    fontWeight: 'bold'
  },
  icon: {
    color: '#0E7DDF'
  }
});
