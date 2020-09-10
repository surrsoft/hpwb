"use strict";

/* jshint esversion: 8 */

/*
DESCRIPTION: utility functions for work with numbers

 */

const lodash = require('lodash');
const TUtil = require('./TUtil');

module.exports = {
  /**
   * Generate random number in range 0..(1), inclusive 0 and (1)
   *
   * @param _i {Number} (1) -- int number, example 2
   * @return {Number} example: 0, 2, 1, 0, 1, ...
   */
  random: function (_i) {
    return lodash.random(_i);
  },

  /**
   * Return random number in range (1) and (2) inclusively.
   * Allowed to have (2) less than (1).
   * Allowed negative number for (1) and (2).
   * Not that looks as number values (1)(2) converts to 0.
   *
   * #exception if number arguments != 2
   *
   * @param _iStart {Number} (1) -- example 2
   * @param _iEnd {Number} (2) -- example 4
   * @return {number} example 2 or 3 or 4
   */
  random_B: function (_iStart, _iEnd) {
    TUtil.argsCountVerifEx(arguments, 2);
    return lodash.random(_iStart, _iEnd);
  },

  /**
   * Convert string (1) to Number.
   * See test
   *
   * @param _stNumber {String}
   * @returns {number}
   */
  fromString: function (_stNumber) {
    TUtil.argsCountVerifEx(arguments, 1);
    if (typeof _stNumber === 'string' && _stNumber.indexOf('.') !== -1) {
      // drop float
      return 0;
    }
    return lodash.toInteger(_stNumber);
  },

  /**
   * Convert number-as-string to number.
   * See test
   * Dependencies: lodash
   * Version 1 1.0; ID [xrsu] 200910182000
   * @param stNumber {string | number} -- example '3.2', '3,2', 3.2, 3
   * @return {number}
   */
  fromStringB: function (stNumber) {
    if (stNumber && (typeof stNumber === 'string')) {
      const stNumber0 = stNumber.replace(/,/, '.')
      return lodash.toNumber(stNumber0) || 0;
    }
    return 0;
  },

  /**
   * Round up (1) to up
   *
   * see tests [200303115000]
   *
   * @param val {number} (1) --
   * @return {number}
   */
  roundToUp(val) {
    return Math.ceil(val);
  },

};
