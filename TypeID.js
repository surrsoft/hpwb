"use strict";

/* jshint esversion: 8 */

const crypto = require('crypto');

module.exports = {

  /**
   * Generating ID length 20 symbols
   *
   * @return {string} example '7c557365fcac653e7649'
   */
  idGenerate: function () {
    return crypto.randomBytes(10).toString('hex');
  }

};

