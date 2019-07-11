'use strict';
const Service = require('egg').Service;
const { Op, literal} = require('sequelize');

class WordService extends Service{
	async random(queryCount){
		const data = await this.ctx.model.Word.findAll({
		  order: literal('rand()'),
		  limit: queryCount,
		  attributes: ['id', 'word', 'translation', 'phonetic']
		});
		
		return data;
	}
}

module.exports = WordService;