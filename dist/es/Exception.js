"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _Smart2 = _interopRequireDefault(require("./Smart"));
var _log = _interopRequireDefault(require("./helpers/log"));
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var Exception = /*#__PURE__*/function (_Smart) {
  (0, _inherits2["default"])(Exception, _Smart);
  var _super = _createSuper(Exception);
  function Exception() {
    (0, _classCallCheck2["default"])(this, Exception);
    return _super.apply(this, arguments);
  }
  (0, _createClass2["default"])(Exception, [{
    key: "_call",
    value: function _call(exception) {
      _log["default"].error(exception.message);
      return exception;
    }
  }]);
  return Exception;
}(_Smart2["default"]);
var _default = Exception["export"]();
exports["default"] = _default;