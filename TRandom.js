const { random } = require('lodash');

module.exports = {

  randomTrueFalse: function randomTrueFalse() {
    return !!random(0, 1);
  },

  // {in progress}
  randomTrueFalseB: function randomTrueFalse(probablyFalse) {
    const max = 9;
    const min = 0;
    if (probablyFalse < 0) {
      throw new Error(`ERR*: probableFalse need >= ${min}; [${probablyFalse}]`);
    }
    if (probablyFalse > max) {
      throw new Error(`ERR*: probableFalse need <= ${max}; [${probablyFalse}]`);
    }
    if (probablyFalse === max) {
      return false;
    }
    if (probablyFalse === min) {
      return true;
    }
    // ---
    // TODO

  },

  /**
   * Return array with random numbers from diap (1)(inclisive)-(2)(inclusive)
   * Version 1 1.0 2020-08-31; ID: [xrsu] [[200831104000]]
   * Dependencies: lodash.random
   * @param start (1) -- example 0
   * @param end (2) -- example 3
   * @return {[]} -- example [0, 3, 1, 2]
   */
  randomArrInDiap(start, end) {
    const ret = []
    // ---
    let nums = []
    for (let ix = start; ix <= end; ix++) {
      nums.push(ix)
    }
    // ---
    while (nums.length > 0) {
      const rndIx = random(0, nums.length - 1)
      const delElem = nums.splice(rndIx, 1)
      ret.push(delElem[0])
    }
    return ret
  },

  /**
   * Random shuffle elems at array (1). Is not change array (1)
   * Version: 1 1.0 2020-08-31; ID: [xrsu] [[200831105500]]
   * Dependecies: 1. lodash.random; 2. [xrsu] randomArrInDiap (200831104000)
   * @param arr (1) -- example [1, 2, 3]
   * @return {*[]|*} -- example [3, 1, 2]
   */
  arrShuffle(arr) {
    if (arr && arr.length > 0) {
      if (arr.length === 1) {
        return arr.map(o => o)
      }
      const ixs = this.randomArrInDiap(0, arr.length - 1)
      return ixs.map(ix => arr[ix])
    }
    return arr;
  }

};
