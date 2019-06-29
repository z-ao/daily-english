'use strict';

const Service = require('egg').Service;

class WordService extends Service{
  async information(word=''){
    const translation = await this.ctx.model.Word.findOne({
      where: {
        word
      },
      attributes: ['word', 'translation']
    });
    const voiceUrl = `/public/word/${word.slice(0, 1)}/${word}.mp3`;
    return { translation, voiceUrl };
  }
}

module.exports = WordService;