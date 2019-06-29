'use strict';

const Controller = require('egg').Controller;

class WordController extends Controller {
  async show() {
    const { ctx } = this;
    const word = ctx.query.search || '';
    const information = await ctx.service.word.information(word);
    ctx.body = information;
  }
}

module.exports = WordController;
