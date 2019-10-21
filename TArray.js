
"use strict";

/* jshint esversion: 8 */

/*
DESCRIPTION: functions for work with arrays
 */

module.exports = {

    /**
     * Return TRUE if (1) is array (Array), else return FALSE
     *
     * @param _arr {Array} (1) -- maybe array
     * @returns {boolean}
     */
    isArray: function (_arr) {
        return Array.isArray(_arr);
    },

    /**
     * Return TRUE if (1) is array and it have length > 0, else return FALSE
     *
     * @param _arr {Array} (1) -- maybe array
     * @returns {boolean}
     */
    isNotEmpty: function (_arr) {
        return Array.isArray(_arr) && _arr.length > 0;
    },

    /**
     * Return TRUE if (1) is not array OR if array but have 0 length
     *
     * @param _arr {Array} (1) -- maybe array
     * @returns {boolean}
     */
    isEmpty: function (_arr) {
        return !this.isNotEmpty(_arr);
    },


    /**
     * Selects from array (1) elems in count (2) and adding it to result array.
     * Return empty array in any of the following cases:
     * -- (1) it's not array
     * -- (2) or (3) less 0
     * -- (3) less than (2)
     * -- (3) equals (2)
     * If (3) more then length of array (1) that in result will copy of array (1).
     *
     * @param _arrFrom {Array} (1) -- maybe array
     * @param _iIndexBegin {number} (2) -- index of start selects elems (inclusively)
     * @param _iIndexEnd {number} (3) -- index end of selects elems (exceptionally)
     */
    subArray: function (_arrFrom, _iIndexBegin, _iIndexEnd) {
        if (this.isArray(_arrFrom)) {
            if (_iIndexBegin >= 0 && _iIndexEnd >= 0 && _iIndexEnd >= _iIndexBegin) {
                return _arrFrom.slice(_iIndexBegin, _iIndexEnd);
            }
        }
        return [];
    },

    /**
     * Differ from A only that (3) work as 'inclusively'
     *
     * @param _arrFrom {Array}
     * @param _iIndexBegin {number}
     * @param _iIndexEnd {number}
     */
    subArray_B: function (_arrFrom, _iIndexBegin, _iIndexEnd) {
        return this.subArray(_arrFrom, _iIndexBegin, _iIndexEnd + 1);
    },

};



