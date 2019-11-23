import {Navigation} from 'react-native-navigation';
import HomePage from './screens/HomePage'
import TestPage from './screens/TestPage';
import Results from './screens/Results';
import Drawer from './containers/Drawer';
import { Dimensions } from 'react-native';

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
      borderHeight: 1,
      buttonColor: 'white',
      backButton: {
        color: 'white'
      },
      title: {
        color: 'white',
        alignment: 'center',
        text: 'Home page',
        fontSize: 24
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
