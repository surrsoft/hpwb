
const request = require('request');

module.exports = {

  /**
   * Просто пример запроса. Делает GET запрос на GitHub на страницу с лицензией, результат запроса пишет в консоль.
   */
  requestExampleSend: function () {
    request('https://api.github.com/repos/atom/atom/license', function (error, response, body) {
      console.error('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
    });
  },

  /**
   * Делает GET запрос на URL (1). Результат не возвращает - пишет в консоль
   *
   * @param _stURL {String} (1) -- URL на который нужно сделать запрос
   */
  requestSend: function (_stURL) {
    request(_stURL, function (error, response, body) {
      console.error('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
    });
  }


};
