// 输入框值与data绑定
export const inputBuilding = function (evt: any) {
	const val = evt.detail.value;
	const data = evt.target.dataset.bind;

	this.setData({[data]: val});
}

// 授权
export const authorization = function(scope: string) {
	//查看授权信息
	return new Promise((resolve, reject) => {
		wx.getSetting({
			success(res:any) {
				// 如果该权限已经授权
				if (res.authSetting[scope] === true) {
					resolve();
				} else if (res.authSetting[scope] === false) {
					//该权限调起授权，但拒绝，重新调起设置界面
					wx.openSetting({
						success: (res:any) => {
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
export const saveImageFormInternet = function(url: string) {
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

/*  [节流]
**  @params     handler     { function }  绑定事件
**  @params     delay       { number   }  多次触发时,间隔多少时间执行,单位毫秒
*/
export const throttle = function (handler: Function, delay = 200) {
	let last: number,
	_args = Array.prototype.slice.call(arguments, 2);
	return function (evt: any) {
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
export const getBoundingClientRect = function(select: string, context = wx) {
	return new Promise((resolve) => {
    context.createSelectorQuery().select(select).boundingClientRect(function(res) {
      resolve(res);
    }).exec();
  });
}