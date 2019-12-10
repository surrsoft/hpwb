"use strict";

/* jshint esversion: 8 */

/*
START: 'npm run test'
 */

const { expect } = require('chai');
const { describe, it } = require('mocha');

const trueData = [
  ' ',
  -1,
  1,
  1,
  0.1,
  Infinity,
  -Infinity,
  {},
  { a: 1 },
  [{}],
  [{ a: 1 }],
  function () {

  },
  [],
  new Array(),
];

const falseData = [
  undefined,
  null,
  NaN,
  '',
  "",
  ``,
  0,
  -0,
  +0,
];

describe('JavaScript', () => {
  describe('if', () => {

    trueData.forEach(elem => {
      it(`true [${elem}]`, () => {
        let b = false;
        if (elem) b = true;
        expect(b).to.equal(true);
      });
    });

    falseData.forEach(elem => {
      it(`false [${elem}]`, () => {
        let b = false;
        if (elem) b = true;
        expect(b).to.equal(false);
      });
    });

  });
});
