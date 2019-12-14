"use strict";

/* jshint esversion: 8 */

/*
DESCRIPTION: utility functions for get debug info about various entities

 */

const util = require('util');
const TUtil = require('./TUtil');
const TString = require('./TString');
const lodash = require('lodash');

//`````````````````````````````````````````````````````````````````````````````````````````````````
/**
 * If TRUE than at time output showing also 'typeof' of object
 *
 * @type {boolean}
 */
let mOptTypeof = false;

module.exports = {

  /**
   * Return info about object (1) in easy-to-read form (uses util.inspect() inside)
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
      stRet += ' --proto--> ' + this.fnInspect(ojIn);
      ojIn = Object.getPrototypeOf(ojIn);
    }
    //---
    return stRet;
  },

  /**
   * Maximum info about one object (1)
   *
   * @param _oj
   */
  info_C: function (_oj) {
    const ret = {};
    // ---
    ret.typeof = typeof _oj;
    // ---
    if (_oj || _oj === '' || _oj === 0) {
      // --- name
      ret.name_ = _oj.name;
      // --- own property names
      const keys = Object.keys(_oj);
      ret.fieldNamesOwn = keys;
      // --- fields exists in protos only
      ret.fieldNamesProtoOnly = [];
      //const fieldOverridedNames = [];
      let ct = 0;
      let ctOverride = 0;
      for (let key in _oj) {
        if (ret.fieldNamesOwn.indexOf(key) === -1) {
          ret.fieldNamesProtoOnly.push(key);
          ctOverride++;
        } else {
          //fieldOverridedNames.push(key);
        }
        ct++;
      }
      // // --- names of overrided fields
      // ret.fieldOverridedNames = fieldOverridedNames;
      // --- count own properties
      ret.fieldOwnCount = keys.length;
      // --- count own and proto fields (except overriden fields)
      ret.fieldOwnAndProtoCount = ct;
      // --- count override properties
      ret.fieldOverridedCount = ctOverride;
      // --- TRUE if have field .prototype
      ret.prototypeFieldIsHave = _oj.hasOwnProperty('prototype');
      // --- содержимое поля '.prototype'
      ret.prototypeFieldValue = _oj.prototype;
      // --- content of field '[[Prototype]]'
      ret.__prototype__FieldValue = Object.getPrototypeOf(_oj);
      // --- constructor
      ret.constructor_ = _oj.constructor;
    }
    // --- value
    ret.value = util.inspect(_oj);
    // ---
    return ret;
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
  },

  /**
   * Info about current environment
   * @return {Function}
   */
  environmentInfo() {
    return new Function('return this')();
  }
};

