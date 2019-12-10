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
      it('010', () => expect(_.isEmpty({})).to.equal(true));
      it('010', () => expect(_.isEmpty([])).to.equal(true));
      it('010', () => expect(_.isEmpty('')).to.equal(true));
      it('010', () => expect(_.isEmpty()).to.equal(true));
      it('010', () => expect(_.isEmpty(undefined)).to.equal(true));
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
      it('040', () => expect(_.isEmpty(new Array())).to.equal(true));
      it('Foo()', () => expect(_.isEmpty(new Foo())).to.equal(true));
      it('Bar() 2', () => expect(_.isEmpty(new Tax())).to.equal(true));

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
          console.log('!!-!!-!! -> ------------- () {191209112643}'); //del
          console.log('!!-!!-!! objValue {191209112417}\n', objValue); //del
          console.log('!!-!!-!! srcValue {191209112421}\n', srcValue); //del
          console.log('!!-!!-!! key {191209112425}\n', key); //del
          console.log('!!-!!-!! object {191209112430}\n', object); //del
          console.log('!!-!!-!! source {191209112434}\n', source); //del
          delete object.a;
        });
        expect(res).eql({ b: 3, d: 5 });
      });
    });

  });


});
