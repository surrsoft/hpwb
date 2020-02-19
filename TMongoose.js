"use strict";

/* jshint esversion: 8 */

const mongoose = require('mongoose');
const { Schema, Model } = mongoose;

module.exports = {
  /**
   * Create model
   *
   * @param _stName
   * @param _ojSchema {Schema}
   */
  modelCreate: function (_stName, _ojSchema) {
    return mongoose.model(_stName, _ojSchema);
  },

  /**
   * Adding to scheme (1) method (3) with name (2)
   *
   * @param _ojSchema {Schema} (1) --
   * @param _stMethodName {String} (2) --
   * @param _fn {Function} (3) --
   */
  schemaMethodAdd: function (_ojSchema, _stMethodName, _fn) {
    _ojSchema.methods[_stMethodName] = _fn;
  },

  isAsObjectId(id){
    return new mongoose.Types.ObjectId(id)
  },
};
