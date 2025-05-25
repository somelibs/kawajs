"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _construct2 = _interopRequireDefault(require("@babel/runtime/helpers/construct"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _includes2 = _interopRequireDefault(require("lodash/includes"));
var _pickBy2 = _interopRequireDefault(require("lodash/pickBy"));
var _resolve = _interopRequireDefault(require("./helpers/resolve"));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var EXCLUDE_STATIC = ['export', 'build'];
var Smart = /*#__PURE__*/function () {
  function Smart(options) {
    (0, _classCallCheck2["default"])(this, Smart);
    (0, _defineProperty2["default"])(this, "state", {});
    this.props = this._defineProps();
    this._defineDetaults(options);
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return this.initialize.apply(this, [options].concat(args));
  }
  (0, _createClass2["default"])(Smart, [{
    key: "initialize",
    value: function initialize() {
      return this;
    }
  }, {
    key: "setState",
    value: function setState() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      Object.assign(this.state, _resolve["default"].call.apply(_resolve["default"], [this, this.state].concat(args)));
      return this.state;
    }
  }, {
    key: "_defineProps",
    value: function _defineProps() {
      var instance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var prototype = instance || Object.getPrototypeOf(this);
      var parent = Object.getPrototypeOf(prototype);
      var statics = prototype.constructor;
      var props = (0, _pickBy2["default"])(statics, function (property, key) {
        return !(0, _includes2["default"])(EXCLUDE_STATIC, key);
      });
      var inheritedProps = parent instanceof Smart ? this._defineProps(parent) : {};
      return _objectSpread(_objectSpread({}, inheritedProps), props);
    }
  }, {
    key: "_defineDetaults",
    value: function _defineDetaults(options) {
      var defaults = _resolve["default"].call(this, this.props.defaults, options, this.props);
      Object.assign(this, defaults);
    }
  }, {
    key: "_call",
    value: function _call() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      this.setState.apply(this, args);
      return this.call ? _resolve["default"].call.apply(_resolve["default"], [this, this.call].concat(args)) : false;
    }
  }], [{
    key: "export",
    value: function _export() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      var instance = (0, _construct2["default"])(this, args);
      return function () {
        return instance._call.apply(instance, arguments);
      };
    }
  }, {
    key: "build",
    value: function build(options) {
      var _this = this;
      for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        args[_key5 - 1] = arguments[_key5];
      }
      return function (context) {
        return (0, _construct2["default"])(_this, [_objectSpread(_objectSpread({}, options), context)].concat(args));
      };
    }
  }]);
  return Smart;
}();
(0, _defineProperty2["default"])(Smart, "defaults", false);
var _default = Smart;
exports["default"] = _default;