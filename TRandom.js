const { random } = require('lodash');

module.exports = {

  randomTrueFalse: function randomTrueFalse() {
    return !!random(0, 1);
  },

  // {in process}
  randomTrueFalseB: function randomTrueFalse(probablyFalse) {
    const max = 9;
    const min = 0;
    if (probablyFalse < 0) {
      throw new Error(`ERR*: probableFalse need >= ${min}; [${probablyFalse}]`);
    }
    if(probablyFalse > max){
      throw new Error(`ERR*: probableFalse need <= ${max}; [${probablyFalse}]`);
    }
    if(probablyFalse === max) {
      return false;
    }
    if(probablyFalse === min) {
      return true;
    }
    // ---
    // TODO

  },

};
