import { throttle, getBoundingClientRect } from '../../utils/dom'
import wordModel from '../../models/word'

//卡片 拖拽
let cardPointX: number = 0, cardPointY: number = 0

interface audio extends wx.InnerAudioContext{
	$play: Function
}

Page({
	data: {
		audioState: 0, //0停止 1加载 2播放中 3 加载失败
		audioClass: ['', 'play-triangle--wait', 'play-triangle--play', 'play-triangle--error'],

		cardData: [] as any[],
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
	
	wordAudio: {} as audio,
	initWordAudio() {
		const audioInstance = wx.createInnerAudioContext()

		//监听
		audioInstance.onEnded(() => {
			this.setData!({ audioState: 0 })
		})
		audioInstance.onWaiting(() =>{
			this.setData!({ audioState: 1 })
		}) 
		audioInstance.onCanplay(() => {
			this.setData!({ audioState: 2 })
		})
		audioInstance.onError(() => {
			this.setData!({ audioState: 3 })
			wx.showToast({icon: 'none', title: '抱歉～播放失败'})
		})
		audioInstance.onPlay(() => {}) //防止播放失败

		this.wordAudio = Object.assign(audioInstance, {
			$play: (url: string) => {
				if (!audioInstance.paused) { //不是暂停 停止状态
					audioInstance.stop()
				}
				audioInstance.src = url
				audioInstance.play()
			}
		}) 
	},
	playAudioEvent(evt) {
		const { audioState } = this.data
		if (audioState !== 0) return

		//播放录音
		this.wordAudio.$play(evt.currentTarget.dataset.audio)
	},

	fetchWordCard() {
		//获取单词数据
		wordModel.random().then((res: any[]) => {
			const { cardData } = this.data
			cardData.push(...res);
			this.setData!({ cardData })
		})
	},

	cardTouchstart(evt) {
		const { clientX, clientY } = evt.touches[0]
		cardPointX = clientX
		cardPointY = clientY

		this.touchStyle('start')
	},

	cardTouchmove: throttle(async function(evt) {
		const { clientX, clientY } = evt.changedTouches[0]

		this.setData({
			'cardPoint.cardPointY': clientY - cardPointY,
			'cardPoint.cardPointX': clientX - cardPointX
		})
	}, 200),

	async cardTouchend() {
		const cardRect = await getBoundingClientRect('.card')
		const isRemove = this.isRectOverWindow(cardRect)

		if (isRemove) {
			const { cardData } = this.data
			const card = cardData.shift()

			const dustComponent = this.selectComponent('#dust')
			const cardRect = await getBoundingClientRect('.card')

			dustComponent.dustAnimal(card, cardRect.top, cardRect.left)

			this.setData!({ cardData, audioState: 0 });

			if (cardData.length <=5) {
				this.fetchWordCard();
			}
		}

		this.touchStyle(isRemove ? 'remove' : 'end');

		cardPointX = cardPointY = 0
		this.setData!({ 
			cardPoint: { cardPointX, cardPointY }
		})
	},
	// 判断节点是否超出窗口视图的自身1/4
	isRectOverWindow({top, left, right, bottom, width, height}) {
		const { windowWidth, screenHeight } = wx.getSystemInfoSync();
		const buffer = 4;
		if (top < -height / buffer || left < - width / buffer) {
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

	touchStyle(state) {
		if (state === 'start') {
			this.setData!({ cardStyle: 'transition-property: top, left, box-shadow; box-shadow: none;'})
		}

		if (state === 'end') {
			this.setData!({ cardStyle: 'transition-property: top, left;'})
		}

		if (state === 'remove') {
			const transitionProp = 'transition-property: none;'
			const transform = 'transform: translate3d(0, 0, -300rpx);'

			this.setData!({ cardStyle: transitionProp + transform}, () => {
				const transitionProp = 'transition-property: transform;'
				const transform = 'transform: translate3d(0, 0, 0);'
				this.setData!({ cardStyle: transitionProp + transform})
			});
		}
	}
});
