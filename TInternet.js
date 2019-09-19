"use strict";

/* jshint esversion: 6 */

const request = require('request');

module.exports = {
  /**
   * Просто пример запроса. Делает запрос на GitHub на страницу лицензии. По результату печатает в консоль код ответа
   * и тело ответа, либо ошибку.
   */
  requestExampleSend: function () {
    request('https://api.github.com/repos/atom/atom/license', function (error, response, body) {
      console.error('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
    });
  }
};
