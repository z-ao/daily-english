"use strict";
exports.__esModule = true;
var Methods = ['OPTIONS', 'GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'TRACE', 'CONNECT'];
var SafeRequest = /** @class */ (function () {
    function SafeRequest() {
        var _this = this;
        Methods.forEach(function (method) {
            var key = method.toLowerCase();
            _this[key] = _this._requestInit(method);
        });
    }
    SafeRequest.getInstance = function () {
        if (!this.instance) {
            this.instance = new SafeRequest();
        }
        return this.instance;
    };
    SafeRequest.prototype._requestInit = function (method) {
        return function (url, data) {
            return new Promise(function (reslove, reject) {
                wx.request({
                    url: url,
                    header: {},
                    data: data,
                    method: method,
                    dataType: 'json',
                    success: function (res) {
                        if (res.statusCode === 200) {
                            reslove(res.data);
                        }
                        else {
                            reject(res);
                        }
                    },
                    fail: reject
                });
            });
        };
    };
    return SafeRequest;
}());
exports["default"] = SafeRequest.getInstance();
