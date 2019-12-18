"use strict";

/* jshint esversion: 8 */

/*
START: 'npm run test'
 */

const { expect } = require('chai');
const { describe, it } = require('mocha');
const TObject = require('../TObject');

describe('TObject ...', () => {

  describe('isEmptyObject', () => {
    it('{} : true', () => expect(TObject.isEmptyObject({})).to.equal(true));
    // ---
    it('{ a: 1 }', () => expect(TObject.isEmptyObject({ a: 1 })).to.equal(false));
    it('null', () => expect(TObject.isEmptyObject(null)).to.equal(false));
    it('undefined', () => expect(TObject.isEmptyObject(undefined)).to.equal(false));
    it('NaN', () => expect(TObject.isEmptyObject(NaN)).to.equal(false));
    it('1', () => expect(TObject.isEmptyObject(1)).to.equal(false));
    it('""', () => expect(TObject.isEmptyObject('')).to.equal(false));
    it('"a"', () => expect(TObject.isEmptyObject('a')).to.equal(false));
    it('function : false', () => expect(TObject.isEmptyObject(function () {
    })).to.equal(false));
    it('[] : false', () => expect(TObject.isEmptyObject([])).to.equal(false));
    // ---
    function Fn() {

    }
    const oj = new Fn();
    it('', () => expect(TObject.isEmptyObject(oj)).to.equal(false));

  });

  describe('isNotEmptyObject', () => {
    it('{}', () => expect(TObject.isNotEmptyObject({})).to.equal(false));
    // ---
    it('{ a: 1 }', () => expect(TObject.isNotEmptyObject({ a: 1 })).to.equal(true));
    it('null', () => expect(TObject.isNotEmptyObject(null)).to.equal(false));
    it('undefined', () => expect(TObject.isNotEmptyObject(undefined)).to.equal(false));
    it('NaN', () => expect(TObject.isNotEmptyObject(NaN)).to.equal(false));
    it('1', () => expect(TObject.isNotEmptyObject(1)).to.equal(false));
    it('""', () => expect(TObject.isNotEmptyObject('')).to.equal(false));
    it('"a"', () => expect(TObject.isNotEmptyObject('a')).to.equal(false));
    it('function', () => expect(TObject.isNotEmptyObject(function () {
    })).to.equal(false));
    it('[]', () => expect(TObject.isNotEmptyObject([])).to.equal(false));
  });

  describe('fieldsOwnCount', () => {
    it('{}', () => expect(TObject.fieldsOwnCount({})).to.equal(0));
    it('{ a: 1 }', () => expect(TObject.fieldsOwnCount({ a: 1 })).to.equal(1));
    it('030', () => expect(TObject.fieldsOwnCount({ a: 1, b: { c: 2 } })).to.equal(2));
    it('040', () => expect(TObject.fieldsOwnCount([1, 2])).to.equal(0));
    // ---
    it('null', () => expect(TObject.fieldsOwnCount(null)).to.equal(0));
    it('undefined', () => expect(TObject.fieldsOwnCount(undefined)).to.equal(0));
    it('NaN', () => expect(TObject.fieldsOwnCount(NaN)).to.equal(0));
    it('1', () => expect(TObject.fieldsOwnCount(1)).to.equal(0));
    it('""', () => expect(TObject.fieldsOwnCount('')).to.equal(0));
    it('"a"', () => expect(TObject.fieldsOwnCount('a')).to.equal(0));
    it('function : 0', () => expect(TObject.fieldsOwnCount(function () {
    })).to.equal(0));
    it('[] : 0', () => expect(TObject.fieldsOwnCount([])).to.equal(0));
  });

});
