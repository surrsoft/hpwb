"use strict";

/* jshint esversion: 6 */

module.exports = {

  /**
   * Генерирует ID длиной 20 символов
   *
   * @return {string} например 7c557365fcac653e7649
   */
  idGenerate: function () {
    return require('crypto').randomBytes(10).toString('hex');
  }

};

