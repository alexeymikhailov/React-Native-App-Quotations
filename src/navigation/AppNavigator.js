import {
  createBottomTabNavigator
} from 'react-navigation';
import AboutScreen from '../components/AboutScreen';
import QuotationsScreen from '../components/QuotationsScreen';

export default createBottomTabNavigator({
  AboutScreen: {
    screen: AboutScreen,
    path: '/',
    navigationOptions: {
      tabBarLabel: 'О приложении'
    }
  },
  QuotationsScreen: {
    screen: QuotationsScreen,
    path: '/quotations',
    navigationOptions: {
      tabBarLabel: 'Котировки'
    }
  }
}, {
  initialRouteName: 'AboutScreen',
  tabBarOptions: {
    showIcon: false,
    labelStyle: {
      fontSize: 14
    },
    style: {
      alignItems: 'center'
    },
  }
});
