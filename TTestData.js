/* jshint esversion: 6 */


module.exports.data = [
  undefined,
  null,
  NaN,
  Infinity,
  '',
  ' ',
  0,
  -0,
  +0,
  -1,
  1,
  1,
  {},
  { a: 1 },
  [],
  [{}],
  [{ a: 1 }],
];

module.exports.dataB = {
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: {
      f: 4
    }
  },
  g: {
    h: 5
  }
};
