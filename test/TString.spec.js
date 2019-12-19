"use strict";

/* jshint esversion: 8 */

/*
START: 'npm run test'
 */

const { expect } = require('chai');
const { describe, it } = require('mocha');
const TString = require('../TString');

describe('TString', () => {

  describe('firstString', () => {
    it('it: without new string', () => expect(TString.firstString('aabb')).to.equal('aabb'));
    it('it: with new string', () => expect(TString.firstString('aabb\nccdd')).to.equal('aabb'));
    it('it: with multiply new string', () => expect(TString.firstString('aabb\ncc\ndd')).to.equal('aabb'));
    it('it: with only new string', () => expect(TString.firstString('\n')).to.equal(''));
    it('it: empty string', () => expect(TString.firstString('')).to.equal(''));
    it('it: string " "', () => expect(TString.firstString(' ')).to.equal(' '));
    it('it: no string -> throw', () => {
      expect(TString.firstString.bind(null, 1)).to.throw()
    });
    it('it: no string -> throw', () => {
      expect(TString.firstString.bind(null, undefined)).to.throw()
    });
    it('it: no string -> throw', () => {
      expect(TString.firstString.bind(null, null)).to.throw()
    });
    it('it: no string -> throw', () => {
      expect(TString.firstString.bind(null, NaN)).to.throw()
    });
  });

  describe('substring_C', () => {
    it('010', () => {
      expect(TString.substring_C('abcde', 3)).to.equal('abc...');
      expect(TString.substring_C('abcde', 30)).to.equal('abcde');
      expect(TString.substring_C('abcde', 0)).to.equal('...');
      expect(TString.substring_C('', 3)).to.equal('');
    });
  });

  describe('maxOccurrenceStringGet', () => {
    it('', () => {
      const a = ['a', 'b', 'a'];
      const b = TString.maxOccurrenceStringGet(a);
      expect(b).to.equal('a');
    });
    it('', () => {
      const a = ['a', 'b'];
      const b = TString.maxOccurrenceStringGet(a);
      expect(b).to.equal('a');
    });
    it('', () => {
      const a = ['a'];
      const b = TString.maxOccurrenceStringGet(a);
      expect(b).to.equal('a');
    });
    it('', () => {
      const a = [];
      const b = TString.maxOccurrenceStringGet(a);
      expect(b).to.equal(undefined);
    });
    it('', () => {
      const a = undefined;
      const b = TString.maxOccurrenceStringGet(a);
      expect(b).to.equal(undefined);
    });
    it('', () => {
      const a = { a: 1 };
      const b = TString.maxOccurrenceStringGet(a);
      expect(b).to.equal(undefined);
    });
  });

});
