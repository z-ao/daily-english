import React, {Component} from 'react';
import { StyleSheet, View, PanResponder, takeSnapshot, Image, Text, NativeModules} from 'react-native';
import { pxToDp } from '../util/css';

export default class App extends Component {
  #startTop = 0;
  #startLeft = 0;
  #panResponder = null;

  constructor(props) {
    super(props);
    this.state = {
      isTouch: false,
      top: 0,
      left: 0,
      uri: ''
    }
  }

  componentWillMount() {
    this.#panResponder = PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderTerminationRequest: () => false, //当与其他组件冲突，是否放权

      onPanResponderGrant: () => { //开始touch
        this.setState({ isTouch: true });
        this.#startTop = this.state.top;
        this.#startLeft = this.state.left;
      },
      onPanResponderMove: (evt, {dy, dx}) => {
        this.setState({
          top: this.#startTop + dy,
          left: this.#startLeft + dx
        })
      },
      onPanResponderRelease: (evt, gestureState) => { //结束touch
        this.setState({ isTouch: false });
      },
    });
  }

  componentDidMount() {
    setTimeout(() => {
      takeSnapshot(this.refs.card, { format: 'png' })
        .then((uri) => {
          console.log(NativeModules)
          this.setState({uri})
          NativeModules.RNPixelColor.createDustImages(uri, (res) => {
            console.log(res);
          })
        })
        .catch(error=> {
          console.log('err', error)
        });
    }, 700)
  }

  render() {
    const { isTouch, top, left } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.container} >
          <View style={
              [
                styles.card, 
                isTouch && styles.containerTouch, 
                {top, left} 
              ]
            }
            ref='card'
            {...this.#panResponder.panHandlers}>
            <View style={styles.content}>
              <Text style={styles.word}>Hello</Text>
              <Text style={styles.spell}>aaa</Text>
              <Text style={styles.translation}>黄海(中国三大边缘海之一,北起鸭绿江口,南以长江口北岸到朝鲜济州岛一线同东海分界,西以渤海海峡与渤海相连)</Text>
            </View>
          </View>
          <Image source={{uri: this.state.uri}} resizeMode="contain" style={{height:500,width:300}}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  containerTouch: {
    opacity: 0.6
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
