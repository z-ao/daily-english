'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1560324870032_9409';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'daily-english',
    pool: {
      max: 5, // 连接池中最大连接数量
      min: 0, // 连接池中最小连接数量
      idle: 20000, // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
      acquire: 1000000,
      evict: 20000,
    }
  };

  config.static = {
    publicPath: '/public'
  };

  config.serverTimeout = 4 * 60 * 10000 //超时

  return {
    ...config,
    ...userConfig,
  };
};

