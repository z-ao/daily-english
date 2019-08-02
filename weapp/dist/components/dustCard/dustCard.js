"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var dom_1 = require("../../utils/dom");
var canvas_1 = require("../../utils/canvas");
var windowWidth = wx.getSystemInfoSync().windowWidth;
var DESIGN_WIDTH = 750; //设计图宽度
var scaling = function (rpx) { return windowWidth / DESIGN_WIDTH * rpx; };
var dustIndex = 0;
var dustArr = [];
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        cardData: {
            type: Object,
            value: null,
            optionalTypes: []
        }
    },
    /**
     * 组件的初始数据
     */
    data: {
        ctx: null,
        dustArr: []
    },
    /**
     * 组件的方法列表
     */
    //@ts-ignore
    methods: {
        //@ts-ignore
        dustAnimal: function (cardData, top, left) {
            var _this = this;
            var id = dustIndex++;
            var dustItem = { id: id, top: top, left: left };
            dustArr.push(dustItem);
            this.setData({ dustArr: dustArr }, function () { return __awaiter(_this, void 0, void 0, function () {
                var ctx, $ctx, ctxWidth, ctxHeight, arrayBuffer, particleArr, timer;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            ctx = wx.createCanvasContext("dust" + id, this);
                            return [4 /*yield*/, dom_1.getBoundingClientRect("#dust" + id, this)];
                        case 1:
                            $ctx = _a.sent();
                            ctxWidth = $ctx.width, ctxHeight = $ctx.height;
                            //绘制canvas
                            this._drawWordText(ctx, ctxWidth, cardData.word);
                            this._drawPhoneticText(ctx, ctxWidth, cardData.phonetic);
                            this._drawTranslationText(ctx, ctxWidth, cardData.translation);
                            ctx.draw();
                            return [4 /*yield*/, this._canvasToArrayBuffer("dust" + id, ctxWidth, ctxHeight)];
                        case 2:
                            arrayBuffer = _a.sent();
                            particleArr = this._calculateParticle(arrayBuffer, arrayBuffer.width / 2, arrayBuffer.height / 2);
                            timer = setInterval(function () {
                                _this._drawParticle(particleArr, ctx, function () {
                                    clearInterval(timer);
                                    var index = dustArr.findIndex(function (item) { return item.id === id; });
                                    dustArr.splice(index, 1);
                                    //@ts-ignore
                                    _this.setData({ dustArr: dustArr });
                                });
                            }, 110);
                            return [2 /*return*/];
                    }
                });
            }); });
        },
        //把canvas转成ArrayBuffer
        //@ts-ignore
        _canvasToArrayBuffer: function (canvasId, width, height, x, y) {
            var _this = this;
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            return new Promise(function (resolve, reject) {
                wx.canvasGetImageData({
                    canvasId: canvasId,
                    x: x,
                    y: y,
                    width: width,
                    height: height,
                    success: resolve,
                    fail: reject
                }, _this);
            });
        },
        //计算各显示像素点信息
        //@ts-ignore
        _calculateParticle: function (arrayBuffer, rows, cols) {
            var particleArr = [];
            var CWidth = arrayBuffer.width, CHeight = arrayBuffer.height, data = arrayBuffer.data;
            var gridWidth = Math.trunc(CWidth / rows);
            var gridHight = Math.trunc(CHeight / cols);
            for (var c = 0; c <= cols; c++) {
                for (var r = 0; r <= rows; r++) {
                    //计算色值rgba的值
                    var R = data[((c * CWidth * gridHight) + (r * gridWidth)) * 4];
                    var G = data[((c * CWidth * gridHight) + (r * gridWidth)) * 4 + 1];
                    var B = data[((c * CWidth * gridHight) + (r * gridWidth)) * 4 + 2];
                    var A = data[((c * CWidth * gridHight) + (r * gridWidth)) * 4 + 3];
                    if (A > 0) { //有色值
                        var particle = {
                            rgba: [R, G, B, A],
                            x: r * gridWidth,
                            y: c * gridHight,
                            x1: r * gridWidth + Math.random() * 110 * gridWidth,
                            y1: c * gridHight + Math.random() * 40 * gridHight,
                            delay: Math.floor(Math.random() * c * 0.1),
                            count: 0,
                            curTime: 0,
                            duration: Math.floor(Math.random() * 3 + 2)
                        };
                        particleArr.push(particle);
                    }
                }
            }
            return particleArr;
        },
        //绘制像素点
        //@ts-ignore
        _drawParticle: function (particleArr, ctx, callback) {
            var ease = function (t, b, c, d) {
                //ease js算法
                //t 动画执行到当前帧时间段
                //b 起始的值
                //c 终点的位置值
                //d 持续时间
                return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
            };
            var len = particleArr.length;
            var finishCount = 0;
            particleArr.forEach(function (particle) {
                if (particle.count++ > particle.delay) {
                    var curTime = particle.curTime, duration = particle.duration;
                    if (curTime < duration) { //当前粒子动画
                        var curX = ease(curTime, particle.x, particle.x1 - particle.x, duration);
                        var curY = ease(curTime, particle.y, particle.y1 - particle.y, duration);
                        particle.curTime++;
                        ctx.setFillStyle("rgba(" + particle.rgba[0] + ", " + particle.rgba[1] + ", " + particle.rgba[2] + ", " + (1 - curTime / duration) + ")");
                        ctx.fillRect(curX, curY, 1, 1);
                    }
                    else { //粒子终点
                        ctx.setFillStyle("rgba(" + particle.rgba[0] + ", " + particle.rgba[1] + ", " + particle.rgba[2] + ", 0)");
                        ctx.fillRect(particle.x1, particle.y1, 1, 1);
                        finishCount++;
                    }
                }
                else {
                    ctx.setFillStyle("rgba(" + particle.rgba[0] + ", " + particle.rgba[1] + ", " + particle.rgba[2] + ", " + particle.rgba[3] + ")");
                    ctx.fillRect(particle.x, particle.y, 1, 1);
                }
            });
            if (finishCount === len) {
                callback();
                return;
            }
            ctx.draw();
        },
        //绘制word
        //@ts-ignore
        _drawWordText: function (ctx, ctxW, text) {
            var PADDING_TOP = scaling(70);
            var LINE_HEIGHT = scaling(55);
            var FONT_SIZE = scaling(45);
            var y = PADDING_TOP + FONT_SIZE + (LINE_HEIGHT - FONT_SIZE) / 2;
            ctx.setFontSize(FONT_SIZE);
            ctx.setTextAlign('center');
            ctx.setFillStyle('#353535');
            ctx.fillText(text, ctxW / 2, y, ctxW);
        },
        //绘制发音
        //@ts-ignore
        _drawPhoneticText: function (ctx, ctxW, text) {
            var PADDING_TOP = scaling(70 + 55 + 20);
            var FONT_SIZE = scaling(30);
            var y = PADDING_TOP + FONT_SIZE;
            ctx.setFontSize(FONT_SIZE);
            ctx.setTextAlign('center');
            ctx.setFillStyle('#353535');
            ctx.fillText(text, ctxW / 2, y, ctxW);
        },
        //绘制翻译
        //@ts-ignore
        _drawTranslationText: function (ctx, ctxW, text) {
            var PADDING_TOP = scaling(70 + 55 + 20 + 30 + 80);
            var PADDING_LEFT = scaling(70);
            var LINE_HEIGHT = scaling(55);
            var FONT_SIZE = scaling(30);
            var startY = PADDING_TOP + FONT_SIZE + (LINE_HEIGHT - FONT_SIZE) / 2;
            var fontInfo = "normal normal " + Math.floor(FONT_SIZE) + "px PingFangSC-Light";
            var maxWidth = ctxW - PADDING_LEFT * 2;
            ctx.setTextAlign('left');
            canvas_1.canvasWrap(ctx, text, fontInfo, PADDING_LEFT, startY, LINE_HEIGHT, maxWidth);
        }
    }
});
