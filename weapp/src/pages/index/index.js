import regeneratorRuntime from '../../plugins/regenerator-runtime';

import { throttle, getBoundingClientRect, isRectOverWindow } from '../../utils/dom';
import wordModel from '../../models/word';

//卡片 拖拽
let cardPointX = 0, cardPointY = 0;

Page({
	wordAudio: null,
	data: {
		isPlay: false,

		cardData: [],
		cardStyle: '',
		cardPoint: {
			cardPointX: 0,
			cardPointY: 0
		},
	},

	onLoad() {
		this.initWordAudio();

		//获取单词数据
		wordModel.random().then(res => {
			this.setData({ cardData: res });
		})
	},

	initWordAudio() {
		const audioInstance = wx.createInnerAudioContext();
		audioInstance.onStop(() => {
			this.setData({ isPlay: false });
		});

		audioInstance.$play = (url) => {
			if (!audioInstance.paused) { //不是暂停 停止状态
				audioInstance.stop();
			}
			audioInstance.src = url;
			audioInstance.play();
		}

		this.wordAudio = audioInstance;
	},

	playAudioEvent(evt) {
		const { isPlay } = this.data;
		if (isPlay) return;

		//播放录音
		this.wordAudio.$play(evt.currentTarget.dataset.audio);

		//设置状态
		this.setData({ isPlay: true });
	},

	cardTouchstart(evt) {
		const { clientX, clientY } = evt.touches[0];
		cardPointX = clientX;
		cardPointY = clientY;

		this.touchStyle('start');
	},

	cardTouchmove: throttle(function(evt) {
		const { clientX, clientY } = evt.changedTouches[0];

		this.setData({
			'cardPoint.cardPointY': clientY - cardPointY,
			'cardPoint.cardPointX': clientX - cardPointX
		});
	}, 200),

	async cardTouchend() {
		const cardRect = await getBoundingClientRect('.card');
		const isRemove = isRectOverWindow(cardRect);

		if (isRemove) {
			const { cardData } = this.data;
			const card = cardData.shift();

			const dustComponent = this.selectComponent('#dust');
			dustComponent.dustAnimal(card, cardRect.top, cardRect.left);

			cardData.push(card);
			this.setData({ cardData });
		}

		this.touchStyle(isRemove ? 'remove' : 'end');

		cardPointX = cardPointY = 0;
		this.setData({ 
			cardPoint: { cardPointX, cardPointY }
		});
	},

	touchStyle(state) {
		if (state === 'start' || state === 'end') {
			this.setData({ cardStyle: 'transition-property: top, left; '});
		}

		if (state === 'remove') {
			const transitionProp = 'transition-property: none;';
			const transform = 'transform: translate3d(0, 0, -300rpx);';
			this.setData({ cardStyle: transitionProp + transform}, () => {
				const transitionProp = 'transition-property: transform;';
				const transform = 'transform: translate3d(0, 0, 0);';
				this.setData({ cardStyle: transitionProp + transform});
			});
		}
	}
});
