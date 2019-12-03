const { trim } = require('lodash');
const queryString = require('querystring');

/*
CONCEPTS:
  -- [[xbgf]] - object in form { location: { search } } (where 'search' is _search)
  -- [[zdvu]] - (type Array<String>) set of page sizes, example ['10', '20', '50']
  -- _search - string '' or '?page=2' or '?onPage=20' or '?page=2&onPage=20'
  (where 2, 20 it is number for example). Transform to _skip and _take with
  function 'skipAndTakeGet'
  -- _skip - count elems for skip
  -- _take - count elems for show on screen
 */

/**
 * Pagination. Return 'skip' and 'take' for get data from DB
 *
 * ID: [[191129125100]]
 *
 * @param _stPage (1) -- number of page
 * @param _stOnPage (2) -- count elems on page
 * @param _arrStPageSizes (3) -- [zdvu]; example ['10', '20', '30']
 * @return {{take: *, skip: *}}
 */
function fnSkipAndTakeGet(_stPage, _stOnPage, _arrStPageSizes) {
  if (_arrStPageSizes.indexOf(_stOnPage) === -1) {
    throw new Error(`ERROR: _stOnPage not present in _arrStPageSizes; _stOnPage [${_stOnPage}]`);
  }
  // ---
  const iOnPage = parseInt(_stOnPage, 10);
  const iTake = !Number.isNaN(iOnPage) && _arrStPageSizes.indexOf(_stOnPage) > -1
    ? iOnPage : undefined;
  // ---
  const iPage = parseInt(_stPage, 10);
  const iCurrentPage = !Number.isNaN(iPage) && iPage > 1 ? iPage : 1;
  const iSkip = iTake ? (iCurrentPage - 1) * iTake : (iCurrentPage - 1) * 10;
  // ---
  return { skip: iSkip, take: iTake };
}

/**
 * Return _skip and _take for use in requests to DB
 *
 * @param (1) -- [xbgf]
 * @param _arrStPageSizes {Array<String>} (2) -- [zdvu]; example ['10', '20', '30']
 */
module.exports.skipAndTakeGet = ({ location: { search } }, _arrStPageSizes) => {
  const query = queryString.parse(trim(search, '?'));
  let { page, onPage } = query;
  if (!onPage) {
    onPage = _arrStPageSizes[0];
  }
  return fnSkipAndTakeGet(page, onPage, _arrStPageSizes);
};

/**
 * Return object ([[pwda]]) for use in attribute 'pagination' of 'Table' of 'antd' library
 *
 * @param _ojLocation (1) -- [xbgf]
 * @param _arrStPageSizes (2) -- [zdvu]; gradation of page sizes, example ['10', '20', '50']
 * @param _iCountAll (3) -- count of all entries
 * @return {Object} [pwda]
 */
module.exports.paginationOjCreate = (_ojLocation, _arrStPageSizes, _iCountAll) => {
  // --- get 'skip' and 'take' from _ojLocation
  const { skip: iSkip, take: iTake } = module.exports.skipAndTakeGet(_ojLocation, _arrStPageSizes);
  // ---
  const iCurrentTake = iTake || 10;
  const iCurrentSkip = (iSkip / iCurrentTake + 1) || 1;
  return {
    // number of current page
    current: iCurrentSkip,
    // number of elems on current page
    pageSize: iCurrentTake,
    // total count of elems
    total: _iCountAll,
    // gradation of page sizes, example ['10', '20', '50'] (see [zdvu])
    pageSizeOptions: _arrStPageSizes,
    showSizeChanger: true,
    position: 'bottom',
  };
};

/**
 * @param _ctx {Object} (1) -- referenct to this-with-props of JSX-page
 * @param _pagination {Object} (2) -- [pwda]
 * @param _arrStPageSizes {Array<String>} (3) --
 * @param _stPageRoute {String} (4) -- subpath, example '/worksets'
 */
module.exports.handlePagination = (_ctx, _pagination, _arrStPageSizes, _stPageRoute) => {
  const { history, location } = _ctx.props;
  const query = module.exports.skipAndTakeGet({ location }, _arrStPageSizes);
  const { take } = query;
  const params = {
    onPage: _pagination.pageSize === 10 ? undefined : _pagination.pageSize,
    page: (_pagination.pageSize !== take && take !== undefined) || _pagination.current === 1
      ? undefined : _pagination.current,
  };
  const params1 = {
    onPage: query.take,
    page: (query.skip !== 0) ? query.skip : undefined,
    ...(params),
  };
  // --- delete undefined fields
  const keys = Object.keys(params1);
  keys.forEach((key) => {
    if (params1[key] === undefined || params1[key] === '') {
      delete params1[key];
    }
  });
  // --- route
  history.push({
    pathname: _stPageRoute,
    search: queryString.stringify(params1),
  });
};
