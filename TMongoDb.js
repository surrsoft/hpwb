"use strict";

/* jshint esversion: 8 */

const { MongoClient, ObjectId } = require('mongodb');


module.exports = {
  /**
   *
   * @param _stMongoUrl {String} (1) -- например 'mongodb://localhost:27017/'
   * @param _stDbName {String} (2) -- имя БД, например 'myNewDatabase'
   * @return {Promise<void>} в значении MongoClient
   */
  mongoClientGet: async function (_stMongoUrl, _stDbName) {
    return await MongoClient.connect(
      _stMongoUrl + _stDbName,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
  }
};
