"use strict";
exports.__esModule = true;
// 输入框值与data绑定
exports.inputBuilding = function (evt) {
    var _a;
    var val = evt.detail.value;
    var data = evt.target.dataset.bind;
    this.setData((_a = {}, _a[data] = val, _a));
};
// 授权
exports.authorization = function (scope) {
    //查看授权信息
    return new Promise(function (resolve, reject) {
        wx.getSetting({
            success: function (res) {
                // 如果该权限已经授权
                if (res.authSetting[scope] === true) {
                    resolve();
                }
                else if (res.authSetting[scope] === false) {
                    //该权限调起授权，但拒绝，重新调起设置界面
                    wx.openSetting({
                        success: function (res) {
                            //设置了该权限授权
                            res.authSetting[scope] ? resolve() : reject();
                        },
                        fail: reject
                    });
                }
                else {
                    //向用户发起授权请求
                    wx.authorize({
                        scope: scope,
                        success: function () {
                            resolve();
                        },
                        fail: reject
                    });
                }
            },
            fail: reject
        });
    });
};
//保存网络图片到相册
exports.saveImageFormInternet = function (url) {
    //查看授权信息
    return new Promise(function (resolve, reject) {
        wx.downloadFile({
            url: url,
            success: function (_a) {
                var statusCode = _a.statusCode, tempFilePath = _a.tempFilePath;
                if (statusCode !== 200) {
                    reject();
                    return;
                }
                wx.saveImageToPhotosAlbum({
                    filePath: tempFilePath,
                    success: function (_a) {
                        var errMsg = _a.errMsg;
                        if (errMsg !== 'saveImageToPhotosAlbum:ok') {
                            reject();
                        }
                        else {
                            resolve();
                        }
                    },
                    fail: reject
                });
            },
            fail: reject
        });
    });
};
/*  [节流]
**  @params     handler     { function }  绑定事件
**  @params     delay       { number   }  多次触发时,间隔多少时间执行,单位毫秒
*/
exports.throttle = function (handler, delay) {
    if (delay === void 0) { delay = 200; }
    var last, _args = Array.prototype.slice.call(arguments, 2);
    return function (evt) {
        var now = Date.now();
        var args = _args.concat(evt);
        var that = this;
        if (!last || now - last >= delay) {
            last = now;
            handler.apply(that, args);
        }
    };
};
// 获的节点位置信息
exports.getBoundingClientRect = function (select, context) {
    if (context === void 0) { context = wx; }
    return new Promise(function (resolve) {
        context.createSelectorQuery().select(select).boundingClientRect(function (res) {
            resolve(res);
        }).exec();
    });
};
