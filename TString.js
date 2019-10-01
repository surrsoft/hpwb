"use strict";

/* jshint esversion: 6 */

const lodash = require('lodash');
const TUtil = require('./TUtil.js');
const util = require('util');

module.exports = {

    /**
     * Возвращает TRUE если строка (1) удовлетворяет регулярному выражению (2), иначе возвращает FALSE
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
     * Выделяет из строки (1) первые (2) символов.
     * Если (2) больше чем длина (1) то возвращает (1).
     * Если (1) это не строка или lodah.isEmpty то возвращает пустую строку.
     *
     * Исключение если:
     * - переданы не все аргументы
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
     * Отличает от А только тем что добавляет многоточие в конце если строка (1) была обрезана (т.е. если её длина
     * больше чем (2)). Также отличается тем что преобразует (1) в строку с помощью util.inspect() перед тем как брать
     * подстроку
     */
    substring_B: function (_st, _iCount) {
        let s = this.substring(util.inspect(_st), _iCount);
        if (_st.length > _iCount) {
            s += '...';
        }
        return s;
    }

};
