"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _extend2 = _interopRequireDefault(require("lodash/extend"));
var _remove2 = _interopRequireDefault(require("lodash/remove"));
var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));
var _find2 = _interopRequireDefault(require("lodash/find"));
var _uuid = require("uuid");
var _Smart2 = _interopRequireDefault(require("../Smart"));
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var CallThrottler = /*#__PURE__*/function (_Smart) {
  (0, _inherits2["default"])(CallThrottler, _Smart);
  var _super = _createSuper(CallThrottler);
  function CallThrottler() {
    var _this;
    (0, _classCallCheck2["default"])(this, CallThrottler);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "stack", []);
    return _this;
  }
  (0, _createClass2["default"])(CallThrottler, [{
    key: "match",
    value: function match(call) {
      var payload = JSON.stringify(call);
      var match = (0, _find2["default"])(this.stack, function (item) {
        return (0, _isEqual2["default"])(item.payload, payload);
      });
      if (match && call.method === 'GET') {
        match.instances += 1;
        return match;
      }
      return false;
    }
  }, {
    key: "push",
    value: function push(request, call) {
      var resolver;
      var promise = new Promise(function (resolveCall) {
        resolver = resolveCall;
      });
      var id = (0, _uuid.v4)();
      var payload = JSON.stringify(call);
      var match = (0, _find2["default"])(this.stack, function (item) {
        return (0, _isEqual2["default"])(item.payload, payload);
      });
      if (match && call.method === 'GET') {
        return match.id;
      }
      var instances = 1;
      this.stack.push({
        id: id,
        promise: promise,
        request: request,
        resolver: resolver,
        payload: payload,
        instances: instances
      });
      return id;
    }
  }, {
    key: "clear",
    value: function clear(id) {
      var match = (0, _find2["default"])(this.stack, function (item) {
        return item.id === id;
      });
      if (match) {
        match.resolver(true);
        if (match.instances === 1) {
          (0, _remove2["default"])(this.stack, function (item) {
            return item.id === id;
          });
        } else {
          match.instances -= 1;
        }
      }
    }
  }, {
    key: "set",
    value: function set(id, data) {
      var match = (0, _find2["default"])(this.stack, function (item) {
        return item.id === id;
      });
      if (match) {
        (0, _extend2["default"])(match, data);
      }
    }
  }, {
    key: "find",
    value: function find(id) {
      var match = (0, _find2["default"])(this.stack, function (item) {
        return item.id === id;
      });
      return match;
    }
  }]);
  return CallThrottler;
}(_Smart2["default"]);
var _default = CallThrottler;
exports["default"] = _default;