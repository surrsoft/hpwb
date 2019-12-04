"use strict";

/* jshint esversion: 8 */

/*
DESCRIPTION: utility functions for get debug info about various entities

 */

const util = require('util');
const TUtil = require('./TUtil');
const TString = require('./TString');

//`````````````````````````````````````````````````````````````````````````````````````````````````
/**
 * If TRUE than at time output showing also 'typeof' of object
 *
 * @type {boolean}
 */
let mOptTypeof = false;

module.exports = {

  /**
   * Return info about object (1) in easy-to-read form
   *
   * @param _oj (1) --
   */
  info: function (_oj) {
    TUtil.argsCountVerifEx(arguments, 1);
    return this.fnInspect(_oj);
  },

  /**
   * In addition info about self object (1), showing alse info about all it prototypes
   *
   * @param _oj (1) --
   * @returns {string} example { c: 4 } --> { a: 2 } --> {}
   */
  info_B: function (_oj) {
    TUtil.argsCountVerifEx(arguments, 1);
    //---
    if (!_oj) {
      return this.fnInspect(_oj);
    }
    //---
    let stRet = this.fnInspect(_oj);
    let ojIn = Object.getPrototypeOf(_oj);
    while (ojIn) {
      stRet += ' --> ' + this.fnInspect(ojIn);
      ojIn = Object.getPrototypeOf(ojIn);
    }
    //---
    return stRet;
  },

  /**
   * Write to console info about object (2) in easy-to-read form
   *
   * @param _stPrefix (1) --
   * @param _oj (2) --
   * @param _stSuffix (3) --
   */
  infoConsole: function (_stPrefix, _oj, _stSuffix) {
    TUtil.argsCountVerifEx(arguments, 3);
    console.log(_stPrefix + this.info(_oj) + _stSuffix);
  },

  /**
   * Write to console info about object (2), and about all it prototypes, in easy-to-read form
   *
   * @param _stPrefix (1) --
   * @param _oj (2) --
   * @param _stSuffix (3) --
   */
  infoConsole_B: function (_stPrefix, _oj, _stSuffix) {
    TUtil.argsCountVerifEx(arguments, 3);
    console.log(_stPrefix + this.info_B(_oj) + _stSuffix);
  },

  /**
   * Convert (2) using util.inspect(), trim result string at (4) symbols and write to console along with prefix (1)
   * and suffix (2)
   *
   * @param _stPrefix {String} (1) --
   * @param _oj {Object} (2) --
   * @param _stSuffix {String} (3) --
   * @param _iTrim {Number} (4) --
   */
  infoConsole_C: function (_stPrefix, _oj, _stSuffix, _iTrim) {
    TUtil.argsCountVerifEx(arguments, 4);
    const x = this.fnInspect(_oj);
    const x2 = TString.substring_B(x, _iTrim);
    this.infoConsole(_stPrefix, x2, _stSuffix);
  },

  /**
   * Return signature of function which used as constructor when creating object (1)
   *
   * @param _oj (1) --
   * @returns {string}
   */
  infoConstructor: function (_oj) {
    TUtil.argsCountVerifEx(arguments, 1);
    return '' + _oj.constructor;
  },

  optTypeof: function (_bool) {
    mOptTypeof = _bool;
  },

  fnInspect: function (_oj) {
    let x = '';
    if (mOptTypeof) {
      x = ' ^typeof=[' + (typeof _oj) + ']';
    }
    //---
    return util.inspect(_oj) + x;
  },

  functionInfo: function (fn) {
    if (typeof fn === 'function') {
      let retOj = {};
      retOj.definition = util.inspect(fn);
      retOj.fields = Object.keys(fn).map(key => `${key}=[${fn[key]}]`);
      return util.inspect(retOj);
    }
    return 'is not function';
  }
};

