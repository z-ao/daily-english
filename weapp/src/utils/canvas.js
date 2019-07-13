
export const canvasWrap = function (ctx, text, fontInfo, x, y, lineHeight, maxWidth){
  ctx.font = fontInfo;

  const arrText = text.split('');
  let line = ''; //存储一行字体

  for (let n = 0; n < arrText.length; n++) {
    line += arrText[n]; //插入字体
    const { width: textWidth } = ctx.measureText(line); //计算一行字体宽度

    if (textWidth >= maxWidth) { //如果一行字体宽度 大于 最大宽度
      ctx.fillText(line, x, y);
      line = '';
      y += lineHeight;
    } else if (n === arrText.length - 1) { //如果是最后一行
      ctx.fillText(line, x, y); 
    }
  }
}

export const drawRoundRectPath = function(ctx, width, height, radius){  
  ctx.beginPath(0);  
  //从右下角顺时针绘制，弧度从0到1/2PI  
  ctx.arc(width-radius,height-radius,radius,0,Math.PI/2);  

  //矩形下边线  
  ctx.lineTo(radius,height);  

  //左下角圆弧，弧度从1/2PI到PI  
  ctx.arc(radius,height-radius,radius,Math.PI/2,Math.PI);  

  //矩形左边线  
  ctx.lineTo(0,radius);  

  //左上角圆弧，弧度从PI到3/2PI  
  ctx.arc(radius,radius,radius,Math.PI,Math.PI*3/2);  

  //上边线  
  ctx.lineTo(width-radius,0);  

  //右上角圆弧  
  ctx.arc(width-radius,radius,radius,Math.PI*3/2,Math.PI*2);  

  //右边线  
  ctx.lineTo(width,height-radius);  
  ctx.closePath();  
}