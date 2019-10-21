"use strict";

/* jshint esversion: 8 */

/*

CONCEPTS:
-- [[tknc]] - type 'MongoClient' returning of function 'mongoClientGet()'

 */

const { MongoClient, ObjectId } = require('mongodb');


module.exports = {
  /**
   * Connect to Db (2) MongoDB by adress (1). Return Promise<MongoClient> ([tknc])
   *
   * @param _stMongoUrl {String} (1) -- example 'mongodb://localhost:27017/'
   * @param _stDbName {String} (2) -- db name, example 'myNewDatabase'
   * @return {Promise<MongoClient>}
   */
  mongoClientGet: async function (_stMongoUrl, _stDbName) {
    return await MongoClient.connect(
      _stMongoUrl + _stDbName,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
  },

  /**
   * Differ from A that in (1) not specified db name.
   * FOR REFERENCE: getting instance db maked by
   * <code> db = result-current-function.db(dbName) </code>
   *
   * @param _stMongoUrl {String} (1) -- example 'mongodb://localhost:27017' (can be with '/' on end)
   * @return {Promise<MongoClient>}
   */
  mongoClientGet_B: async function (_stMongoUrl) {
    return await MongoClient.connect(
      _stMongoUrl,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
  },

  /**
   * Get db object
   *
   * @param _stMongoUrl {String} (1) -- example 'mongodb://localhost:27017' (can be with '/' on end)
   * @param _stDbName {String} (2) -- db name, example 'test'
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
