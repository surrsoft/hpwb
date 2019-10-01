"use strict";

/* jshint esversion: 8 */

const mongoose = require('mongoose');
const { Scnema, Model } = mongoose;

module.exports = {
  /**
   * Создание модели
   *
   * @param _stName
   * @param _ojSchema
   */
  modelCreate: function (_stName, _ojSchema) {
    return mongoose.model(_stName, _ojSchema);
  },

  /**
   * Добаление к схеме (1) метода (3) по имени (2)
   *
   * @param _ojSchema {Scnema} (1) --
   * @param _stMethodName {String} (2) --
   * @param _fn {Function} (3) --
   */
  schemaMethodAdd: function (_ojSchema, _stMethodName, _fn) {
    _ojSchema.methods[_stMethodName] = _fn;
  }
};
