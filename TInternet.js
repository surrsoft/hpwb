"use strict";

/* jshint esversion: 8 */

const request = require('request');

module.exports = {

  /**
   * Just example of request. Make GET request to GitHub on page with license, result write to console.
   */
  requestExampleSend: function () {
    request('https://api.github.com/repos/atom/atom/license', function (error, response, body) {
      console.error('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
    });
  },

  /**
   * Differ from A that return Promise
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
   * Differ from A only that additionaly add to request header 'User-Agent'
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
   * Make GET request to URL (1). No return result - writing to console
   *
   * @param _stURL {String} (1) -- URL to which you need to make a request
   */
  requestSend: function (_stURL) {
    request(_stURL, function (error, response, body) {
      console.error('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
    });
  }


};
