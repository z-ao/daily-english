'use strict';

module.exports = app => {
  const { STRING, DATE } = app.Sequelize;

  const Word = app.model.define('words', {
    word: { type: STRING, primaryKey: true },
    translation: STRING,
    created_at: DATE,
    updated_at: DATE,
  });

  return Word;
};