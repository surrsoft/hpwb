"use strict";

/* jshint esversion: 8 */

const { expect } = require('chai');
const { describe, it } = require('mocha');
const { randomArrInDiap } = require('../TRandom');
const TRandom = require('../TRandom');

describe('TRandom ...', () => {
  describe('randomArrInDiap', () => {
    it('010', () => {
      const result = randomArrInDiap(0, 50)
      console.log('!!-!!-!! result {200831102839}\n', result) // del+
    });
  });
  describe('arrShuffle', () => {
    it('010', () => {
      const arr = ['a', 'b', 'c']
      const arr2 = TRandom.arrShuffle(arr)
      console.log('!!-!!-!! arr2 {200831105110}\n', arr2) // del+
    });
  });
});
