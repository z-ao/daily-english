'use strict';

const Controller = require('egg').Controller;

class WordController extends Controller {
  async random() {
    const { ctx } = this;

    //获取随机单词
    const count = ctx.query.count || 10;
    const wordRandom = await ctx.service.word.random(count);

    //设置单词录音
    const { host } = ctx.header;
    const audioURL = (word) => `https://${host}/public/word/${word.slice(0, 1)}/${word}.mp3`;
    wordRandom.forEach(item => {
      item.dataValues.phonetic = `/${item.dataValues.phonetic}/`;
      item.dataValues.audio = audioURL(item.word);
    });

    ctx.body = wordRandom;
  }
}

module.exports = WordController;
