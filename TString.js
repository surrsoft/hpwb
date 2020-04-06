"use strict";

/* jshint esversion: 8 */

const lodash = require('lodash');
const TUtil = require('./TUtil.js');
const util = require('util');

module.exports = {

  /**
   * Return TRUE if string (1) is match regular expression (2), else return FALSE
   *
   * @param _st
   * @param _stRegExp
   * @returns {boolean}
   */
  isComplianceRegExp: function (_st, _stRegExp) {
    const regExp = new RegExp(_stRegExp);
    const st = regExp.exec(_st);
    return st !== null;
  },

  /**
   * Pick from string (1) first (2) symbols.
   * If (2) more than length of (1) then return (1).
   * If (1) is not string, or lodash.isEmpty, then return empty string.
   *
   * @error:
   * - not all arguments passed
   * - (2) < 0
   *
   * @param _st {String}
   * @param _iCount {Number}
   * @returns {string}
   */
  substring: function (_st, _iCount) {
    TUtil.argsCountVerifEx(arguments, 2);
    TUtil.exceptIf(_iCount >= 0, `_iCount ${_iCount}`);
    if (typeof _st !== 'string') {
      return '';
    }
    if (lodash.isEmpty(_st)) {
      return '';
    }
    // ---
    return _st.substring(0, _iCount);
  },

  /**
   * Differ from A only what adding to end ellipsis '...' if string (1) was cutted (i.e. if it length more than (2)).
   * Also differ in, that converts (1) to string with util.inspect() before take substring.
   * ATTENTION: this prefered for debug, for string prefered C version
   *
   * @param _st {String} (1) --
   * @param _iCount {Number} (2) --
   */
  substring_B: function (_st, _iCount) {
    let s = this.substring(util.inspect(_st), _iCount);
    if (_st.length > _iCount) {
      s += '...';
    }
    return s;
  },

  /**
   * Different from B that this preffered for String
   *
   * @param _st {String} (1) --
   * @param _iCount {Number} (2) --
   */
  substring_C: function (_st, _iCount) {
    let s = this.substring(_st, _iCount);
    if (_st.length > _iCount) {
      s += '...';
    }
    return s;
  },

  /**
   * If (1) contain '\n' that return substring 0..(index of '\n'), else return (1) as is
   * See test
   *
   * @param _st (1) --
   * @return {String}
   */
  firstString: function (_st) {
    if (typeof _st !== 'string') {
      throw new Error(`type is not string; [${_st}]`);
    }
    const iN = _st.indexOf('\n');
    if (iN === -1) {
      return _st;
    }
    return _st.substring(0, iN);
  },

  /**
   * Cut at string (1) first (2) symbols and return it cutten string
   *
   * # see tests [200322163000]
   * # id [[200322163701]]
   *
   * @param st {String} -- not changes, example 'abcd'
   * @param startCt {Number} -- 0+, example 1
   * @return {string|*}, at nonstandard situation return (1); example 'bcd'
   */
  cutStart(st, startCt) {
    if (typeof st === 'string' && startCt >= 0) {
      return st.slice(startCt);
    }
    return st;
  },

  /**
   * Get string from (1) which have max count occurrences in (1)
   *
   * @param arrSt {Array<String>} (1) -- example ['a', 'b', 'a']
   * @return {*} example 'a'
   */
  maxOccurrenceStringGet: function (arrSt) {

    function find(arr, st) {
      let ret;
      for (let i = 0; i < arr.length; i++) {
        const elem = arr[i];
        if (elem.val === st) {
          ret = elem;
          break;
        }
      }
      return ret;
    }

    let ret;

    if (arrSt && Array.isArray(arrSt)) {
      const a = [];
      arrSt.forEach(st => {
        if (st) {
          const b = find(a, st);
          if (b) {
            b.count++;
          } else {
            a.push({ val: st, count: 1 });
          }
        }
      });

      let c = 0;
      a.forEach(elem => {
        if (elem.count > c) {
          c = elem.count;
          ret = elem.val;
        }
      });
    }

    return ret;
  },

  /**
   * Return TRUE if (2) contains in (1). Sense to symbols register.
   *
   * See test
   *
   * @param st {String} (1) --
   * @param subst {String} (2) --
   * @return {boolean|*}
   */
  contains: function contains(st, subst) {
    if (typeof st === 'string' && typeof subst === 'string' && st && subst) {
      return st.includes(subst);
    }
    return false;
  },

  /**
   * Delete start and ends whitespaces from (1). Return new string
   *
   * See test
   *
   * @param st {String} (1) --
   * @return {string}
   */
  trim: function trim(st) {
    if (typeof st === 'string' && st) {
      return st.trim();
    }
    return '';
  },

  /**
   * Replace all doubles whitespaces (whitespace, wrap string, etc.) to one whitespace.
   * (1) is not changes
   *
   * See test
   *
   * @param st {String} (1) --
   * @return {string}
   */
  spaceReplaceDoubles: function spaceReplaceDoubles(st) {
    if (typeof st === 'string' && st) {
      return st.replace(/\s+/g, ' ');
    }
    return '';
  },

  /**
   * Trim start and end whitespaces, and replace doubles whithspaces to one.
   * (1) is not changes
   *
   * See test
   *
   * @param st {String} (1) --
   * @return {string|*|string}
   */
  smooth: function smooth(st) {
    if (typeof st === 'string' && st) {
      const st0 = this.trim(st);
      return this.spaceReplaceDoubles(st0);
    }
    return '';
  },

  COMPARE__NO_CHANGE: 'compare__no_change',
  COMPARE__DELETE: 'compare__delete',
  COMPARE__ADDED: 'compare__added',
  COMPARE__CHANGED: 'compare__changed',

  comparePrincipal: function comparePrincipal(st1, st2) {
    const b1 = !!st1;
    const b2 = !!st2;
    // ---
    if (b1 && !b2) {
      return this.COMPARE__DELETE;
    }
    if (!b1 && b2) {
      return this.COMPARE__ADDED;
    }
    if (!b1 && !b2) {
      return this.COMPARE__NO_CHANGE;
    }
    if (b1 && b2 && st1 === st2) {
      return this.COMPARE__NO_CHANGE;
    }
    if (b1 && b2 && st1 !== st2) {
      return this.COMPARE__CHANGED;
    }
    return undefined;
  },

  /**
   * Replace in st (1) all substrings (2) at string (3)
   *
   * #ID xrsu [[200406083145]]
   * #DEPENDENCIES: no
   * #TEST [200406092206]
   *
   * @param st {String} (1) --
   * @param findSt {String} (2) --
   * @param replaceSt {String} (3) --
   * @param all {Boolean} (4) -- {TRUE default} if TRUE that replaced all substrings, else only first
   * @param ignoreCase {Boolean} (5) -- {FALSE default} if TRUE at find symbols case ignored
   */
  substringReplace(st, findSt, replaceSt, all = true, ignoreCase = false) {
    if (st && st.length > 0 && findSt && findSt.length > 0) {
      let flags = '';
      if (all) {
        flags += 'g';
      }
      if (ignoreCase) {
        flags += 'i';
      }
      const re = new RegExp(findSt, flags);
      // ---
      return st.replace(re, replaceSt);
    }
    return st;
  }
};
