"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _reselect = require("reselect");
var _Smart2 = _interopRequireDefault(require("./Smart"));
var _Runtime3 = _interopRequireDefault(require("./instance/Runtime"));
var _select = _interopRequireDefault(require("./helpers/select"));
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var Selector = /*#__PURE__*/function (_Smart) {
  (0, _inherits2["default"])(Selector, _Smart);
  var _super = _createSuper(Selector);
  function Selector() {
    var _this;
    (0, _classCallCheck2["default"])(this, Selector);
    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(_args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "getState", function () {
      var _Runtime = (0, _Runtime3["default"])('store'),
        getState = _Runtime.getState;
      return getState();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "select", function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      var path = args.length > 1 ? args : args[0];
      var _Runtime2 = (0, _Runtime3["default"])('store'),
        getState = _Runtime2.getState;
      if (getState) {
        var state = getState();
        return (0, _select["default"])(state, path);
      }
      return false;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "createSelector", function () {
      return _reselect.createSelector.apply(void 0, arguments);
    });
    return _this;
  }
  return (0, _createClass2["default"])(Selector);
}(_Smart2["default"]);
var _default = Selector;
exports["default"] = _default;