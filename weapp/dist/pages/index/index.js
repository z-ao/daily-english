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
var word_1 = require("../../models/word");
//卡片 拖拽
var cardPointX = 0, cardPointY = 0;
Page({
    data: {
        audioState: 0,
        audioClass: ['', 'play-triangle--wait', 'play-triangle--play', 'play-triangle--error'],
        cardData: [],
        cardStyle: '',
        cardPoint: {
            cardPointX: 0,
            cardPointY: 0
        }
    },
    onLoad: function () {
        this.initWordAudio();
        this.fetchWordCard();
    },
    wordAudio: {},
    initWordAudio: function () {
        var _this = this;
        var audioInstance = wx.createInnerAudioContext();
        //监听
        audioInstance.onEnded(function () {
            _this.setData({ audioState: 0 });
        });
        audioInstance.onWaiting(function () {
            _this.setData({ audioState: 1 });
        });
        audioInstance.onCanplay(function () {
            _this.setData({ audioState: 2 });
        });
        audioInstance.onError(function () {
            _this.setData({ audioState: 3 });
            wx.showToast({ icon: 'none', title: '抱歉～播放失败' });
        });
        audioInstance.onPlay(function () { }); //防止播放失败
        this.wordAudio = Object.assign(audioInstance, {
            $play: function (url) {
                if (!audioInstance.paused) { //不是暂停 停止状态
                    audioInstance.stop();
                }
                audioInstance.src = url;
                audioInstance.play();
            }
        });
    },
    playAudioEvent: function (evt) {
        var audioState = this.data.audioState;
        if (audioState !== 0)
            return;
        //播放录音
        this.wordAudio.$play(evt.currentTarget.dataset.audio);
    },
    fetchWordCard: function () {
        var _this = this;
        //获取单词数据
        word_1["default"].random().then(function (res) {
            var cardData = _this.data.cardData;
            cardData.push.apply(cardData, res);
            _this.setData({ cardData: cardData });
        });
    },
    cardTouchstart: function (evt) {
        var _a = evt.touches[0], clientX = _a.clientX, clientY = _a.clientY;
        cardPointX = clientX;
        cardPointY = clientY;
        this.touchStyle('start');
    },
    cardTouchmove: dom_1.throttle(function (evt) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, clientX, clientY;
            return __generator(this, function (_b) {
                _a = evt.changedTouches[0], clientX = _a.clientX, clientY = _a.clientY;
                this.setData({
                    'cardPoint.cardPointY': clientY - cardPointY,
                    'cardPoint.cardPointX': clientX - cardPointX
                });
                return [2 /*return*/];
            });
        });
    }, 200),
    cardTouchend: function () {
        return __awaiter(this, void 0, void 0, function () {
            var cardRect, isRemove, cardData, card, dustComponent, cardRect_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, dom_1.getBoundingClientRect('.card')];
                    case 1:
                        cardRect = _a.sent();
                        isRemove = this.isRectOverWindow(cardRect);
                        if (!isRemove) return [3 /*break*/, 3];
                        cardData = this.data.cardData;
                        card = cardData.shift();
                        dustComponent = this.selectComponent('#dust');
                        return [4 /*yield*/, dom_1.getBoundingClientRect('.card')];
                    case 2:
                        cardRect_1 = _a.sent();
                        dustComponent.dustAnimal(card, cardRect_1.top, cardRect_1.left);
                        this.setData({ cardData: cardData, audioState: 0 });
                        if (cardData.length <= 5) {
                            this.fetchWordCard();
                        }
                        _a.label = 3;
                    case 3:
                        this.touchStyle(isRemove ? 'remove' : 'end');
                        cardPointX = cardPointY = 0;
                        this.setData({
                            cardPoint: { cardPointX: cardPointX, cardPointY: cardPointY }
                        });
                        return [2 /*return*/];
                }
            });
        });
    },
    // 判断节点是否超出窗口视图的自身1/4
    isRectOverWindow: function (_a) {
        var top = _a.top, left = _a.left, right = _a.right, bottom = _a.bottom, width = _a.width, height = _a.height;
        var _b = wx.getSystemInfoSync(), windowWidth = _b.windowWidth, screenHeight = _b.screenHeight;
        var buffer = 4;
        if (top < -height / buffer || left < -width / buffer) {
            return true;
        }
        if (right > windowWidth + width / buffer) {
            return true;
        }
        if (bottom > screenHeight + height / buffer) {
            return true;
        }
        return false;
    },
    touchStyle: function (state) {
        var _this = this;
        if (state === 'start') {
            this.setData({ cardStyle: 'transition-property: top, left, box-shadow; box-shadow: none;' });
        }
        if (state === 'end') {
            this.setData({ cardStyle: 'transition-property: top, left;' });
        }
        if (state === 'remove') {
            var transitionProp = 'transition-property: none;';
            var transform = 'transform: translate3d(0, 0, -300rpx);';
            this.setData({ cardStyle: transitionProp + transform }, function () {
                var transitionProp = 'transition-property: transform;';
                var transform = 'transform: translate3d(0, 0, 0);';
                _this.setData({ cardStyle: transitionProp + transform });
            });
        }
    }
});
