/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import AppNavigator from './src/navigator/navigator';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <AppNavigator />
    );
  }
}
