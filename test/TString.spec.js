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

  describe('contains', () => {
    it('010', () => expect(TString.contains('aaBbcc', 'a')).to.equal(true));
    it('020', () => expect(TString.contains('aaBbcc', 'B')).to.equal(true));
    it('030', () => expect(TString.contains('aaBbcc', 'A')).to.equal(false));
    it('040', () => expect(TString.contains('aaBbcc', '')).to.equal(false));
    it('050', () => expect(TString.contains('', 'A')).to.equal(false));
    it('060', () => expect(TString.contains('', '')).to.equal(false));

    it('070', () => expect(TString.contains(undefined, 'A')).to.equal(false));
    it('080', () => expect(TString.contains('aaBbcc', undefined)).to.equal(false));
    it('090', () => expect(TString.contains(undefined, undefined)).to.equal(false));

    it('100', () => expect(TString.contains({ a: 'a' }, 'a')).to.equal(false));
  });

  describe('trim', () => {
    let st = '  aaB  bcc  ';
    it('010', () => expect(TString.trim(st)).to.equal('aaB  bcc'));
    it('012', () => expect(st).to.equal('  aaB  bcc  '));
    // ---
    it('020', () => expect(TString.trim('  aaB  bcc \n ')).to.equal('aaB  bcc'));
    it('030', () => expect(TString.trim('  ')).to.equal(''));
    it('040', () => expect(TString.trim('\n')).to.equal(''));
    it('050', () => expect(TString.trim('')).to.equal(''));
    it('060', () => expect(TString.trim({})).to.equal(''));
    it('070', () => expect(TString.trim(undefined)).to.equal(''));
  });

  describe('spaceReplaceDoubles', () => {
    it('010', () => expect(TString.spaceReplaceDoubles('  aaB  bcc  ')).to.equal(' aaB bcc '));
    it('020', () => expect(TString.spaceReplaceDoubles('   ')).to.equal(' '));
    it('040', () => expect(TString.spaceReplaceDoubles('\n')).to.equal(' '));      // (!)
    it('045', () => expect(TString.spaceReplaceDoubles('a\nb')).to.equal('a b'));  // (!)
    it('046', () => expect(TString.spaceReplaceDoubles(' \n')).to.equal(' '));     // (!)
    it('050', () => expect(TString.spaceReplaceDoubles('')).to.equal(''));
    it('060', () => expect(TString.spaceReplaceDoubles({})).to.equal(''));
    it('070', () => expect(TString.spaceReplaceDoubles(undefined)).to.equal(''));
  });

  describe('smooth', () => {
    it('010', () => expect(TString.smooth('  aaB  b  cc  ')).to.equal('aaB b cc'));
    it('020', () => expect(TString.smooth('   ')).to.equal(''));
    it('040', () => expect(TString.smooth('\n')).to.equal(''));      // (!)
    it('045', () => expect(TString.smooth('a\nb')).to.equal('a b'));  // (!)
    it('046', () => expect(TString.smooth(' \n')).to.equal(''));     // (!)
    it('050', () => expect(TString.smooth('')).to.equal(''));
    it('060', () => expect(TString.smooth({})).to.equal(''));
    it('070', () => expect(TString.smooth(undefined)).to.equal(''));
  });

  describe('comparePrincipal', () => {
    it('010', () => expect(TString.comparePrincipal('v', 'v')).to.equal(TString.COMPARE__NO_CHANGE));
    it('010', () => expect(TString.comparePrincipal('v', 's')).to.equal(TString.COMPARE__CHANGED));
    it('010', () => expect(TString.comparePrincipal('v', '')).to.equal(TString.COMPARE__DELETE));
    it('010', () => expect(TString.comparePrincipal('', 'v')).to.equal(TString.COMPARE__ADDED));
    it('010', () => expect(TString.comparePrincipal('', '')).to.equal(TString.COMPARE__NO_CHANGE));
    it('010', () => expect(TString.comparePrincipal('')).to.equal(TString.COMPARE__NO_CHANGE));
  });

});
