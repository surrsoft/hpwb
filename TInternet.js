"use strict";

/* jshint esversion: 6 */

const request = require('request');

module.exports = {

  /**
   * Просто пример запроса. Делает GET запрос на GitHub на страницу с лицензией, результат запроса пишет в консоль.
   */
  requestExampleSend: function () {
    request('https://api.github.com/repos/atom/atom/license', function (error, response, body) {
      console.error('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
    });
  },

  /**
   * От А отличается тем что возвращает Promise
   */
  requestExampleSend_B: async function () {
    return new Promise((resolve, reject) => {
      request('https://api.github.com/repos/atom/atom/license', function (error, response, body) {
        console.error('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);
        if (error) {
          reject();
        } else {
          resolve(body);
        }
      });
    });
  },

  /**
   * Отличается от А только тем что дополнительно включает в запрос заголовок 'User-Agent'
   */
  requestExampleSend_C: function () {
    const options = {
      url: 'https://api.github.com/repos/atom/atom/license',
      headers: {
        //без 'User-Agent' вернётся ошибка
        'User-Agent': 'Awesome-Octocat-App'
      }
    };
    //---
    request(options, function (error, response, body) {
      console.error('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('headers: ', response.headers);
      console.log('body:', body);
    });
  },

  /**
   * Делает GET запрос на URL (1). Результат не возвращает - пишет в консоль
   *
   * @param _stURL {String} (1) -- URL на который нужно сделать запрос
   */
  requestSend: function (_stURL) {
    request(_stURL, function (error, response, body) {
      console.error('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
    });
  }


};
