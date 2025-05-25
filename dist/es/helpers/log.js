"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));
/* eslint-disable no-console */

var defaultMessage = '[Logger]';
function isDarkModeEnabled() {
  return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
}
function getStyle(level) {
  var darkMode = isDarkModeEnabled();
  if (level === 'error') {
    return darkMode ? 'color: #fd4146;' : 'color: #ff443a;';
  }
  if (level === 'warning') {
    return darkMode ? 'color: #fedc9e;' : 'color: #77592b;';
  }
  return darkMode ? 'color: white;' : 'color: black;';
}
function error() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultMessage;
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  if (!(0, _isEmpty2["default"])(args)) {
    var _console;
    var style = getStyle('error');
    console.groupCollapsed("%c".concat(message), style);
    (_console = console).error.apply(_console, args);
    console.groupEnd();
  } else {
    console.error(message);
  }
}
function warning() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultMessage;
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }
  if (!(0, _isEmpty2["default"])(args)) {
    var _console2;
    var style = getStyle('warning');
    console.groupCollapsed("%c".concat(message), style);
    (_console2 = console).warn.apply(_console2, args);
    console.groupEnd();
  } else {
    console.warn(message);
  }
}
function info() {
  var _console3;
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultMessage;
  for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }
  (_console3 = console).info.apply(_console3, [message].concat(args));
}
function debug() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultMessage;
  if (process.env.NODE_ENV !== 'production') {
    var _console4;
    for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4];
    }
    (_console4 = console).debug.apply(_console4, [message].concat(args));
  }
}
function group() {
  var _console5;
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultMessage;
  for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    args[_key5 - 1] = arguments[_key5];
  }
  (_console5 = console).groupCollapsed.apply(_console5, [message].concat(args));
}
function groupEnd() {
  console.groupEnd();
}
var _default = {
  error: error,
  warning: warning,
  info: info,
  debug: debug,
  group: group,
  groupEnd: groupEnd
};
exports["default"] = _default;