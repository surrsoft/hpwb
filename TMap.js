"use strict";

/* jshint esversion: 8 */

/*
DESCRIPTION: utility functions for work with type Map

 */

const TUtil = require('./TUtil');

module.exports = {
    /**
     * Return keys of Map (1) as array
     *
     * @param _map {Map} (1) --
     * @returns {[]}
     */
    keysGet: function (_map) {
        TUtil.argsCountVerifEx(arguments, 1);
        TUtil.exceptIf(_map, _map + '');
        //---
        return Array.from(_map.keys());
    },

    /**
     * Differ from A only that convert keys to type String
     *
     * @param _map {Map} (1) --
     * @returns {String[]}
     */
    keysGet_B: function (_map) {
        TUtil.argsCountVerifEx(arguments, 1);
        TUtil.exceptIf(_map, _map + '');
        //---
        const ret = [];
        for (const key of _map.keys()) {
            ret.push(key + '');
        }
        return ret;
    }

};

