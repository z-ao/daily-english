"use strict";
exports.__esModule = true;
var async_validator_1 = require("../plugins/async-validator");
/*
 ** 表单验证 参考[https://github.com/tmpfs/async-validate]
 ** @init   初始化是传入验证规则  e.g new validator(rules)
 ** @prop _schema { Object }   async validator实例
 ** @methods validate   调用验证方法,传入数据.  @returm { Object / null } errs e.g validator.validate(data, opt)
 ** @methods validateSingle   调用验证方法,传入数据,失败返回一个错误  @returm { string / null } err
 */
var validator = /** @class */ (function () {
    function validator(rules) {
        this._schema = new async_validator_1["default"](rules);
    }
    validator.prototype.validate = function (data, opt) {
        var _this = this;
        return new Promise(function (reslove, reject) {
            _this._schema.validate(data, opt, function (err, stat) {
                err && reject(stat);
                !err && reslove();
            });
        });
    };
    validator.prototype.validateSingle = function (data, opt) {
        return this.validate(data, opt)["catch"](function (errs) {
            var ret;
            for (var _i = 0, _a = Object.values(errs); _i < _a.length; _i++) {
                var value = _a[_i];
                // @ts-ignore
                ret = value[0].message;
                break;
            }
            return Promise.reject(ret);
        });
    };
    return validator;
}());
exports["default"] = validator;
