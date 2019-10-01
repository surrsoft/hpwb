"use strict";

/* jshint esversion: 8 */

/*

ПОНЯТИЯ:
-- [[tknc]] - тип MongoClient возвращаемый фукнцией mongoClientGet()

 */

const { MongoClient, ObjectId } = require('mongodb');


module.exports = {
  /**
   * Подсоединяется к БД (2) MongoDB по адресу (1). Возвращает Promise<MongoClient> ([tknc])
   *
   * @param _stMongoUrl {String} (1) -- например 'mongodb://localhost:27017/'
   * @param _stDbName {String} (2) -- имя БД, например 'myNewDatabase'
   * @return {Promise<void>} у значения тип MongoClient
   */
  mongoClientGet: async function (_stMongoUrl, _stDbName) {
    return await MongoClient.connect(
      _stMongoUrl + _stDbName,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
  }
};
