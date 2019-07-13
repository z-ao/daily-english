import regeneratorRuntime from '../../plugins/regenerator-runtime';
import { getBoundingClientRect } from '../../utils/dom';
import { canvasWrap, drawRoundRectPath } from '../../utils/canvas';

const { windowWidth } = wx.getSystemInfoSync();
const DESIGN_WIDTH = 750; //设计图宽度
const scaling = (rpx) => windowWidth / DESIGN_WIDTH * rpx;

let dustIndex = 0;
let dustArr = []
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        cardData: {
            type: Object,
            observer(val, oval) {
                if (!val) return;
            },
            value: null
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
    methods: {
        dustAnimal(cardData, top, left) {

            const id = dustIndex++;
            const dustItem = { id, top, left };
            dustArr.push(dustItem);

            this.setData({ dustArr }, async() => {
                const ctx = wx.createCanvasContext(`dust${id}`, this);
                const $ctx = await getBoundingClientRect(`#dust${id}`, this);

                const { width: ctxWidth, height: ctxHeight } = $ctx;

                //绘制canvas
                this._drawWordText(ctx, ctxWidth, cardData.word);
                this._drawSpellText(ctx, ctxWidth, cardData.spell);
                this._drawTranslationText(ctx, ctxWidth, cardData.translation);
                ctx.draw();

                // //画布生成arrayBuffer 获取显示像素 实现动画
                const arrayBuffer = await this._canvasToArrayBuffer(`dust${id}`, ctxWidth, ctxHeight);
                const particleArr = this._calculateParticle(arrayBuffer, arrayBuffer.width / 2, arrayBuffer.height / 2);

                const timer = setInterval(() => {
                    this._drawParticle(particleArr, ctx, () => {
                        clearInterval(timer);
                        const index = dustArr.findIndex(item => item.id === id);
                        dustArr.splice(index, 1);

                        this.setData({ dustArr });
                    });
                }, 110);
            });
        },

        //把canvas转成ArrayBuffer
        _canvasToArrayBuffer(canvasId, width, height, x=0, y=0) {
            return new Promise((resolve, reject) => {
                wx.canvasGetImageData({
                    canvasId,
                    x,
                    y,
                    width,
                    height,
                    success: resolve,
                    fail: reject
                }, this)
            })
        },

        //计算各显示像素点信息
        _calculateParticle(arrayBuffer, rows, cols) {
            const particleArr = [];

            const { width: CWidth, height: CHeight, data } = arrayBuffer;
            const gridWidth = parseInt(CWidth / rows);
            const gridHight = parseInt(CHeight / cols);

            for(let c = 0; c <= cols; c++) {
                for(let r = 0; r <= rows; r++) {
                    //计算色值rgba的值
                    const R = data[((c * CWidth * gridHight) + (r * gridWidth)) * 4];
                    const G = data[((c * CWidth * gridHight) + (r * gridWidth)) * 4 + 1];
                    const B = data[((c * CWidth * gridHight) + (r * gridWidth)) * 4 + 2];
                    const A = data[((c * CWidth * gridHight) + (r * gridWidth)) * 4 + 3];
                    if (A > 0) { //有色值
                        const particle = {
                            rgba: [R, G, B, A],
                            x: r * gridWidth,
                            y: c * gridHight,
                            x1: r * gridWidth + Math.random() * 110 * gridWidth,
                            y1: c * gridHight + Math.random() * 40 * gridHight,
                            delay: parseInt(Math.random() * c * 0.1), //延迟
                            count: 0,
                            curTime: 0,
                            duration: parseInt(Math.random() * 3 + 2), //执行
                        };
                        particleArr.push(particle);
                    }
                }
            }
            return particleArr;
        },

        //绘制像素点
        _drawParticle(particleArr, ctx, callback) {
            const ease = function (t, b, c, d) {
                //ease js算法
                //t 动画执行到当前帧时间段
                //b 起始的值
                //c 终点的位置值
                //d 持续时间
                return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
            }

            const len = particleArr.length;
            let finishCount = 0;

            particleArr.forEach((particle, index) => {
                if (particle.count++ > particle.delay) {
                    let { curTime, duration } = particle;

                    if(curTime < duration) { //当前粒子动画
                        const curX = ease(curTime, particle.x, particle.x1 - particle.x, duration);
                        const curY = ease(curTime, particle.y, particle.y1 - particle.y, duration);
                        particle.curTime++;
                        ctx.setFillStyle(`rgba(${particle.rgba[0]}, ${particle.rgba[1]}, ${particle.rgba[2]}, ${1 - curTime/duration})`);
                        ctx.fillRect(curX, curY, 1, 1);
                    } else { //粒子终点
                        ctx.setFillStyle(`rgba(${particle.rgba[0]}, ${particle.rgba[1]}, ${particle.rgba[2]}, 0)`);
                        ctx.fillRect(particle.x1, particle.y1, 1, 1);
                        finishCount++;
                    }
                } else {
                    ctx.setFillStyle(`rgba(${particle.rgba[0]}, ${particle.rgba[1]}, ${particle.rgba[2]}, ${particle.rgba[3]})`);
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
        _drawWordText(ctx, ctxW, text) {
            const PADDING_TOP = scaling(70);
            const LINE_HEIGHT = scaling(55);
            const FONT_SIZE = scaling(45);

            const y = PADDING_TOP + FONT_SIZE + (LINE_HEIGHT - FONT_SIZE) / 2;

            ctx.setFontSize(FONT_SIZE);
            ctx.setTextAlign('center');
            ctx.setFillStyle('#353535');
            ctx.fillText(text, ctxW / 2, y, ctxW);
        },

        //绘制发音
        _drawSpellText(ctx, ctxW, text){
            const PADDING_TOP = scaling(70 + 55 + 20);
            const LINE_HEIGHT = scaling(30);
            const FONT_SIZE = scaling(30);

            const y = PADDING_TOP + FONT_SIZE;
            ctx.setFontSize(FONT_SIZE);
            ctx.setTextAlign('center');
            ctx.setFillStyle('#353535');
            ctx.fillText(text, ctxW / 2, y, ctxW);
        },

        //绘制翻译
        _drawTranslationText(ctx, ctxW, text){
            const PADDING_TOP = scaling(70 + 55 + 20 + 30 + 80);
            const PADDING_LEFT = scaling(70);
            const LINE_HEIGHT = scaling(55);
            const FONT_SIZE = scaling(30);

            const startY = PADDING_TOP + FONT_SIZE + (LINE_HEIGHT - FONT_SIZE) / 2;
            const fontInfo = `normal normal ${Math.floor(FONT_SIZE)}px PingFangSC-Light`;
            const maxWidth = ctxW - PADDING_LEFT * 2;
            ctx.setTextAlign('left');
            canvasWrap(ctx, text, fontInfo, PADDING_LEFT, startY, LINE_HEIGHT, maxWidth);
        },
    }
});
