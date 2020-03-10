"use strict";

/* jshint esversion: 8 */

/*
START: 'npm run test'
 */

const { expect } = require('chai');
const { describe, it } = require('mocha');
const TArray = require('../TArray');

const arr = [1, 2, 3, 4, 5, 6, 7];

describe('TArray', () => {


  describe('TArray.subArray_C', () => {
    it('010', () => {
      const arr0 = TArray.subArray_C(arr, 2, 2);
      expect(arr0).eql([3, 4]);
    });
    it('012', () => {
      const arr0 = TArray.subArray_C(arr, 0, 2);
      expect(arr0).eql([1, 2]);
    });
    it('013', () => {
      const arr0 = TArray.subArray_C(arr, 0, 20);
      expect(arr0).eql(arr);
    });
    it('014', () => {
      const arr0 = TArray.subArray_C(arr, 20, 2);
      expect(arr0).eql([]);
    });
    it('016', () => {
      const arr0 = TArray.subArray_C(arr, -2, 2);
      expect(arr0).eql([]);
    });
    it('020', () => {
      const arr0 = TArray.subArray_C([], 2, 2);
      expect(arr0).eql([]);
    });

  });

  describe('TArray.elemRemove', () => {
    it('010', () => {
      const arr = ['a', 'b', 'c', 'd'];
      TArray.elemRemove(arr, 'b');
      expect(arr).eql(['a', 'c', 'd']);
    });
    it('020', () => {
      const arr = ['a', 'b', 'c', 'd'];
      TArray.elemRemove(arr, 'B');
      expect(arr).eql(['a', 'b', 'c', 'd']);
    });
    it('030', () => {
      const arr = [];
      TArray.elemRemove(arr, 'B');
      expect(arr).eql([]);
    });
    it('040', () => {
      const arr = ['a', 'b', 'c', 'd'];
      TArray.elemRemove(arr, '');
      expect(arr).eql(['a', 'b', 'c', 'd']);
    });
    it('050', () => {
      const arr = ['a', 'b', 'b', 'c', 'd'];
      TArray.elemRemove(arr, 'b');
      expect(arr).eql(['a', 'b', 'c', 'd']);
    });
  });

  describe('elemIndexes()', () => {
    it('010', () => {
      const arr = ['a', 'b', 'c', 'b', 'd'];
      const res = TArray.elemIndexes(arr, 'b');
      expect(res).eql([1, 3]);
    });
  });

});
