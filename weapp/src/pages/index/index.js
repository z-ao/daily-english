import regeneratorRuntime from '../../plugins/regenerator-runtime';

import { throttle, getBoundingClientRect, isRectOverWindow } from '../../utils/dom';

let cardPointX = 0, cardPointY = 0;

Page({
	data: {
		isPlay: false,

		cardData: [
			{
				id: 1,
				word: 'Hello',
        spell: 'aaa',
        translation: '黄海(中国三大边缘海之一,北起鸭绿江口,南以长江口北岸到朝鲜济州岛一线同东海分界,西以渤海海峡与渤海相连)'
			},
			{
				id: 2,
				word: 'Hello1',
        spell: 'aaa',
        translation: '黄海(中国三大边缘海之一,北起鸭绿江口,南以长江口北岸到朝鲜济州岛一线同东海分界,西以渤海海峡与渤海相连)'
			},
			{
				id: 3,
				word: 'Hello2',
        spell: 'aaa',
        translation: '黄海(中国三大边缘海之一,北起鸭绿江口,南以长江口北岸到朝鲜济州岛一线同东海分界,西以渤海海峡与渤海相连)'
			}
		],
		cardStyle: '',
		cardPoint: {
			cardPointX: 0,
			cardPointY: 0
		}
	},

	playEvent() {
		const { isPlay } = this.data;
		if (isPlay) return;

		this.setData({ isPlay: !isPlay });
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
			cardPoint: { cardPointX, cardPointY },
			isPlay: false
		});
	},

	touchStyle(state) {
		if (state === 'start' || state === 'end') {
			this.setData({ cardStyle: 'transition-property: top, left; '});
		}

		if (state === 'remove') {
			const transitionProp = 'transition-property: none;';
			const transform = 'transform: translate3d(0, 0, -300rpx);';
			this.setData({ cardStyle: transitionProp + transform});

			setTimeout(() => {
				const transitionProp = 'transition-property: transform;';
				const transform = 'transform: translate3d(0, 0, 0);';
				this.setData({ cardStyle: transitionProp + transform});
			}, 0);
		}
	}
});
