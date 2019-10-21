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
            return null;
        }
        //---
        if (_any === undefined) {
            return undefined;
        }
        //---
        if (typeof _any === 'function') {
            return _any.prototype;
        }
        //---
        return Object.getPrototypeOf(_any);
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

};


