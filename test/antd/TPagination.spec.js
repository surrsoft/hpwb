"use strict";

/* jshint esversion: 8 */

/*
START: 'npm run test'
 */

const { expect } = require('chai');
const { describe, it } = require('mocha');
const lodash = require('lodash');
const TPagination = require('../../antd/TPagination');

describe('TPagination.paginationOjCreate', () => {
  it('010', () => {
    const r = {
      current: 1,
      pageSize: 10,
      total: 60,
      pageSizeOptions: ['10', '20', '50'],
      showSizeChanger: true,
      position: 'bottom'
    };
    const x = { location: { search: '?page=1&onPage=10' } }
    const y = ['10', '20', '50'];
    const z = TPagination.paginationOjCreate(x, y, 60);
    expect(z).eql(r);
  });
});

describe('TPagination.skipAndTakeGet', () => {
  it('010', () => {
    const r = { skip: 0, take: 10 };
    const x = { location: { search: '?page=1&onPage=10' } }
    const y = ['10', '20', '50'];
    const z = TPagination.skipAndTakeGet(x, y);
    expect(z).eql(r);
  });
  it('020', () => {
    const r = { skip: 0, take: 15 };
    const x = { location: { search: '?page=1' } }
    const y = ['15', '20', '50'];
    const z = TPagination.skipAndTakeGet(x, y);
    expect(z).eql(r);
  });
  it('030', () => {
    const r = { skip: 0, take: 15 };
    const x = { location: { search: '' } }
    const y = ['15', '20', '50'];
    const z = TPagination.skipAndTakeGet(x, y);
    expect(z).eql(r);
  });
  it('040', () => {
    const r = { skip: 0, take: 20 };
    const x = { location: { search: '?onPage=20' } }
    const y = ['15', '20', '50'];
    const z = TPagination.skipAndTakeGet(x, y);
    expect(z).eql(r);
  });
  it('050', () => {
    const r = { skip: 15, take: 15 };
    const x = { location: { search: '?page=2&onPage=' } }
    const y = ['15', '20', '50'];
    const z = TPagination.skipAndTakeGet(x, y);
    expect(z).eql(r);
  });
  it('060', () => {
    const r = { skip: 20, take: 20 };
    const x = { location: { search: '?page=2&onPage=20' } }
    const y = ['15', '20', '50'];
    const z = TPagination.skipAndTakeGet(x, y);
    expect(z).eql(r);
  });
  it('070', () => {
    const r = { skip: 30, take: 15 };
    const x = { location: { search: '?page=3' } }
    const y = ['15', '20', '50'];
    const z = TPagination.skipAndTakeGet(x, y);
    expect(z).eql(r);
  });
});

