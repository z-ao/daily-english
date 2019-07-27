"use strict";
exports.__esModule = true;
var api_1 = require("../global/api");
var request_1 = require("../utils/request");
exports["default"] = {
    random: function (data) {
        return request_1["default"].get(api_1["default"].word.random, data);
    }
};
