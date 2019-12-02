"use strict";

/* jshint esversion: 8 */

/*
START: 'npm run test'
 */

const { expect } = require('chai');
const { describe, it } = require('mocha');
const xrsu = require('../');

describe('TString.firstString', () => {
  it('it: without new string', () => expect(xrsu.TString.firstString('aabb')).to.equal('aabb'));
  it('it: with new string', () => expect(xrsu.TString.firstString('aabb\nccdd')).to.equal('aabb'));
  it('it: with multiply new string', () => expect(xrsu.TString.firstString('aabb\ncc\ndd')).to.equal('aabb'));
  it('it: with only new string', () => expect(xrsu.TString.firstString('\n')).to.equal(''));
  it('it: empty string', () => expect(xrsu.TString.firstString('')).to.equal(''));
  it('it: string " "', () => expect(xrsu.TString.firstString(' ')).to.equal(' '));
  it('it: no string -> throw', () => {
    expect(xrsu.TString.firstString.bind(null, 1)).to.throw()
  });
  it('it: no string -> throw', () => {
    expect(xrsu.TString.firstString.bind(null, undefined)).to.throw()
  });
  it('it: no string -> throw', () => {
    expect(xrsu.TString.firstString.bind(null, null)).to.throw()
  });
  it('it: no string -> throw', () => {
    expect(xrsu.TString.firstString.bind(null, NaN)).to.throw()
  });
});

