import regeneratorRuntime from '../../plugins/regenerator-runtime';

import { throttle, getBoundingClientRect, isRectOverWindow } from '../../utils/dom';

let cardPointX = 0, cardPointY = 0;

Page({
	data: {
		isPlay: false,

		cardData: [
			{
				id: 53975,
				word: 'enwrap',
        spell: "in'ræp",
        translation: 'vt. 围绕, 包围'
			},
			{
				id: 130414,
				word: 'priggism',
        spell: "'prigizm",
        translation: 'n. 自负, 偷窃行为, 古板, 沾沾自喜'
			},
			{
				id: 154655,
				word: 'spinous',
        spell: "'spainәs",
        translation: 'a. 多刺的, 刺状的, 尖尖的\n[医] 棘状的; 棘的, 刺的; 棘突的'
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
