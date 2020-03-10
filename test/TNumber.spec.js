"use strict";

/* jshint esversion: 8 */

/*
START: 'npm run test'
 */

const { expect, assert } = require('chai');
const { describe, it } = require('mocha');
const xrsu = require('../');

describe('', () => {
  describe('TNumber.fromString', () => {
    it('', () => expect(xrsu.TNumber.fromString('1')).to.equal(1));
    it('', () => expect(xrsu.TNumber.fromString('f')).to.equal(0));
    it('', () => expect(xrsu.TNumber.fromString('0')).to.equal(0));
    it('', () => expect(xrsu.TNumber.fromString('-1')).to.equal(-1));
    it('', () => expect(xrsu.TNumber.fromString('+1')).to.equal(1));
    it('', () => expect(xrsu.TNumber.fromString('-0')).to.equal(0));
    it('', () => expect(xrsu.TNumber.fromString('+0')).to.equal(0));
    it('', () => expect(xrsu.TNumber.fromString(' ')).to.equal(0));
    it('', () => expect(xrsu.TNumber.fromString(undefined)).to.equal(0));
    it('', () => expect(xrsu.TNumber.fromString(null)).to.equal(0));
    it('', () => expect(xrsu.TNumber.fromString(NaN)).to.equal(0));
    it('', () => expect(xrsu.TNumber.fromString('1.6')).to.equal(0));
    it('', () => expect(xrsu.TNumber.fromString('1e5')).to.equal(100000));
    it('', () => expect(xrsu.TNumber.fromString('1E5')).to.equal(100000));
    it('', () => expect(xrsu.TNumber.fromString('1E+5')).to.equal(100000));
    it('', () => expect(xrsu.TNumber.fromString('5a4aa')).to.equal(0));
    it('', () => expect(xrsu.TNumber.fromString('0010')).to.equal(10));
  });

  // [[200303115000]]
  describe('roundToUp()', () => {
    it('010', () => expect(xrsu.TNumber.roundToUp(1.2)).to.equal(2));
    it('020', () => expect(xrsu.TNumber.roundToUp(1.5)).to.equal(2));
    it('030', () => expect(xrsu.TNumber.roundToUp(1.7)).to.equal(2));
    it('040', () => expect(xrsu.TNumber.roundToUp(undefined)).to.be.NaN);
    it('050', () => expect(xrsu.TNumber.roundToUp('str')).to.be.NaN);
    it('060', () => expect(xrsu.TNumber.roundToUp(NaN)).to.be.NaN);
  });
});




