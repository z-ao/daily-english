import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { pxToDp } from '../util/css';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.content}>
            <Text style={styles.word}>Hello</Text>
            <Text style={styles.spell}>aaa</Text>
            <Text style={styles.translation}>黄海(中国三大边缘海之一,北起鸭绿江口,南以长江口北岸到朝鲜济州岛一线同东海分界,西以渤海海峡与渤海相连)</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },

  // card
  card: {
    display: 'flex',
    height: '100%',
    maxHeight: pxToDp(980),
    width: pxToDp(640),
    paddingTop: pxToDp(70),
    paddingBottom: pxToDp(25),
    backgroundColor: '#fff',
    borderRadius: pxToDp(25)
  },
  content: {
    paddingLeft: pxToDp(70),
    paddingRight: pxToDp(70),
  },
  word: {
    height: pxToDp(55),
    lineHeight: pxToDp(55),
    marginBottom: pxToDp(20),
    textAlign: 'center',
    fontSize: pxToDp(45),
    color: '#353535',
    fontWeight: '600'
  },
  spell: {
    lineHeight: pxToDp(40),
    textAlign: 'center',
    fontSize: pxToDp(30),
    color: '#353535',
  },
  translation: {
    lineHeight: pxToDp(55),
    marginTop: pxToDp(80),
    fontSize: pxToDp(30),
    color: '#353535'
  }
});
