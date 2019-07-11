// 输入框值与data绑定
export const inputBuilding = function (evt) {
	const val = evt.detail.value;
	const data = evt.target.dataset.bind;
	this.setData({[data]: val});
}

// 授权
export const authorization = function(scope) {
	//查看授权信息
	return new Promise((resolve, reject) => {
		wx.getSetting({
			success(res) {
				// 如果该权限已经授权
				if (res.authSetting[scope] === true) {
					resolve();
				} else if (res.authSetting[scope] === false) {
					//该权限调起授权，但拒绝，重新调起设置界面
					wx.openSetting({
						success: (res) => {
							//设置了该权限授权
							res.authSetting[scope] ? resolve() : reject();
						},
						fail: reject
					});
				} else {
					//向用户发起授权请求
					wx.authorize({
						scope,
						success() {
							resolve();
						},
						fail: reject
					})
				}
			},
			fail: reject
		});
	})
}

//保存网络图片到相册
export const saveImageFormInternet = function(url) {
	//查看授权信息
	return new Promise((resolve, reject) => {
		wx.downloadFile({
			url,
			success: ({statusCode, tempFilePath}) => {
				if (statusCode !== 200) {
					reject();
					return;
				}

				wx.saveImageToPhotosAlbum({
					filePath: tempFilePath,
					success: ({ errMsg }) => {
						if (errMsg !== 'saveImageToPhotosAlbum:ok') {
							reject();
						} else {
							resolve();
						}
					},
					fail: reject
				})
			},
			fail: reject
		})
	})
}

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

/*  [节流]
**  @params     handler     { function }  绑定事件
**  @params     delay       { number   }  多次触发时,间隔多少时间执行,单位毫秒
*/
export const throttle = function (handler, delay = 200) {
	let last,
	_args = Array.prototype.slice.call(arguments, 2);
	return function (evt) {
		let now = Date.now()

		const args = _args.concat(evt);
		const that = this;
		if (!last || now - last >= delay) {
			last = now
			handler.apply(that, args)
		}
	}
}

// 获的节点位置信息
export const getBoundingClientRect = function(select, context = wx) {
	return new Promise((resolve) => {
    context.createSelectorQuery().select(select).boundingClientRect(function(res) {
      resolve(res);
    }).exec();
  });
}

// 判断节点是否超出窗口视图
const { windowWidth, screenHeight } = wx.getSystemInfoSync();
export const isRectOverWindow = function({top, left, right, bottom}) {
	if (top < 0 || left < 0) {
		return true;
	}
	if (right > windowWidth) {
		return true;
	}
	if (bottom > screenHeight) {
		return true;
	}
	return false;
}