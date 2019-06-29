import { Dimensions } from 'react-native';

//获取屏幕大小
const { width } = Dimensions.get("window");
const ScreenWidth = Math.min(width, 540);


//db数值转化
export function pxToDp(num, designWidth = 750) {
  return num * ScreenWidth / designWidth ;
}