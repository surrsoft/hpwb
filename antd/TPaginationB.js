/*
STATUS: in progress
 */

const _ = require('lodash');
const TUrl = require('../TUrl');

/**
 * {IN PROGRESS}
 *
 * @param oj {Object} (1) -- [xbgf]
 * @param pageName {String} (2) -- key of 'page' elem
 * @param onPageName {String} (3) -- key of 'onPage' elem
 * @param pageSizes {Array<String>} (4) -- [zdvu]
 */
module.exports.pageAndOnPageGet = function (oj, pageSizes = ['10', '20', '30'], pageName = 'page', onPageName = 'onPage') {
  const stSearch = _.get(oj, 'location.search');
  if (stSearch) {
    const q = TUrl.queryGetB(stSearch, [pageName, onPageName]);

    // TODO
  }
};
