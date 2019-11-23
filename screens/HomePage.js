import React, {Component} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {Footer} from './../components/Footer'
import {TestOverview} from '../components/TestOverview';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  goToScreen = (screenName) => {
    Navigation.push(this.props.componentId, {
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
      <View style={styles.mainContainer}>
        <ScrollView >
          <TestOverview click={() => this.goToScreen('TestPage')} title={'First'} type={'Sport'} description={'Very nice test for everyone :P'}/>
          <TestOverview click={() => this.goToScreen('TestPage')} title={'Second'} type={'History'} description={'If you wish you can try yourself in this test <3'}/>
          <TestOverview click={() => this.goToScreen('TestPage')} title={'Third'} type={'Science'} description={'Very nice test for everyone :P'}/>
          <TestOverview click={() => this.goToScreen('TestPage')} title={'Fourth'} type={'Sport'} description={'Super test :)'}/>
          <TestOverview click={() => this.goToScreen('TestPage')} title={'Fifth'} type={'Sport'} description={'Very nice test for everyone :P yes even for you my dear friend <3'}/>
          <View style={styles.footer}>
            <Footer click={() => this.goToScreen('Results')} text={'Check!'}/>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles =StyleSheet.create({
  footer: {
    marginTop: 10,
    backgroundColor: '#0E7DDF'
  }
});
