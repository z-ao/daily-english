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
		touchIng: null,
		cardPoint: {
			top: 0,
			left: 0
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

		this.setData({ touchIng: true });
	},

	cardTouchmove: throttle(function(evt) {
		const { clientX, clientY } = evt.changedTouches[0];

		this.setData({
			'cardPoint.top': clientY - cardPointY,
			'cardPoint.left': clientX - cardPointX
		});
	}, 200),

	async cardTouchend() {
		const cardRect = await getBoundingClientRect('.card');
		if (isRectOverWindow(cardRect)) {
			const { cardData } = this.data;
			const card = cardData.shift();

			const dustComponent = this.selectComponent('#dust');
			dustComponent.dustAnimal(card, cardRect.top, cardRect.left);

			this.setData({ cardData });
		}
		console.log(isRectOverWindow(cardRect), cardRect)
		this.clearCardState();
	},

	clearCardState() {
		cardPointX = cardPointY = 0;
		this.setData({ 
			touchIng: false,
			cardPoint: {
				top: 0,
				left: 0
			}
		});
	}
});
