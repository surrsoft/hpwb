/*
DESCRIPTION: module for working with URL
CONCEPTS:
  -- _query - example is part 'hhh=1&kkk=2&page=10' of
  URL 'https://console.cognitiveops.me/worksets?hhh=1&kkk=2&page=10#dddd'
 */

import Url from 'url';
import lodash from 'lodash';

export default {
  /**
   * Parse URL (1)
   *
   * @param _stUrl (1) -- URL, example 'https://console.cognitiveops.me/worksets?hhh=1&kkk=2&page=10#dddd'
   * @return {*}
   */
  parse(_stUrl) {
    Url.parse(_stUrl, true);
  },
  /**
   * Extract from URL (1) _query elems as object. If _query elems is not exist that retruns
   * empty object '{}'
   *
   * @param _stUrl (1) -- URL, example 'https://console.cognitiveops.me/worksets?hhh=1&kkk=2&page=10#dddd'
   * @return {*} example {hhh: 1, kkk: 2, page: 10}
   */
  queryGet(_stUrl) {
    return Url.parse(_stUrl, true).query;
  },
  /**
   * Extract from URL (1) _query elems which are have key exists in (2)
   *
   * @param _stUrl {String} (1) -- URL, example 'https://console.cognitiveops.me/worksets?hhh=1&kkk=2&page=10#dddd'
   * @param _arrStKeys {Array<String>} (2) -- example ['page']
   * @return {Object|{}} example {page: 10}
   */
  queryGetB(_stUrl, _arrStKeys) {
    const q = this.queryGet(_stUrl);
    // ---
    if (!lodash.isEmpty(q)) {
      const arrStKeys = Object.keys(q);
      arrStKeys.forEach((key) => {
        if (lodash.isEmpty(q[key]) || _arrStKeys.indexOf(key) === -1) {
          delete q[key];
        }
      });
      return q;
    }
    return {};
  },
};
