/*
DESCRIPTION: module for working with URL
CONCEPTS:
  -- _query - example is part '?hhh=1&kkk=2&page=10' of
  URL 'https://console.cognitiveops.me/worksets?hhh=1&kkk=2&page=10#dddd'
  -- [[srkz]] - is URL or _query
 */

const Url = require('url');
const lodash = require('lodash');

module.exports = {
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
   * Extract from [srkz] (1) _query elems as object. If _query elems is not exist that returns
   * empty object '{}'
   *
   * @param _stUrl (1) -- [srkz]
   * @return {*} example {hhh: 1, kkk: 2, page: 10}
   */
  queryGet(_stUrl) {
    return Url.parse(_stUrl, true).query;
  },
  /**
   * Extract from [srkz] (1) _query elems which are have key exists in (2)
   *
   * @param _stUrl {String} (1) -- [srkz], example '?page=1&onPage=10'
   * @param _arrStKeys {Array<String>} (2) -- example ['onPage']
   * @return {Object|{}} example {onPage: 10}
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
  /**
   * Extract data from (1) representing it per (2)
   *
   * [[ekdo]] - is object in form {name:, newName:, fnTransform:, default:}, where:
   *   - 'name' - (mandatory, {String}) name which need get from _query of (1);
   *   - 'newName' - (optional, {String}) new name for 'name' in result object
   *   - 'fnTransform' - (optional, Function) function for transform value by 'name' from (1)
   *   - 'default' - (optional, *) value if 'name' not exist in (1) or value from (1) is invalid
   *
   * @param _stUrl (1) -- [srkz], example '?page=1&some=10'
   * @param _arrOjEkdo (2) -- list of [ekdo],
   *   example [{name: page, newName: skip}, {name: 'onPage', default: 5}]
   * @return {{}|*} example {skip: 1, onPage: 5}
   */
  queryGetC(_stUrl, _arrOjEkdo) {
    const arrOjQueryElems = this.queryGet(_stUrl);
    const arrStEkdoNames = _arrOjEkdo.map(ekdo => ekdo.name);
    const ojRet = {};
    // ---
    const b51 = !lodash.isEmpty(arrOjQueryElems);
    const b52 = !lodash.isEmpty(arrStEkdoNames);
    if (b51 && b52) {
      const arrStQueryKeys = Object.keys(arrOjQueryElems);
      arrStQueryKeys.forEach((stQueryKey) => {
        const stQueryElemValue = arrOjQueryElems[stQueryKey];
        const b53 = !(lodash.isEmpty(stQueryElemValue));
        const b54 = !(arrStEkdoNames.indexOf(stQueryKey) === -1);
        if (b53 && b54) {
          const ojEkdo = lodash.find(_arrOjEkdo, ekdo => ekdo.name === stQueryKey);
          const stNewNameValue = lodash.get(ojEkdo, 'newName');
          let val;
          const fnTransform = lodash.get(ojEkdo, 'fnTransform');
          if (lodash.isFunction(fnTransform)) {
            val = fnTransform(arrOjQueryElems[stQueryKey]);
          } else {
            val = arrOjQueryElems[stQueryKey];
          }
          // ---
          if (!lodash.isEmpty(stNewNameValue)) {
            ojRet[ojEkdo.newName] = val;
          } else {
            ojRet[stQueryKey] = val;
          }
        }
      });
    }
    // --- default
    _arrOjEkdo.forEach((ojEkdo) => {
      if (ojEkdo.hasOwnProperty('default')) {
        const stNewName = lodash.get(ojEkdo, 'newName');
        let stName = ojEkdo.name;
        if (!lodash.isEmpty(stNewName)) {
          stName = ojEkdo.newName;
        }
        if (!ojRet.hasOwnProperty(stName)) {
          ojRet[stName] = ojEkdo.default;
        }
      }
    });
    // ---
    return ojRet;
  },
};
