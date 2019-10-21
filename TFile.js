"use strict";
/* jshint esversion: 8 */

/*
DESCRIPTION: functions for work with files and directories
 */

//require
//`````````````````````````````````````````````````````````````````````````````````````````````````
const fs = require('fs');

//`````````````````````````````````````````````````````````````````````````````````````````````````
//--- [[ubtm]] - encodings fro use with 'options' of functions module 'fs'
const UBTM_ASCII = 'ascii';
const UBTM_UTF8 = 'utf8';
const UBTM_UTF16LE = 'utf16le';
const UBTM_UCS2 = 'ucs2';
const UBTM_LATIN1 = 'latin1';
const UBTM_BINARY = 'binary';

//`````````````````````````````````````````````````````````````````````````````````````````````````
/**
 * {IN WORK}
 * Return content of file (1) as string from file enconding as UTF-8
 *
 * @param _stFileNameAbs (1) -- file with enconding UTF8
 * @returns {string} string encoding as UTF8
 */
function readFileSync(_stFileNameAbs) {
    return fs.readFileSync(_stFileNameAbs, UBTM_UTF8);
}

exports.UBTM_ASCII = UBTM_ASCII;
exports.UBTM_UTF8 = UBTM_UTF8;
exports.UBTM_UTF16LE = UBTM_UTF16LE;
exports.UBTM_UCS2 = UBTM_UCS2;
exports.UBTM_LATIN1 = UBTM_LATIN1;
exports.UBTM_BINARY = UBTM_BINARY;
