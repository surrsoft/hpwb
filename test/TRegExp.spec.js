"use strict";

/* jshint esversion: 8 */

/*
START: 'npm run test'
 */

const { expect } = require('chai');
const { describe, it } = require('mocha');
const TRegExp = require('../TRegExp');

describe('TRegExp ...', () => {

  describe('PORT', () => {
    it('', () => expect(new RegExp(TRegExp.RG_PORT).test('1')).to.equal(true));
    it('', () => expect(new RegExp(TRegExp.RG_PORT).test('65535')).to.equal(true));

    it('', () => expect(new RegExp(TRegExp.RG_PORT).test(' 65535')).to.equal(false));
    it('', () => expect(new RegExp(TRegExp.RG_PORT).test('65 535')).to.equal(false));

    it('', () => expect(new RegExp(TRegExp.RG_PORT).test('0')).to.equal(false));
    it('', () => expect(new RegExp(TRegExp.RG_PORT).test('65536')).to.equal(false));

    it('', () => expect(new RegExp(TRegExp.RG_PORT).test('')).to.equal(false));
    it('', () => expect(new RegExp(TRegExp.RG_PORT).test('text')).to.equal(false));
    it('', () => expect(new RegExp(TRegExp.RG_PORT).test(null)).to.equal(false));
    it('', () => expect(new RegExp(TRegExp.RG_PORT).test(undefined)).to.equal(false));
  });

  describe('PORTS', () => {
    it('', () => expect(new RegExp(TRegExp.RG_PORTS).test('1')).to.equal(true));
    it('', () => expect(new RegExp(TRegExp.RG_PORTS).test('1 1')).to.equal(true));
    it('', () => expect(new RegExp(TRegExp.RG_PORTS).test('65535 65535')).to.equal(true));

    it('', () => expect(new RegExp(TRegExp.RG_PORTS).test('65535 65536')).to.equal(false));
    it('', () => expect(new RegExp(TRegExp.RG_PORTS).test('65535 65535 ')).to.equal(false));
    it('', () => expect(new RegExp(TRegExp.RG_PORTS).test('0')).to.equal(false));
    it('', () => expect(new RegExp(TRegExp.RG_PORTS).test(' ')).to.equal(false));
    it('', () => expect(new RegExp(TRegExp.RG_PORTS).test('text text')).to.equal(false));
  });

});
