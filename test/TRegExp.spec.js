"use strict";

/* jshint esversion: 8 */

/*
START: 'npm run test'
 */

const { expect } = require('chai');
const { describe, it } = require('mocha');
const TRegExp = require('../TRegExp');

describe('TRegExp ...', () => {

  describe('RG_PORT', () => {
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

  describe('RG_PORTS', () => {
    it('', () => expect(new RegExp(TRegExp.RG_PORTS).test('1')).to.equal(true));
    it('', () => expect(new RegExp(TRegExp.RG_PORTS).test('1 1')).to.equal(true));
    it('', () => expect(new RegExp(TRegExp.RG_PORTS).test('65535 65535')).to.equal(true));

    it('', () => expect(new RegExp(TRegExp.RG_PORTS).test('65535 65536')).to.equal(false));
    it('', () => expect(new RegExp(TRegExp.RG_PORTS).test('65535 65535 ')).to.equal(false));
    it('', () => expect(new RegExp(TRegExp.RG_PORTS).test('0')).to.equal(false));
    it('', () => expect(new RegExp(TRegExp.RG_PORTS).test(' ')).to.equal(false));
    it('', () => expect(new RegExp(TRegExp.RG_PORTS).test('text text')).to.equal(false));
  });

  describe('RG_URI_QUERY', () => {
    it('010', () => expect(new RegExp(TRegExp.RG_URI_QUERY).test('path')).to.equal(true));
    it('020', () => expect(new RegExp(TRegExp.RG_URI_QUERY).test('path/path')).to.equal(true));

    it('030', () => expect(new RegExp(TRegExp.RG_URI_QUERY).test('/')).to.equal(false));
    it('030', () => expect(new RegExp(TRegExp.RG_URI_QUERY).test('//')).to.equal(false));
    it('030', () => expect(new RegExp(TRegExp.RG_URI_QUERY).test('/path//path/')).to.equal(false));
    it('030', () => expect(new RegExp(TRegExp.RG_URI_QUERY).test('/path/path/')).to.equal(false));
    it('040', () => expect(new RegExp(TRegExp.RG_URI_QUERY).test('')).to.equal(false));
    it('050', () => expect(new RegExp(TRegExp.RG_URI_QUERY).test(' ')).to.equal(false));
    it('060', () => expect(new RegExp(TRegExp.RG_URI_QUERY).test(' /path')).to.equal(false));
    it('070', () => expect(new RegExp(TRegExp.RG_URI_QUERY).test('/pa th')).to.equal(false));
    it('070', () => expect(new RegExp(TRegExp.RG_URI_QUERY).test('pa th')).to.equal(false));
    it('080', () => expect(new RegExp(TRegExp.RG_URI_QUERY).test('/pathпуть')).to.equal(false));
  });

});
