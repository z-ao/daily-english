import React from 'react';
import { Image } from 'react-native';

import index from '../page/index';
import my from '../page/my';

export default {
  index: {
    screen: index,
    navigationOptions: () => ({
      tabBarLabel: '训练',
      tabBarIcon:({ focused, tintColor }) => (
        <Image
          style={{ width: 35, height: 35 }}
          source={ focused ? require('../asset/nav/index-active.png') : require('../asset/nav/index.png')}
        />
      ) 
    })
  },
  my: {
    screen: my,
    navigationOptions: () => ({
      tabBarLabel: '我的',
      tabBarIcon:({ focused, tintColor }) => (
        <Image
          style={{ width: 35, height: 35 }}
          source={ focused ? require('../asset/nav/my-active.png') : require('../asset/nav/my.png')}
        />
      ) 
    })
  }
};