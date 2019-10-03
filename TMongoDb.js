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
   * @return {Promise<MongoClient>} у значения тип MongoClient
   */
  mongoClientGet: async function (_stMongoUrl, _stDbName) {
    return await MongoClient.connect(
      _stMongoUrl + _stDbName,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
  },

  /**
   * Отличается от А тем что в (1) не указывается имя БД.
   * ДЛЯ СПРАВКИ: получение экземпляра БД делается так
   * <code> db = result-current-function.db(dbName) </code>
   *
   * @param _stMongoUrl {String} (1) -- например 'mongodb://localhost:27017' (можно с '/' на конце)
   * @return {Promise<MongoClient>}
   */
  mongoClientGet_B: async function (_stMongoUrl) {
    return await MongoClient.connect(
      _stMongoUrl,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
  },

  /**
   * Получение объекта БД
   *
   * @param _stMongoUrl {String} (1) -- например 'mongodb://localhost:27017' (можно с '/' на конце)
   * @param _stDbName {String} (2) -- имя БД, например 'test'
   * @return {Promise<Db>}
   */
  dbGet: async function (_stMongoUrl, _stDbName){
    const mongoClient = await this.mongoClientGet_B(_stMongoUrl);
    return mongoClient.db(_stDbName);
  },

  /**
   *
   * @param _db
   */
  dbExists: function (_db) {

  }

};
