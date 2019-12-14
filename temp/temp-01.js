const TInfo = require('../TInfo');
const TObject = require('../TObject');
const lodash = require('lodash');
const TTestData = require('../TTestData');
const util = require('util');

// fn is [kfrx]-object
function Car() {
  this.color = 1;
  this.run = function () {
    return `run car with color ${this.color}`
  }
}

const car = new Car();

const car2 = Object.create(car);

car2.color = 2;
const car2Run = car2.run();
console.log('!!-!!-!! car2Run {191214154910}\n', car2Run); //del

console.log('!!-!!-!! car {191214154134}\n', car); //del

const info = TInfo.info_C(car2);
console.log('!!-!!-!! info {191214003114}\n', info); //del
