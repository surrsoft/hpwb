"use strict";

/* jshint esversion: 8 */

/*

CONCEPTS:
-- [[tknc]] - type 'MongoClient' returning of function 'mongoClientGet()'

 */

const mongodb = require('mongodb');
const { MongoClient, ObjectId } = mongodb;
const util = require('util');

module.exports = {
  /**
   * Connect to Db (2) MongoDB by address (1). Return Promise<MongoClient> ([tknc])
   *
   * @param _stMongoUrl {String} (1) -- example 'mongodb://localhost:27017/'
   * @param _stDbName {String} (2) -- db name, example 'myNewDatabase'
   * @return {Promise<MongoClient>}
   */
  mongoClientGet: async function (_stMongoUrl, _stDbName) {
    return MongoClient.connect(
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
    return MongoClient.connect(
      _stMongoUrl,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
  },

  /**
   * Create MongoClient
   *
   * FOR REFERENCE: getting instance db maked by
   * <code> db = result-current-function.db(dbName) </code>
   *
   * @param _stMongoUrl {String} (1) -- example 'mongodb+srv://surradmin:${password}@clustersurr
   *   -ovoi0.azure.mongodb.net/${dbName}?retryWrites=true&w=majority'
   * @return {MongoClient}
   */
  mongoClientGet_C: function (_stMongoUrl) {
    return new MongoClient(
      _stMongoUrl,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
  },

  /**
   * Return info about all dbs
   *
   * @param _mongoClient {MongoClient} (1) --
   * @return {Promise<[Object]>} array of object,
   *   example [{ name: 'sample_airbnb', sizeOnDisk: 57544704, empty: false }, ...]
   */
  dbsInfoGet: async function (_mongoClient) {
    return new Promise((resolve) => {
      _mongoClient.connect((err) => {
        if (err) {
          throw new Error(err.message);
        }
        const db = _mongoClient.db('test');
        const adminDb = db.admin();
        adminDb.listDatabases((err, dbs) => {
          resolve(dbs.databases);
        });
        _mongoClient.close();
      });
    });
  },

  /**
   * Get db object
   *
   * @param _stMongoUrl {String} (1) -- example 'mongodb://localhost:27017' (can be with '/' on end)
   * @param _stDbName {String} (2) -- db name, example 'test'
   * @return {Promise<Db>}
   */
  dbGet: async function (_stMongoUrl, _stDbName) {
    const mongoClient = await this.mongoClientGet_B(_stMongoUrl);
    return mongoClient.db(_stDbName);
  },

  dbGetB: async function (_mongoClient, _stDbName) {
    return new Promise((resolve) => {
      _mongoClient.connect((err) => {
        if (err) {
          throw new Error(err.message);
        }
        resolve(_mongoClient.db(_stDbName));
        _mongoClient.close();
      });
    });
  }
};
