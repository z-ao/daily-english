"use strict";
/*
 ** 全局的内存数据存储类
 ** @methods  put [更新／新建数据]  @return DataStore
 ** @methods  get [获取数据]  @return DataStore
 ** @methods  destroy [清空数据]  @return null
 */
exports.__esModule = true;
var DataStore = /** @class */ (function () {
    function DataStore() {
        this.map = new Map();
    }
    DataStore.getInstance = function () {
        if (!DataStore.instance) {
            DataStore.instance = new DataStore();
        }
        return DataStore.instance;
    };
    DataStore.prototype.put = function (key, Value) {
        if (typeof Value === 'function') { // 保存构造函数实例
            Value = new Value();
        }
        this.map.set(key, Value);
        return this;
    };
    DataStore.prototype.get = function (key) {
        return this.map.get(key);
    };
    DataStore.prototype.destroy = function () {
        this.map.clear();
    };
    return DataStore;
}());
exports["default"] = DataStore.getInstance();
