//"use strict";

/* jshint esversion: 8 */

/*
START: 'npm run test'
 */

const { expect } = require('chai');
const { describe, it } = require('mocha');
const _ = require('lodash');

function Foo() {
}

function Bar() {
  this.a = 1;
}

Bar.n = 2;

function Tax() {
}

Tax.prototype.a = 1;


describe('lodash', () => {
  describe('Lang', () => {
    describe('_.isEmpty', () => {
      // --- true
      it('{} true', () => expect(_.isEmpty({})).to.equal(true));
      it('[] true', () => expect(_.isEmpty([])).to.equal(true));
      it('empty string - true', () => expect(_.isEmpty('')).to.equal(true));
      it('010', () => expect(_.isEmpty()).to.equal(true));
      it('undefined true', () => expect(_.isEmpty(undefined)).to.equal(true));
      it('010', () => expect(_.isEmpty(null)).to.equal(true));
      it('010', () => expect(_.isEmpty(NaN)).to.equal(true));
      it('010', () => expect(_.isEmpty(Infinity)).to.equal(true));
      it('010', () => expect(_.isEmpty(0)).to.equal(true));
      it('010', () => expect(_.isEmpty(-0)).to.equal(true));
      it('010', () => expect(_.isEmpty(+0)).to.equal(true));
      it('020', () => expect(_.isEmpty(1)).to.equal(true));
      it('020', () => expect(_.isEmpty(-1)).to.equal(true));
      it('020', () => expect(_.isEmpty(+1)).to.equal(true));
      it('030', () => expect(_.isEmpty(2)).to.equal(true));
      it('030', () => expect(_.isEmpty(2.6)).to.equal(true));
      it('010', () => expect(_.isEmpty(function () {
      })).to.equal(true));
      it('010', () => expect(_.isEmpty(function (a = 1) {
      })).to.equal(true));
      it('010', () => expect(_.isEmpty(function (a = 1) {
        this.b = 2;
      })).to.equal(true));
      it('new Array() - true', () => expect(_.isEmpty(new Array())).to.equal(true));
      it('Foo() - true', () => expect(_.isEmpty(new Foo())).to.equal(true));
      it('Tax() - true', () => expect(_.isEmpty(new Tax())).to.equal(true));

      // --- false
      it('010', () => expect(_.isEmpty(' ')).to.equal(false));
      it('010', () => expect(_.isEmpty({ a: 1 })).to.equal(false));
      it('010', () => expect(_.isEmpty({ a: undefined })).to.equal(false));
      it('010', () => expect(_.isEmpty([1])).to.equal(false));
      it('010', () => expect(_.isEmpty([{}])).to.equal(false));
      it('Bar()', () => expect(_.isEmpty(new Bar())).to.equal(false));

    });
  });

  describe('Object', () => {

    describe('_.assignIn', () => {
      it('010', () => {
        const oj = { a: 1 };
        const Foo = function () {
          this.a = 2;
          this.b = 3;
        };
        Foo.prototype.a = 4;
        Foo.prototype.d = 5;

        // pay attention on field 'a'
        expect(_.assignInWith(oj, new Foo())).eql({ a: 2, b: 3, d: 5 });
      });

      it('020', () => {
        const oj = { a: 1 };

        const Foo = function () {
          this.a = 2;
          this.b = 3;
        };
        Foo.prototype.a = 4;
        Foo.prototype.d = 5;

        const Bar = function () {
          this.n = 8;
          this.k = { h: 7 };
        };
        Bar.prototype.j = 11;

        // pay attention on field 'a'
        expect(_.assignInWith(oj, new Foo(), new Bar())).eql({ a: 2, b: 3, d: 5, n: 8, k: { h: 7 }, j: 11 });
      });
    });

    describe('_.assignInWith', () => {

      // [[191209112000]]
      it('without "customizer"', () => {
        const oj = { a: 1 };
        const Foo = function () {
          this.a = 2;
          this.b = 3;
        };
        Foo.prototype.a = 4;
        Foo.prototype.d = 5;

        // pay attention on field 'a'
        expect(_.assignInWith(oj, new Foo())).eql({ a: 2, b: 3, d: 5 });
      });

      // [[191209112001]]
      it('with "customizer"; change value', () => {
        const oj = { a: 1 };
        const Foo = function () {
          this.a = 2;
          this.b = 3;
        };
        Foo.prototype.a = 4;
        Foo.prototype.d = 5;

        // pay attention on field 'a'
        const res = _.assignInWith(oj, new Foo(), (objValue, srcValue, key, object, source) => {
          if (key === 'd') {
            return 10;
          }
        });
        expect(res).eql({ a: 2, b: 3, d: 10 });
      });

      // [[191209112002]]
      it('with "customizer"; delete field "a"', () => {
        const oj = { a: 1 };
        const Foo = function () {
          this.a = 2;
          this.b = 3;
        };
        Foo.prototype.a = 4;
        Foo.prototype.d = 5;

        // pay attention on field 'a'
        const res = _.assignInWith(oj, new Foo(), (objValue, srcValue, key, object, source) => {
          delete object.a;
        });
        expect(res).eql({ b: 3, d: 5 });
      });

      it('with "customizer"; "customizer" return undefined', () => {
        const oj = { a: 1 };
        const Foo = function () {
          this.a = 2;
          this.b = 3;
        };
        Foo.prototype.a = 4;
        Foo.prototype.d = 5;

        // pay attention on field 'a'
        const res = _.assignInWith(oj, new Foo(), (objValue, srcValue, key, object, source) => {
          return undefined;
        });
        expect(res).eql({ a: 2, b: 3, d: 5 });
      });
    });

    describe('_.at', () => {
      it('', () => {
        const oj = { a: 1, b: 2, c: { d: 4 } };
        const res = _.at(oj);
        expect(res).eql([]);
      });
      it('', () => {
        const oj = { a: 1, b: 2, c: { d: 4 } };
        const res = _.at(oj, ['b']);
        expect(res).eql([2]);
      });
      it('deep', () => {
        const oj = { a: 1, b: 2, c: { d: 4 } };
        const res = _.at(oj, ['c.d']);
        expect(res).eql([4]);
      });
      it('multi', () => {
        const oj = { a: 1, b: 2, c: { d: 4 } };
        const res = _.at(oj, ['a', 'c.d']);
        expect(res).eql([1, 4]);
      });
      it('multi', () => {
        const oj = { a: 1, b: 2, c: { d: 4 } };
        const res = _.at(oj, ['a', 'c']);
        expect(res).eql([1, { d: 4 }]);
      });

      it('path not exist', () => {
        const oj = { a: 1, b: 2, c: { d: 4 } };
        const res = _.at(oj, ['z']);
        expect(res).eql([undefined]);
      });
      it('', () => {
        const oj = undefined;
        const res = _.at(oj, ['a', 'z']);
        expect(res).eql([undefined, undefined]);
      });
    });

  });

  describe('String', () => {
    describe('replace', () => {
      it('one replace', () => expect(_.replace('aabbccddcctt', 'cc', '11')).to.equal('aabb11ddcctt'));
      it('multi replace', () => expect(_.replace('aabbccddcctt', /cc/g, '11')).to.equal('aabb11dd11tt'));
      it('010', () => expect(_.replace('aaaa', /aa/g, 'n')).to.equal('nn'));
    });
  });


});
