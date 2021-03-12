import { random, toNumber } from 'lodash';

/**
 * [afzk]-pagination
 * Version 1 1.0 2020-09-18; ID [xrsu] 200918101100
 * @type {AfzkPagination}
 */
export class AfzkPagination {
  pageCountAll;
  diapLeftRight;
  minTreshold;

  constructor(pageCountAll, diapLeftRight, minTreshold = 10, ostLeft = 1, ostRight = 1) {
    this.pageCountAll = pageCountAll;
    this.diapLeftRight = diapLeftRight;
    // если this.pageCountAll <= этого порога то "..." не будет
    this.minTreshold = minTreshold;
    // обязательный остаток слева
    this.ostLeft = ostLeft;
    // обязательный остаток справа
    this.ostRight = ostRight;
  }

  /**
   *
   * @param pageNumber -- 1+
   * @return -1 в результате означает место вставки "..."
   */
  get(pageNumber) {
    const pageNumber0 = pageNumber <= this.pageCountAll ? pageNumber : this.pageCountAll;
    if (this.pageCountAll <= this.minTreshold) {
      const ret = []
      for (let ix = 1; ix <= this.pageCountAll; ix++) {
        ret.push(ix)
      }
      return ret;
    }
    // ---
    const np = this.diapLeftRight * 2 + 1 >= this.pageCountAll;
    if (np) {
      throw new Error('ERR*: 200918111700');
    }
    // ---
    const ret = [];
    const ny = pageNumber - this.diapLeftRight - this.ostLeft;
    if (ny >= 1) {
      for (let iz = 1; iz <= this.ostLeft; iz++) {
        ret.push(iz);
      }
      ret.push(-1);
      for (let ix2 = pageNumber0 - this.diapLeftRight; ix2 <= pageNumber0 + this.diapLeftRight; ix2++) {
        if (ix2 <= this.pageCountAll) {
          ret.push(ix2);
        }
      }
    } else {
      const nm = pageNumber + this.diapLeftRight
      for (let i4 = 1; i4 <= nm; i4++) {
        ret.push(i4)
      }
    }
    // ---
    const nz = this.pageCountAll - ret[ret.length - 1];
    if (nz === 1) {
      ret.push(this.pageCountAll)
    } else if (nz > this.ostRight) {
      const nf = nz - this.ostRight;
      ret.push(-1);
      for (let i3 = 1; i3 <= this.ostRight; i3++) {
        ret.push(this.pageCountAll - this.ostRight + i3)
      }
    }
    return ret;
  }
}

/**
 * Version 1 1.0 2020-08-29; ID: 200829111800
 */
export class StdPagination {
  elemsCountAll;
  elemsPerPage;

  /**
   *
   * @param elemsCountAll {Number} -- total count elems
   * @param elemsPerPage {Number} -- elems on page
   */
  constructor(elemsCountAll = 0, elemsPerPage = 10) {
    this.elemsCountAll = elemsCountAll;
    this.elemsPerPage = elemsPerPage;
    // ---
    if (elemsCountAll < 0) {
      this.elemsCountAll = 0
    }
    if (elemsPerPage < 1) {
      this.elemsPerPage = 10
    }
  }

  pageCountGet() {
    const nm0 = this.elemsCountAll / this.elemsPerPage;
    let ret = Math.floor(nm0)
    const rest = this.elemsCountAll % this.elemsPerPage
    if (rest > 0) {
      ret += 1
    }
    return ret
  }

  indexesByPage(page) {
    if (!page || page < 1) {
      return [0, this.elemsPerPage - 1];
    }
    // ---
    let page0 = page;
    let b = false;
    const pageCount = this.pageCountGet();
    if (page >= pageCount) {
      page0 = pageCount
      b = true;
    }
    // ---
    const nx = page0 * this.elemsPerPage - 1
    const nx2 = nx - this.elemsPerPage + 1
    return [nx2, !b ? nx : this.elemsCountAll - 1]
  }
}

/**
 * Return subarray from index (1) inclusive to index (2) inclusive
 * Version 1 1.0 2020-08-29; ID 2008291140
 * @param arr -- example ['a', 'b', 'c', 'd']
 * @param indexStart -- example 1
 * @param indexEnd -- example 2
 * @return example ['b', 'c']
 */
export function stdArrSubArrayGet(arr, indexStart, indexEnd) {
  if (Array.isArray(arr) && indexStart >= 0 && indexEnd >= 0) {
    return arr.slice(indexStart, indexEnd + 1)
  }
  return []
}

/**
 * Return array with random numbers from diap (1)(inclisive)-(2)(inclusive)
 * Version 1 1.0 2020-08-31; ID: [xrsu] 200831104000
 * Dependencies: lodash.random
 * @param start (1) -- example 0
 * @param end (2) -- example 3
 * @return {[]} -- example [0, 3, 1, 2]
 */
export function stdRandomArrInDiap(start, end) {
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
}

/**
 * Random shuffle elems at array (1). Is not change array (1)
 * Version: 1 1.0 2020-08-31; ID: [xrsu] [[200831105500]]
 * Dependecies: 1. lodash.random; 2. [xrsu] randomArrInDiap (200831104000)
 * @param arr (1) -- example [1, 2, 3]
 * @return {*[]|*} -- example [3, 1, 2]
 */
export function stdArrShuffle(arr) {
  if (arr && arr.length > 0) {
    if (arr.length === 1) {
      return arr.map(o => o)
    }
    const ixs = stdRandomArrInDiap(0, arr.length - 1)
    return ixs.map(ix => arr[ix])
  }
  return arr;
}

export async function stdSleep(msec) {
  return new Promise(resolve => setTimeout(resolve, msec))
}

const emailRegex = new RegExp(
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
);

export function utilIsEmail(value) {
  emailRegex.lastIndex = 0
  return emailRegex.test(value);
}

// Version 1.0; ID 200909160200
export function utilStringNormalize(st) {
  if (st && st.length > 0) {
    return st.toLowerCase().trim()
  }
  return st;
}

/**
 * Convert number-as-string to number.
 * See test
 * Dependencies: lodash
 * Version 1 1.0; ID [xrsu] 200910182000
 * @param stNumber {string | number} -- example '3.2', '3,2', 3.2, 3
 * @return {number}
 */
export function utilNumberFrom(stNumber) {
  if (stNumber && (typeof stNumber === 'string')) {
    const stNumber0 = stNumber.replace(/,/, '.')
    return toNumber(stNumber0) || 0;
  }
  return 0;
}

/**
 * Transform number (1) to money format "X ₽"
 * Version 1 1.0 2020-10-07; ID [hxhg] 201007113100
 * @param num (1) -- example 1000
 * @return {string|number} example '1 000 ₽'
 */
export const utilNumberAsMoneyRub = (num) => {
  if (num) {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(num)
  }
  return 0;
};

/**
 * Return first (2) symbols of string (1). If (1) is trimed that add '...' at end
 * Version 1 1.0 2020-09-30; ID [hxhg] 200930175800
 * @param st (1) -- example 'text100'
 * @param ct (2) -- example 2
 * @return {string|*} example 'te...'
 */
export const stdStrFirstSymbols = (st, ct) => {
  if (st) {
    const nx = ct < st.length ? '...' : '';
    return st.substring(0, ct) + nx;
  }
  return st;
}

export const utilErrNotifShow = (ctx, msgTitle, err) => {
  ctx.$notification.open({
    message: msgTitle,
    description: err.message,
    duration: 60,
    type: 'error'
  });
};
