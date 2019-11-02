"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _calculateAge(birthday) {
  // birthday is a date
  var ageDifMs = Date.now() - birthday.getTime();
  /*?*/

  var ageDate = new Date(ageDifMs); // miliseconds from epoch

  return Math.abs(ageDate.getUTCFullYear() - 1971);
}

var _default = _calculateAge;
exports["default"] = _default;