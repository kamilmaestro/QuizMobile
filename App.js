import React from 'react';
import {Dimensions, View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import Drawer from './containers/Drawer';
import HomePage from './screens/HomePage';
import Results from './screens/Results';
import TestPage from './screens/TestPage';

Navigation.registerComponent(`Drawer`, () => Drawer);
Navigation.registerComponent(`HomePage`, () => HomePage);
Navigation.registerComponent(`Results`, () => Results);
Navigation.registerComponent(`TestPage`, () => TestPage);

const { width } = Dimensions.get('window');
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    topBar: {
      elevation: 0,
      visible: true,
      drawBehind: false,
      animate: false,
      leftButtons: [
        {
          icon: require('./assets/drawerMenu.png'),
          id: 'drawerBtn',
          color: 'white'
        }
      ],
      title: {
        color: 'white',
        alignment: 'center',
        text: 'Home page',
        fontSize: 32,
        fontFamily: 'RobotoCondensed-Regular'
      },
      background: {
        color: '#0E7DDF'
      }
    }
  });
  Navigation.setRoot({
    root: {
      sideMenu: {
        left: {
          component: {
            id: 'drawerId',
            name: 'Drawer',
            fixedWidth: width
          }
        },
        center: {
          stack: {
            id: 'MAIN_STACK',
            children: [
              {
                component: {
                  name: 'HomePage',
                }
              },
            ]
          }
        }
      },
    }
  });
});

Navigation.events().registerNavigationButtonPressedListener(() => {
  Navigation.mergeOptions('drawerId', {
    sideMenu: {
      left: {
        visible: true
      }
    }
  });
});

export const App = () => {
    return (<View/>);
};
