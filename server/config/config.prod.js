'use strict';

module.exports = appInfo => {

  const config = exports = {};

  config.serverTimeout = 4 * 60 * 10000 //超时

  return {
    ...config,
  };
};

