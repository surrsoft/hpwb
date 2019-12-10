const TInfo = require('../TInfo');
const TObject = require('../TObject');
const lodash = require('lodash');


const oj = {a: 1};

const oj1 = Object.create(oj);
oj1.b = 2;

const ps = TObject.prototypesGetB(oj1);
console.log('!!-!!-!! ps {191209225254}\n', ps); //del
