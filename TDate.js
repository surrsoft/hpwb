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
  },

  /**
   * Return difference date (1) and (2) in milliseconds
   *
   * Return 0 if (1) or (2) is not type Date
   *
   * @param dtStart {Date}
   * @param dtEnd {Date}
   * @return {number}
   */
  duration(dtStart, dtEnd) {
    if (dtStart instanceof Date && dtEnd instanceof Date) {
      return dtEnd - dtStart;
    }
    return 0;
  },

};



