"use strict";

/* jshint esversion: 8 */

/*
START: 'npm run test'
 */

const { expect } = require('chai');
const { describe, it } = require('mocha');
const TUrl = require('../TUrl');
const lodash = require('lodash');

describe('TString.firstString', () => {
  it('01', () => {
    const q = TUrl.queryGetC('', [{ name: 'page' }, { name: 'onPage' }]);
    const x = {};
    const x1 = lodash.isEmpty(x);
    console.log('!!-!!-!! x1 {191202090627}\n', x1); //del
  });
});

