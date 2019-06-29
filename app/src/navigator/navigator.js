import { createAppContainer, createMaterialTopTabNavigator } from 'react-navigation';

import RouteConfigs from './route';

const TabNavigatorConfig = {
  initialRouteName: 'index',
  tabBarPosition: 'bottom',
  lazy: true,
  animationEnabled: false,
  tabBarOptions: {
    activeTintColor: '#4fb7f8',
    inactiveTintColor: '#83817E',
    style: {
      height: (90 - 6),
      paddingTop: 6,
      backgroundColor: '#fff',
    },
    showIcon: true,
    indicatorStyle: { 
      height: 0 //防止低线显示
    }
  }
}

const TabNavigator = createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig);
const AppNavigator = createAppContainer(TabNavigator);
export default AppNavigator;