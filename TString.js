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
     * Also differ in, that converts (1) to string with util.inspect() before take substring
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
    }

};
