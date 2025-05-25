"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _isArray2 = _interopRequireDefault(require("lodash/isArray"));
function _default(_x) {
  return _ref.apply(this, arguments);
}
function _ref() {
  _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(object) {
    var async,
      resolvedObject,
      keys,
      index,
      key,
      resolvedArray,
      _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          async = _args.length > 1 && _args[1] !== undefined ? _args[1] : true;
          resolvedObject = (0, _isArray2["default"])(object) ? [] : {};
          keys = Object.keys(object);
          if (!(async === false)) {
            _context.next = 15;
            break;
          }
          _context.t0 = _regenerator["default"].keys(keys);
        case 5:
          if ((_context.t1 = _context.t0()).done) {
            _context.next = 13;
            break;
          }
          index = _context.t1.value;
          key = keys[index]; // eslint-disable-next-line no-await-in-loop
          _context.next = 10;
          return object[key];
        case 10:
          resolvedObject[key] = _context.sent;
          _context.next = 5;
          break;
        case 13:
          _context.next = 19;
          break;
        case 15:
          _context.next = 17;
          return Promise.all(Object.values(object));
        case 17:
          resolvedArray = _context.sent;
          keys.forEach(function (key, index) {
            resolvedObject[key] = resolvedArray[index];
          });
        case 19:
          return _context.abrupt("return", resolvedObject);
        case 20:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _ref.apply(this, arguments);
}