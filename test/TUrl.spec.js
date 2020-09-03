"use strict";

/* jshint esversion: 8 */

/*
START: 'npm run test'
 */

const { expect } = require('chai');
const { describe, it } = require('mocha');
const lodash = require('lodash');
const TUrl = require('../TUrl');
const TObject = require('../TObject');

describe('TUrl.parse', () => {
  it('010', () => {
    const url = 'http://ya.ru';
    // TODO
  });
});

describe('TUrl.queryGetC', () => {
  it('010 return {}', () => {
    const q = TUrl.queryGetC('', [{ name: 'page' }, { name: 'onPage' }]);
    const b = TObject.isEmptyObject(q);
    expect(b).to.equal(true);
  });
  it('020', () => {
    const q = TUrl.queryGetC('?page=1', [{ name: 'page' }, { name: 'onPage' }]);
    expect(q).eql({ page: '1' });
  });
  it('030', () => {
    const q = TUrl.queryGetC('?page=1&onPage=2', [{ name: 'page' }, { name: 'onPage' }]);
    expect(q).eql({ page: '1', onPage: '2' });
  });
  it('032', () => {
    const q = TUrl.queryGetC('?page=1&onPage=2', [{ name: 'page', newName: 'skip' }, { name: 'onPage' }]);
    expect(q).eql({ skip: '1', onPage: '2' });
  });
  it('034', () => {
    const q = TUrl.queryGetC('?page=1&onPage=2', [{ name: 'page1', newName: 'skip', default: 10 }, { name: 'onPage' }]);
    expect(q).eql({ skip: 10, onPage: '2' });
  });
  it('040', () => {
    const q = TUrl.queryGetC('?page=1&onPage=2', [{ name: 'page' }, { name: 'onPage1' }]);
    expect(q).eql({ page: '1' });
  });
  it('050 dupl elems', () => {
    const q = TUrl.queryGetC('?page=1&page=2', [{ name: 'page' }]);
    expect(q).eql({ page: '1' });
  });
  it('060 fnTransform', () => {
    const q = TUrl.queryGetC('?page=10', [{
      name: 'page', newName: 'skip', fnTransform(stVal) {
        return parseInt(stVal, 10) || 0;
      }
    }]);
    expect(q).eql({ skip: 10 });
  });
  it('070 fnTransform', () => {
    const q = TUrl.queryGetC('?page=bbb', [{
      name: 'page',
      newName: 'skip',
      fnTransform(stVal) {
        return parseInt(stVal, 10) || 0;
      },
      default: 5,
    }]);
    expect(q).eql({ skip: 0 });
  });
});

