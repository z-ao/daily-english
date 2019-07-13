import regeneratorRuntime from '../../plugins/regenerator-runtime'

import { throttle, getBoundingClientRect, isRectOverWindow } from '../../utils/dom'
import wordModel from '../../models/word'

//卡片 拖拽
let cardPointX = 0, cardPointY = 0

Page({
	wordAudio: null,
	data: {
		audioState: 0, //0停止 1加载 2播放中
		audioClass: ['', 'play-triangle--wait', 'play-triangle--play'],

		cardData: [],
		cardStyle: '',
		cardPoint: {
			cardPointX: 0,
			cardPointY: 0
		},
	},

	onLoad() {
		this.initWordAudio()
		this.fetchWordCard()
	},

	initWordAudio() {
		const audioInstance = wx.createInnerAudioContext()

		//监听
		audioInstance.onEnded(() => {
			this.setData({ audioState: 0 })
		})
		audioInstance.onError((err) => {
			this.setData({ audioState: 0 })
			console.log(err);
			wx.showToast({icon: 'none', title: '抱歉～播放失败'})
		})
		audioInstance.onWaiting(() =>{
			this.setData({ audioState: 1 })
		}) 
		audioInstance.onPlay(() => {
			this.setData({ audioState: 2 })
		})

		audioInstance.$play = (url) => {
			if (!audioInstance.paused) { //不是暂停 停止状态
				audioInstance.stop()
			}
			audioInstance.src = url
			audioInstance.play()
		}

		this.wordAudio = audioInstance
	},

	playAudioEvent(evt) {
		const { audioState } = this.data
		if (audioState === 2) return

		//播放录音
		this.wordAudio.$play(evt.currentTarget.dataset.audio)
	},

	fetchWordCard() {
		//获取单词数据
		wordModel.random().then(res => {
			const { cardData } = this.data
			cardData.push(...res);
			this.setData({ cardData })
		})
	},

	cardTouchstart(evt) {
		const { clientX, clientY } = evt.touches[0]
		cardPointX = clientX
		cardPointY = clientY

		this.touchStyle('start')
	},

	cardTouchmove: throttle(function(evt) {
		const { clientX, clientY } = evt.changedTouches[0]

		this.setData({
			'cardPoint.cardPointY': clientY - cardPointY,
			'cardPoint.cardPointX': clientX - cardPointX
		})
	}, 200),

	async cardTouchend() {
		const cardRect = await getBoundingClientRect('.card')
		const isRemove = isRectOverWindow(cardRect)

		if (isRemove) {
			const { cardData } = this.data
			const card = cardData.shift()

			const dustComponent = this.selectComponent('#dust')
			dustComponent.dustAnimal(card, cardRect.top, cardRect.left)

			this.setData({ cardData });

			if (cardData.length <=5) {
				this.fetchWordCard();
			}
		}

		this.touchStyle(isRemove ? 'remove' : 'end')

		cardPointX = cardPointY = 0
		this.setData({ 
			cardPoint: { cardPointX, cardPointY }
		})
	},

	touchStyle(state) {
		if (state === 'start') {
			this.setData({ cardStyle: 'transition-property: top, left, box-shadow; box-shadow: none;'})
		}

		if (state === 'end') {
			this.setData({ cardStyle: 'transition-property: top, left;'})
		}

		if (state === 'remove') {
			const transitionProp = 'transition-property: none;'
			const transform = 'transform: translate3d(0, 0, -300rpx);'

			this.setData({ cardStyle: transitionProp + transform}, () => {
				const transitionProp = 'transition-property: transform;'
				const transform = 'transform: translate3d(0, 0, 0);'
				this.setData({ cardStyle: transitionProp + transform})
			});
		}
	}
});
