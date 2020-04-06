"use strict";

/* jshint esversion: 8 */

const util = require('util');
const TUtil = require('./TUtil');
const lodash = require('lodash');
const TMap = require('./TMap');

module.exports = {

  /**
   * If (1) is function that return it _fun-prototype ([fyxu]), else just prototype
   *
   * @param _any (1) --
   * @returns {any}
   */
  prototypeGet: function (_any) {
    if (_any === null) {
      return _any;
    }
    //---
    if (_any === undefined) {
      return _any;
    }
    //---
    if (typeof _any === 'function') {
      return _any.prototype;
    }
    //---
    return Object.getPrototypeOf(_any);
  },

  prototypeGetB(_any) {
    if (!(_any !== null && _any !== undefined)) {
      return _any;
    }
    if (lodash.isFunction(_any)) {
      return _any.prototype;
    }
    return Object.getPrototypeOf(_any);
  },

  /**
   * Return list prototypes of (1)
   *
   * @param _any {*} (1) --
   * @return {[]}
   */
  prototypesGet: function (_any) {
    const ret = [];
    let anyIn = this.prototypeGetB(_any);
    while (anyIn || (anyIn === '') || (anyIn === 0)) {
      ret.push(anyIn);
      anyIn = this.prototypeGetB(anyIn);
    }
    return ret;
  },

  /**
   * Different at A that (1) will be first elem of result.
   *
   * @param _any {*} (1) --
   * @return {[*]}
   */
  prototypesGetB: function (_any) {
    const p = this.prototypesGet(_any);
    let ret = [_any];
    if (p.length > 0) {
      ret = ret.concat(p);
    }
    return ret;
  },

  /**
   * Set for (1) as prototype entity (2)
   *
   * @param _any (1) --
   * @param _proto (2) --
   */
  prototypeSet: function (_any, _proto) {
    if (_any && _proto) {
      Object.setPrototypeOf(_any, _proto);
    }
  },

  /**
   * Traverse on objects from object array (1) and selects UNIQUE values of field (2) this objects. This values
   * write to keys output Map, but to values of keys write count occurrences this values.
   * Not selects values what have "typeof === 'function' || 'object'". If (3) == TRUE that not selects also undefined
   * values.
   *
   * @param _ojs {Array} (1) -- array of objects
   * @param _stFieldPath {String} (2) -- [kmkx]; path to property, example 'b.a' или 'b'
   * @param _bUndefIgnore {Boolean} (3) -- if TRUE that 'undefined' values not contribute to result selects
   * @returns {Map<any, any>}
   */
  valuesUnicumGet: function (_ojs, _stFieldPath, _bUndefIgnore) {
    TUtil.argsCountVerifEx(arguments, 3);
    TUtil.exceptIf(_ojs, '=[' + _ojs + ']');
    TUtil.exceptIf(_stFieldPath, '=[' + _stFieldPath + ']');
    //---
    const mapRet = new Map();
    _ojs.forEach((oj) => {
      const stVal = this.fieldValueGet(oj, _stFieldPath);
      if (!_bUndefIgnore || stVal !== undefined) {
        if (mapRet.has(stVal)) {
          mapRet.set(stVal, mapRet.get(stVal) + 1);
        } else {
          mapRet.set(stVal, 1);
        }
      }
    });
    return mapRet;
  },

  /**
   * Differ from A only that return array of UNIQUE values (array strings)
   */
  valuesUnicumGet_B: function (_ojs, _stFieldPath, _bUndefIgnore) {
    return TMap.keysGet_B(this.valuesUnicumGet(_ojs, _stFieldPath, _bUndefIgnore));
  },

  /**
   * Return TRUE if object (1) have own property (2)
   *
   * @param _oj {Object} (1) --
   * @param _stFieldName {String} (2) --
   * @returns {boolean}
   */
  fieldOwnExist: function (_oj, _stFieldName) {
    TUtil.argsCountVerifEx(arguments, 2);
    TUtil.exceptIf(_oj, _oj + '');
    TUtil.exceptIf(_stFieldName, _stFieldName);
    //---
    return _oj.hasOwnProperty(_stFieldName);
  },

  /**
   * Find in object (1) field (2). If founded, and it value is not function and not object and not null,
   * that return it value, else return 'undefined'
   *
   * @param _oj {Object} --
   * @param _stFieldPath {String} (2) -- [kmkx]; path to property, example 'b.a' или 'b'
   * @returns {*}
   */
  fieldValueGet: function (_oj, _stFieldPath) {
    TUtil.argsCountVerifEx(arguments, 2);
    TUtil.exceptIf(_oj, _oj + '');
    TUtil.exceptIf(_stFieldPath, _stFieldPath);
    //---
    let ret = lodash.property(_stFieldPath)(_oj);
    if (typeof ret !== 'function' && typeof ret !== 'object') {
      return ret;
    }
    return undefined;
  },

  /**
   * Return TRUE only if (1) is empty object '{}'.
   * If (1) created by 'new' at functional object that returns FALSE.
   *
   * # have test
   *
   * @param _oj {*} (1) -- example {}, {a: 1}, []
   * @return {boolean} example TRUE, FALSE, FALSE
   */
  isEmptyObject: function (_oj) {
    TUtil.argsCountVerifEx(arguments, 1);
    if (lodash.isObject(_oj) && !lodash.isArray(_oj)) {
      return Object.keys(_oj).length === 0 && _oj.constructor === Object
    }
    return false;
  },
  /**
   * Return TRUE if (1) is Object which have fields
   * If (1) created by 'new' at functional object that returns FALSE.
   *
   * # have test
   *
   * @param _oj {*} (1) -- example {}, {a: 1}, []
   * @return {boolean} -- example FALSE, TRUE, FALSE
   */
  isNotEmptyObject: function (_oj) {
    TUtil.argsCountVerifEx(arguments, 1);
    if (lodash.isObject(_oj) && !lodash.isArray(_oj)) {
      return Object.keys(_oj).length > 0 && _oj.constructor === Object
    }
    return false;
  },
  /**
   * Return TRUE if (1) is not-empty-object (see isNotEmptyObject()) AND it have 1+ OWN fields
   *
   * @param _oj {*} (1) -- example {}, {a: 1}, {a: 1, b: {c: 2}}, [1, 2]
   * @return {number} example 0, 1, 2, 0
   */
  fieldsOwnCount: function (_oj) {
    TUtil.argsCountVerifEx(arguments, 1);
    if (this.isNotEmptyObject(_oj)) {
      return Object.keys(_oj).length;
    }
    return 0;
  },

  destruct: function (_oj) {
    // TODO
  },

  /**
   * Convert object (1) to string representation 1
   * @param oj
   * @return {string}
   */
  toString: function (oj) {
    return JSON.stringify(oj);
  },

  /**
   * Remove from object (1) all fields (2).
   * In process changing object (1).
   *
   * #ID xrsu [[200331153750]] rev.1.0
   * #TEST [200401095233]
   *
   * @param ojBack (1) --
   * @param fieldNames {Array<String>} (2) --
   * @return {any}
   */
  fieldsRemove(ojBack, fieldNames) {
    JSON.stringify(ojBack, function (k, v) {
      fieldNames.forEach(key => delete v[key]);
      return v;
    });
  },

  /**
   * Difference at A what not changing (1), returns clone of (1)
   *
   * #ID xrsu [[200331192049]] rev.1.0
   * #DEPENDENCIES: lodash.cloneDeep()
   *
   * @param oj {Object} (1) --
   * @param fieldNames {Array<String>} (2) --
   * @return {*}
   */
  fieldsRemoveB(oj, fieldNames) {
    const oj0 = lodash.cloneDeep(oj);
    this.fieldsRemove(oj0, fieldNames);
    return oj0;
  }
};


