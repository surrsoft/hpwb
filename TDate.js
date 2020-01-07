"use strict";

/* jshint esversion: 8 */

/*
DESCRIPTION: functions for work with arrays
 */

module.exports = {


  addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

};



