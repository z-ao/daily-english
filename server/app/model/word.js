'use strict';

module.exports = app => {
  const { STRING, DATE, INTEGER, BOOLEAN } = app.Sequelize;

  const Word = app.model.define('words', {
    id: { type: INTEGER, primaryKey: true },
    word: STRING,
    phonetic: STRING,
    translation: STRING,
    created_at: DATE,
    updated_at: DATE,
    has_audio: BOOLEAN
  });

  return Word;
};