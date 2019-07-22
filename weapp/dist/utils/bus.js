"use strict";
exports.__esModule = true;
var Bus = /** @class */ (function () {
    function Bus() {
        this._watcher = {};
    }
    Bus.getInstance = function () {
        if (!Bus.instance) {
            Bus.instance = new Bus();
        }
        return Bus.instance;
    };
    Bus.prototype.on = function (name, handler) {
        if (this._watcher[name]) {
            this._watcher[name].push(handler);
        }
        else {
            this._watcher[name] = [handler];
        }
        return this;
    };
    Bus.prototype.emit = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!this._watcher[name])
            return;
        this._watcher[name].forEach(function (handler) {
            handler.apply(void 0, args);
        });
    };
    Bus.prototype.off = function (name, handler) {
        var index = this._watcher[name].indexOf(handler);
        if (index < 0)
            return this;
        this._watcher[name].splice(index, 1);
        return this;
    };
    return Bus;
}());
exports["default"] = Bus.getInstance();
