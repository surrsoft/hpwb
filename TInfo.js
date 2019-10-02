"use strict";

/* jshint esversion: 6 */

/*
ОПИСАНИЕ: утилитные функции для получения отладочной информации о различных сущностях

 */

const util = require('util');
const TUtil = require('./TUtil');
const TString = require('./TString');

//`````````````````````````````````````````````````````````````````````````````````````````````````
/**
 * Если TRUE то при выводе показывается так же typeof объекта
 * @type {boolean}
 */
let mOptTypeof = false;

module.exports = {

    /**
     * Возвращает информацию об объекте (1) в удобочитаемом виде
     * @param _oj (1) --
     */
    info: function (_oj) {
        TUtil.argsCountVerifEx(arguments, 1);
        return this.fnInspect(_oj);
    },

    /**
     * Помимо информации о самом объекте (1) отображает так же информацию о всех его прототипах
     *
     * @param _oj (1) --
     * @returns {string} например { c: 4 } --> { a: 2 } --> {}
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
     * Выводит информацию об объекте (2) в консоль в удобочитаемом виде
     * @param _stPrefix (1) --
     * @param _oj (2) --
     * @param _stSuffix (3) --
     */
    infoConsole: function (_stPrefix, _oj, _stSuffix) {
        TUtil.argsCountVerifEx(arguments, 3);
        console.log(_stPrefix + this.info(_oj) + _stSuffix);
    },

    /**
     * Выводит информацию об объекте (2) и всех его прототипах в консоль в удобочитаемом виде
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
     * Преобразует (2) используя util.inspect(), обрезает получившуюся строку до (4) символов и выводит в консоль
     * предварив префиксом (1) и суффиксом (2)
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
     * Возвращает определение функции которая использовалась как конструктор для создания объекта (1)
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


};

