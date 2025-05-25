"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = select;
var _get2 = _interopRequireDefault(require("lodash/get"));
var _isPlainObject2 = _interopRequireDefault(require("lodash/isPlainObject"));
var _find2 = _interopRequireDefault(require("lodash/find"));
var _isMatch2 = _interopRequireDefault(require("lodash/isMatch"));
var _filter2 = _interopRequireDefault(require("lodash/filter"));
var _flatten2 = _interopRequireDefault(require("lodash/flatten"));
var _isString2 = _interopRequireDefault(require("lodash/isString"));
var _each2 = _interopRequireDefault(require("lodash/each"));
var _first2 = _interopRequireDefault(require("lodash/first"));
var _isArray2 = _interopRequireDefault(require("lodash/isArray"));
var argsToArray = function argsToArray() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return (0, _isArray2["default"])((0, _first2["default"])(args)) ? (0, _first2["default"])(args) : args;
};
var parsePathArray = function parsePathArray(args) {
  var paths = argsToArray(args);
  var parsedPath = [];
  (0, _each2["default"])(paths, function (path) {
    parsedPath.push((0, _isString2["default"])(path) ? path.split('.') : path);
  });
  return (0, _flatten2["default"])(parsedPath);
};
function match(source, selector) {
  return (0, _filter2["default"])(source, function (item) {
    return (0, _isMatch2["default"])(item, selector);
  });
}
function select(source) {
  var value = source;
  var currentPath = [];
  var primaryKey = 'id';
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  var pathArray = parsePathArray(args);
  (0, _each2["default"])(pathArray, function (selector) {
    currentPath.push(selector);
    if ((0, _isArray2["default"])(value)) {
      if ((0, _isString2["default"])(selector)) {
        value = (0, _find2["default"])(value, function (item) {
          return item[primaryKey] === selector;
        });
      } else if ((0, _isPlainObject2["default"])(selector)) {
        value = match(value, selector);
      }
    } else {
      value = value ? (0, _get2["default"])(value, selector) : undefined;
    }
  });
  return value;
}