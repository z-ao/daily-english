"use strict";
exports.__esModule = true;
var request_1 = require("../utils/request");
var api_1 = require("../global/api");
var dataStore_1 = require("../utils/dataStore");
var commonModel = {
    login: function (data) {
        return request_1["default"].post(api_1["default"].common.login, data).then(function (res) {
            dataStore_1["default"].put('token', res.data.userInfo.token);
            return res;
        }, function (err) { return err; });
    },
    fetchUserInfo: function () {
        return new Promise(function (resolve, reject) {
            var userInfo = dataStore_1["default"].get('userInfo');
            if (userInfo) {
                resolve(userInfo);
                return;
            }
            wx.getUserInfo({
                success: function (res) {
                    dataStore_1["default"].put('userInfo', res);
                    resolve(res);
                },
                fail: reject
            });
        });
    },
    fetchLoginInfo: function () {
        return new Promise(function (resolve, reject) {
            wx.login({
                success: function (_a) {
                    var code = _a.code;
                    if (code) {
                        wx.getUserInfo({
                            success: function (_a) {
                                var encryptedData = _a.encryptedData, iv = _a.iv;
                                resolve({ code: code, encryptedData: encryptedData, iv: iv });
                            },
                            fail: reject
                        });
                        return;
                    }
                    reject();
                },
                fail: reject
            });
        });
    }
};
exports["default"] = commonModel;
