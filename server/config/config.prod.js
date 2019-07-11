'use strict';

module.exports = appInfo => {

  const config = exports = {};

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    password: 'lea@@!',
    database: 'daily-english'
  };

  config.serverTimeout = 4 * 60 * 10000 //超时

  return {
    ...config,
  };
};

