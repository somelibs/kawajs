"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _last2 = _interopRequireDefault(require("lodash/last"));
var _each2 = _interopRequireDefault(require("lodash/each"));
var _extend2 = _interopRequireDefault(require("lodash/extend"));
var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));
var _isPlainObject2 = _interopRequireDefault(require("lodash/isPlainObject"));
var _toUpper2 = _interopRequireDefault(require("lodash/toUpper"));
var _snakeCase2 = _interopRequireDefault(require("lodash/snakeCase"));
var _uuid = require("uuid");
var _Smart2 = _interopRequireDefault(require("./Smart"));
var _Runtime2 = _interopRequireDefault(require("./instance/Runtime"));
var _resolve = _interopRequireDefault(require("./helpers/resolve"));
var _select = _interopRequireDefault(require("./helpers/select"));
var _log = _interopRequireDefault(require("./helpers/log"));
var _excluded = ["success", "error", "log", "origin", "tracked", "safeguard", "cache"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var Action = /*#__PURE__*/function (_Smart) {
  (0, _inherits2["default"])(Action, _Smart);
  var _super = _createSuper(Action);
  function Action(_ref) {
    var _this;
    var _success = _ref.success,
      _error = _ref.error,
      log = _ref.log,
      origin = _ref.origin,
      tracked = _ref.tracked,
      safeguard = _ref.safeguard,
      _cache = _ref.cache,
      _context = (0, _objectWithoutProperties2["default"])(_ref, _excluded);
    (0, _classCallCheck2["default"])(this, Action);
    _this = _super.call(this, _context);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "delegatedActions", []);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "pendingPayload", function (data) {});
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "successPayload", function (data) {
      return function (success) {
        return success;
      };
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "errorPayload", function (data) {
      return function (error) {
        return error;
      };
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "payload", function (data) {
      return function (payload) {
        return payload;
      };
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "pendingNotice", function (data) {
      return false;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "successNotice", function (data) {
      return function (success) {
        return false;
      };
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "errorNotice", function (data) {
      return function (error) {
        return false;
      };
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "notice", function (data) {
      return function (payload) {
        return false;
      };
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "setStatus", function (status) {
      _this.status = status;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "export", function (action) {
      return action;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "aborted", false);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_export", /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(payload) {
        var _this2, _this3, _this4, _this5;
        var _len,
          data,
          _key,
          parsedPayload,
          _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              for (_len = _args.length, data = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                data[_key - 1] = _args[_key];
              }
              _context2.next = 3;
              return (_this2 = _this)._parsePayload.apply(_this2, [payload].concat(data));
            case 3:
              parsedPayload = _context2.sent;
              _context2.t0 = (_this3 = _this)["export"];
              _context2.t1 = _this3;
              _context2.t2 = _this.id;
              _context2.t3 = _this.log;
              _context2.t4 = _this.origin;
              _context2.t5 = _this.status;
              _context2.t6 = _this._tracked;
              _context2.t7 = _this._safeguard;
              _context2.t8 = _this.timestamp;
              _context2.t9 = _this.props.reducer || false;
              _context2.t10 = _this.props.type || _this._getType();
              _context2.next = 17;
              return (_this4 = _this)._parseNotice.apply(_this4, [payload].concat(data));
            case 17:
              _context2.t11 = _context2.sent;
              if (_context2.t11) {
                _context2.next = 20;
                break;
              }
              _context2.t11 = false;
            case 20:
              _context2.t12 = _context2.t11;
              _context2.next = 23;
              return (_this5 = _this)._parseContext.apply(_this5, [payload].concat(data));
            case 23:
              _context2.t13 = _context2.sent;
              if (_context2.t13) {
                _context2.next = 26;
                break;
              }
              _context2.t13 = {};
            case 26:
              _context2.t14 = _context2.t13;
              _context2.t15 = _this.constructor.name;
              _context2.t16 = parsedPayload;
              _context2.t17 = {
                id: _context2.t2,
                log: _context2.t3,
                origin: _context2.t4,
                status: _context2.t5,
                tracked: _context2.t6,
                safeguard: _context2.t7,
                timestamp: _context2.t8,
                reducer: _context2.t9,
                type: _context2.t10,
                notice: _context2.t12,
                context: _context2.t14,
                "class": _context2.t15,
                payload: _context2.t16
              };
              _context2.t18 = [_context2.t17].concat(data);
              return _context2.abrupt("return", _context2.t0.apply.call(_context2.t0, _context2.t1, _context2.t18));
            case 32:
            case "end":
              return _context2.stop();
          }
        }, _callee);
      }));
      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_getType", function () {
      var snakeCase = (0, _snakeCase2["default"])(_this.constructor.name);
      return "~".concat((0, _toUpper2["default"])(snakeCase));
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_resolve", /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(callback, payload) {
        var _len2,
          data,
          _key2,
          shallow,
          _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              for (_len2 = _args2.length, data = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
                data[_key2 - 2] = _args2[_key2];
              }
              _context3.next = 3;
              return _resolve["default"].call.apply(_resolve["default"], [(0, _assertThisInitialized2["default"])(_this), callback].concat(data));
            case 3:
              shallow = _context3.sent;
              return _context3.abrupt("return", _resolve["default"].call((0, _assertThisInitialized2["default"])(_this), shallow, payload));
            case 5:
            case "end":
              return _context3.stop();
          }
        }, _callee2);
      }));
      return function (_x2, _x3) {
        return _ref3.apply(this, arguments);
      };
    }());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_getCachedPayload", function () {
      if (_this._cache) {
        for (var _len3 = arguments.length, data = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          data[_key3] = arguments[_key3];
        }
        var cache = _resolve["default"].call.apply(_resolve["default"], [(0, _assertThisInitialized2["default"])(_this), _this.cache].concat(data));
        if (cache && !(0, _isEmpty2["default"])(cache)) {
          _this.setStatus('success');
          return cache;
        }
      }
      return false;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_defineSetContext", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var _len4,
        data,
        _key4,
        _args4 = arguments;
      return _regenerator["default"].wrap(function _callee4$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            for (_len4 = _args4.length, data = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
              data[_key4] = _args4[_key4];
            }
            _this.setContext = /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
              var _this6;
              var context,
                action,
                _args3 = arguments;
              return _regenerator["default"].wrap(function _callee3$(_context4) {
                while (1) switch (_context4.prev = _context4.next) {
                  case 0:
                    context = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
                    (0, _extend2["default"])(_this._context, context);
                    _context4.next = 4;
                    return (_this6 = _this)._export.apply(_this6, [{}].concat(data));
                  case 4:
                    action = _context4.sent;
                    return _context4.abrupt("return", _this._dispatch(action));
                  case 6:
                  case "end":
                    return _context4.stop();
                }
              }, _callee3);
            }));
          case 2:
          case "end":
            return _context5.stop();
        }
      }, _callee4);
    })));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_defineDispatchSuccess", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var _len5,
        data,
        _key5,
        _args6 = arguments;
      return _regenerator["default"].wrap(function _callee6$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            for (_len5 = _args6.length, data = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
              data[_key5] = _args6[_key5];
            }
            _this.dispatchSuccess = /*#__PURE__*/function () {
              var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(payload) {
                var _this7;
                var action;
                return _regenerator["default"].wrap(function _callee5$(_context6) {
                  while (1) switch (_context6.prev = _context6.next) {
                    case 0:
                      _this.setStatus('success');
                      _context6.next = 3;
                      return (_this7 = _this)._export.apply(_this7, [payload].concat(data));
                    case 3:
                      action = _context6.sent;
                      return _context6.abrupt("return", _this._dispatch(action));
                    case 5:
                    case "end":
                      return _context6.stop();
                  }
                }, _callee5);
              }));
              return function (_x4) {
                return _ref7.apply(this, arguments);
              };
            }();
          case 2:
          case "end":
            return _context7.stop();
        }
      }, _callee6);
    })));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_assertPromise", function (callback) {
      return function () {
        for (var _len6 = arguments.length, options = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
          options[_key6] = arguments[_key6];
        }
        if (!_this.aborted || _this._safeguard) return _resolve["default"].call.apply(_resolve["default"], [(0, _assertThisInitialized2["default"])(_this), callback].concat(options));
        return false;
      };
    });
    _this.id = (0, _uuid.v4)();
    _this.onError = _error;
    _this.onSuccess = _success;
    _this.log = log || true;
    _this.origin = origin || false;
    _this._context = _context;
    _this._tracked = tracked || _this.props.tracked;
    _this._safeguard = safeguard || _this.props.safeguard;
    _this._cache = _this.props.cache || !!_cache;
    return _this;
  }
  (0, _createClass2["default"])(Action, [{
    key: "_parseContext",
    value: function () {
      var _parseContext2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
        var payload,
          _len7,
          data,
          _key7,
          parsedContext,
          _args7 = arguments;
        return _regenerator["default"].wrap(function _callee7$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              payload = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : {};
              for (_len7 = _args7.length, data = new Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
                data[_key7 - 1] = _args7[_key7];
              }
              _context8.next = 4;
              return this._resolve.apply(this, [this.context, payload].concat(data));
            case 4:
              _context8.t0 = _context8.sent;
              if (_context8.t0) {
                _context8.next = 7;
                break;
              }
              _context8.t0 = {};
            case 7:
              parsedContext = _context8.t0;
              return _context8.abrupt("return", (0, _isPlainObject2["default"])(this._context) ? _objectSpread(_objectSpread({}, parsedContext), this._context) : parsedContext);
            case 9:
            case "end":
              return _context8.stop();
          }
        }, _callee7, this);
      }));
      function _parseContext() {
        return _parseContext2.apply(this, arguments);
      }
      return _parseContext;
    }()
  }, {
    key: "_parsePayload",
    value: function () {
      var _parsePayload2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(payload) {
        var _len8,
          data,
          _key8,
          _args8 = arguments;
        return _regenerator["default"].wrap(function _callee8$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              for (_len8 = _args8.length, data = new Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
                data[_key8 - 1] = _args8[_key8];
              }
              return _context9.abrupt("return", this._resolve.apply(this, [this.payload, payload].concat(data)) || false);
            case 2:
            case "end":
              return _context9.stop();
          }
        }, _callee8, this);
      }));
      function _parsePayload(_x5) {
        return _parsePayload2.apply(this, arguments);
      }
      return _parsePayload;
    }()
  }, {
    key: "_parseNotice",
    value: function () {
      var _parseNotice2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
        var payload,
          notice,
          _len9,
          data,
          _key9,
          finalNotice,
          defaultMessage,
          _args9 = arguments;
        return _regenerator["default"].wrap(function _callee9$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              payload = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : {};
              for (_len9 = _args9.length, data = new Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
                data[_key9 - 1] = _args9[_key9];
              }
              if (!(this.status === 'pending')) {
                _context10.next = 8;
                break;
              }
              _context10.next = 5;
              return this._resolve.apply(this, [this.pendingNotice, payload].concat(data));
            case 5:
              notice = _context10.sent;
              _context10.next = 18;
              break;
            case 8:
              if (!(this.status === 'error')) {
                _context10.next = 14;
                break;
              }
              _context10.next = 11;
              return this._resolve.apply(this, [this.errorNotice, payload].concat(data));
            case 11:
              notice = _context10.sent;
              _context10.next = 18;
              break;
            case 14:
              if (!(this.status === 'success')) {
                _context10.next = 18;
                break;
              }
              _context10.next = 17;
              return this._resolve.apply(this, [this.successNotice, payload].concat(data));
            case 17:
              notice = _context10.sent;
            case 18:
              _context10.next = 20;
              return this._resolve.apply(this, [this.notice, notice].concat(data));
            case 20:
              finalNotice = _context10.sent;
              defaultMessage = this.status === 'error' ? 'An error has occured.' : String();
              return _context10.abrupt("return", !notice && !finalNotice ? false : _objectSpread(_objectSpread({
                message: payload.message || defaultMessage
              }, notice), finalNotice));
            case 23:
            case "end":
              return _context10.stop();
          }
        }, _callee9, this);
      }));
      function _parseNotice() {
        return _parseNotice2.apply(this, arguments);
      }
      return _parseNotice;
    }()
  }, {
    key: "run",
    value: function run() {
      var _this8 = this;
      for (var _len10 = arguments.length, data = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        data[_key10] = arguments[_key10];
      }
      this._setSafeguard();
      this.timestamp = Date.now();
      return function (dispatch, getState) {
        _this8._getState = getState;
        _this8._dispatch = dispatch;
        _this8._defineGetState();
        _this8._defineSetContext.apply(_this8, data);
        _this8._defineDispatchSuccess.apply(_this8, data);
        new Promise( /*#__PURE__*/function () {
          var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(success) {
            var cache, payload, action;
            return _regenerator["default"].wrap(function _callee10$(_context11) {
              while (1) switch (_context11.prev = _context11.next) {
                case 0:
                  _context11.prev = 0;
                  _this8._bindActionsCreators.apply(_this8, data);
                  _context11.next = 4;
                  return _this8._bindResources.apply(_this8, data);
                case 4:
                  _context11.next = 6;
                  return _this8._dispatchPending.apply(_this8, data);
                case 6:
                  cache = _this8._getCachedPayload.apply(_this8, data);
                  _context11.t0 = cache;
                  if (_context11.t0) {
                    _context11.next = 12;
                    break;
                  }
                  _context11.next = 11;
                  return _this8._processPayload.apply(_this8, data);
                case 11:
                  _context11.t0 = _context11.sent;
                case 12:
                  payload = _context11.t0;
                  _context11.next = 15;
                  return _this8._export.apply(_this8, [payload].concat(data));
                case 15:
                  action = _context11.sent;
                  _context11.next = 18;
                  return _this8._assertPromise(_this8._beforeDispatch).apply(void 0, [payload].concat(data));
                case 18:
                  _context11.next = 20;
                  return _this8._assertPromise(dispatch)(action);
                case 20:
                  if (!(_this8.status === 'success')) {
                    _context11.next = 25;
                    break;
                  }
                  _context11.next = 23;
                  return _this8._assertPromise(_this8.onSuccess).apply(void 0, [payload].concat(data));
                case 23:
                  _context11.next = 27;
                  break;
                case 25:
                  _context11.next = 27;
                  return _this8._assertPromise(_this8.onError).apply(void 0, [payload].concat(data));
                case 27:
                  _context11.next = 29;
                  return _this8._assertPromise(_this8._afterDispatch).apply(void 0, [payload].concat(data));
                case 29:
                  _this8._removeSafeguard();
                  success();
                  _context11.next = 39;
                  break;
                case 33:
                  _context11.prev = 33;
                  _context11.t1 = _context11["catch"](0);
                  _log["default"].error(_context11.t1);
                  _this8.setStatus('error');
                  _this8._removeSafeguard();
                  return _context11.abrupt("return", _context11.t1);
                case 39:
                case "end":
                  return _context11.stop();
              }
            }, _callee10, null, [[0, 33]]);
          }));
          return function (_x6) {
            return _ref8.apply(this, arguments);
          };
        }());
        return _this8.id;
      };
    }
  }, {
    key: "_defineGetState",
    value: function _defineGetState() {
      var _this9 = this;
      this.getState = function () {
        for (var _len11 = arguments.length, args = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
          args[_key11] = arguments[_key11];
        }
        var path = args.length > 1 ? args : args[0];
        var state = _this9._getState();
        return (0, _select["default"])(state, path);
      };
    }
  }, {
    key: "_dispatchPending",
    value: function () {
      var _dispatchPending2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
        var _len12,
          data,
          _key12,
          pendingPayload,
          action,
          _args11 = arguments;
        return _regenerator["default"].wrap(function _callee11$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              this.setStatus('pending');
              for (_len12 = _args11.length, data = new Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
                data[_key12] = _args11[_key12];
              }
              pendingPayload = this._resolve.apply(this, [this.pendingPayload, {}].concat(data));
              _context12.next = 5;
              return this._export.apply(this, [pendingPayload].concat(data));
            case 5:
              action = _context12.sent;
              this._dispatch(action);
            case 7:
            case "end":
              return _context12.stop();
          }
        }, _callee11, this);
      }));
      function _dispatchPending() {
        return _dispatchPending2.apply(this, arguments);
      }
      return _dispatchPending;
    }()
  }, {
    key: "_bindResources",
    value: function () {
      var _bindResources2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
        var _this10 = this;
        var _len13,
          data,
          _key13,
          resources,
          _args12 = arguments;
        return _regenerator["default"].wrap(function _callee12$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              for (_len13 = _args12.length, data = new Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
                data[_key13] = _args12[_key13];
              }
              resources = _resolve["default"].call.apply(_resolve["default"], [this, this.props.resources].concat(data));
              (0, _each2["default"])(resources, function (resource, key) {
                if (typeof resource === 'function') {
                  _this10[key] = function (options) {
                    for (var _len14 = arguments.length, override = new Array(_len14 > 1 ? _len14 - 1 : 0), _key14 = 1; _key14 < _len14; _key14++) {
                      override[_key14 - 1] = arguments[_key14];
                    }
                    return resource(options, _objectSpread(_objectSpread(_objectSpread({
                      actionId: _this10.id,
                      type: _this10.constructor.type
                    }, _this10.context), (0, _last2["default"])(data)), override));
                  };
                }
              });
            case 3:
            case "end":
              return _context13.stop();
          }
        }, _callee12, this);
      }));
      function _bindResources() {
        return _bindResources2.apply(this, arguments);
      }
      return _bindResources;
    }()
  }, {
    key: "_bindActionsCreators",
    value: function _bindActionsCreators() {
      var _this11 = this;
      for (var _len15 = arguments.length, ownData = new Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {
        ownData[_key15] = arguments[_key15];
      }
      var actionCreators = _resolve["default"].call.apply(_resolve["default"], [this, this.constructor.actionCreators].concat(ownData));
      (0, _each2["default"])(actionCreators, function (action, key) {
        if (typeof action === 'function') {
          _this11[key] = function () {
            for (var _len16 = arguments.length, data = new Array(_len16), _key16 = 0; _key16 < _len16; _key16++) {
              data[_key16] = arguments[_key16];
            }
            return new Promise( /*#__PURE__*/function () {
              var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(success, error) {
                var actionInstance;
                return _regenerator["default"].wrap(function _callee13$(_context14) {
                  while (1) switch (_context14.prev = _context14.next) {
                    case 0:
                      actionInstance = action({
                        origin: _this11.origin || _this11.constructor.name,
                        tracked: _this11._tracked || false,
                        safeguard: _this11._safeguard || false,
                        success: success,
                        error: error
                      });
                      _this11.delegatedActions.push(actionInstance);
                      actionInstance.setState.apply(actionInstance, data);
                      actionInstance.run.apply(actionInstance, data)(_this11._dispatch, _this11._getState);
                    case 4:
                    case "end":
                      return _context14.stop();
                  }
                }, _callee13);
              }));
              return function (_x7, _x8) {
                return _ref9.apply(this, arguments);
              };
            }());
          };
        }
      });
    }
  }, {
    key: "_processPayload",
    value: function () {
      var _processPayload2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
        var _len17,
          data,
          _key17,
          call,
          payload,
          _args14 = arguments;
        return _regenerator["default"].wrap(function _callee14$(_context15) {
          while (1) switch (_context15.prev = _context15.next) {
            case 0:
              for (_len17 = _args14.length, data = new Array(_len17), _key17 = 0; _key17 < _len17; _key17++) {
                data[_key17] = _args14[_key17];
              }
              if (!(typeof this.call === 'function')) {
                _context15.next = 20;
                break;
              }
              _context15.prev = 2;
              _context15.next = 5;
              return this.call.apply(this, data);
            case 5:
              call = _context15.sent;
              _context15.next = 8;
              return (0, _resolve["default"])(call);
            case 8:
              payload = _context15.sent;
              this.setStatus('success');
              return _context15.abrupt("return", this._resolve.apply(this, [this.successPayload, payload].concat(data)));
            case 13:
              _context15.prev = 13;
              _context15.t0 = _context15["catch"](2);
              if (_context15.t0 instanceof Error) _log["default"].error(_context15.t0);
              this.setStatus('error');
              return _context15.abrupt("return", this._resolve.apply(this, [this.errorPayload, _context15.t0].concat(data)));
            case 18:
              _context15.next = 22;
              break;
            case 20:
              if (!(this.call !== undefined)) {
                _context15.next = 22;
                break;
              }
              return _context15.abrupt("return", this.call);
            case 22:
              return _context15.abrupt("return", this._processSuccess({}, data));
            case 23:
            case "end":
              return _context15.stop();
          }
        }, _callee14, this, [[2, 13]]);
      }));
      function _processPayload() {
        return _processPayload2.apply(this, arguments);
      }
      return _processPayload;
    }()
  }, {
    key: "_processSuccess",
    value: function () {
      var _processSuccess2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(payload, data) {
        return _regenerator["default"].wrap(function _callee15$(_context16) {
          while (1) switch (_context16.prev = _context16.next) {
            case 0:
              this.setStatus('success');
              return _context16.abrupt("return", this._resolve.apply(this, [this.successPayload, payload].concat(data)));
            case 2:
            case "end":
              return _context16.stop();
          }
        }, _callee15, this);
      }));
      function _processSuccess(_x9, _x10) {
        return _processSuccess2.apply(this, arguments);
      }
      return _processSuccess;
    }()
  }, {
    key: "_processError",
    value: function () {
      var _processError2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(payload) {
        var _len18,
          data,
          _key18,
          _args16 = arguments;
        return _regenerator["default"].wrap(function _callee16$(_context17) {
          while (1) switch (_context17.prev = _context17.next) {
            case 0:
              this.setStatus('error');
              for (_len18 = _args16.length, data = new Array(_len18 > 1 ? _len18 - 1 : 0), _key18 = 1; _key18 < _len18; _key18++) {
                data[_key18 - 1] = _args16[_key18];
              }
              return _context17.abrupt("return", this._resolve.apply(this, [this.errorPayload, payload].concat(data)));
            case 3:
            case "end":
              return _context17.stop();
          }
        }, _callee16, this);
      }));
      function _processError(_x11) {
        return _processError2.apply(this, arguments);
      }
      return _processError;
    }()
  }, {
    key: "_beforeDispatch",
    value: function () {
      var _beforeDispatch2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17(payload) {
        var _len19,
          data,
          _key19,
          _args17 = arguments;
        return _regenerator["default"].wrap(function _callee17$(_context18) {
          while (1) switch (_context18.prev = _context18.next) {
            case 0:
              _context18.prev = 0;
              for (_len19 = _args17.length, data = new Array(_len19 > 1 ? _len19 - 1 : 0), _key19 = 1; _key19 < _len19; _key19++) {
                data[_key19 - 1] = _args17[_key19];
              }
              if (!(this.status === 'success')) {
                _context18.next = 7;
                break;
              }
              _context18.next = 5;
              return this._resolve.apply(this, [this.beforeDispatch, payload].concat(data));
            case 5:
              _context18.next = 10;
              break;
            case 7:
              if (!(this.status === 'error')) {
                _context18.next = 10;
                break;
              }
              _context18.next = 10;
              return this._resolve.apply(this, [this.beforeRescue, payload].concat(data));
            case 10:
              _context18.next = 15;
              break;
            case 12:
              _context18.prev = 12;
              _context18.t0 = _context18["catch"](0);
              _log["default"].error(_context18.t0);
            case 15:
            case "end":
              return _context18.stop();
          }
        }, _callee17, this, [[0, 12]]);
      }));
      function _beforeDispatch(_x12) {
        return _beforeDispatch2.apply(this, arguments);
      }
      return _beforeDispatch;
    }()
  }, {
    key: "_afterDispatch",
    value: function () {
      var _afterDispatch2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18(payload) {
        var _len20,
          data,
          _key20,
          _args18 = arguments;
        return _regenerator["default"].wrap(function _callee18$(_context19) {
          while (1) switch (_context19.prev = _context19.next) {
            case 0:
              for (_len20 = _args18.length, data = new Array(_len20 > 1 ? _len20 - 1 : 0), _key20 = 1; _key20 < _len20; _key20++) {
                data[_key20 - 1] = _args18[_key20];
              }
              if (!(this.status === 'success')) {
                _context19.next = 6;
                break;
              }
              _context19.next = 4;
              return this._resolve.apply(this, [this.afterDispatch, payload].concat(data));
            case 4:
              _context19.next = 9;
              break;
            case 6:
              if (!(this.status === 'error')) {
                _context19.next = 9;
                break;
              }
              _context19.next = 9;
              return this._resolve.apply(this, [this.afterRescue, payload].concat(data));
            case 9:
            case "end":
              return _context19.stop();
          }
        }, _callee18, this);
      }));
      function _afterDispatch(_x13) {
        return _afterDispatch2.apply(this, arguments);
      }
      return _afterDispatch;
    }()
  }, {
    key: "_setSafeguard",
    value: function _setSafeguard() {
      if (this._safeguard) {
        window.addEventListener('beforeunload', this._windowSafeguard);
      }
    }
  }, {
    key: "_removeSafeguard",
    value: function _removeSafeguard() {
      if (this._safeguard) {
        window.removeEventListener('beforeunload', this._windowSafeguard);
      }
    }
  }, {
    key: "_windowSafeguard",
    value: function _windowSafeguard() {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.event;
      event.preventDefault();
      event.returnValue = 'Changes that you made may not be saved.';
      return event.returnValue;
    }
  }, {
    key: "abort",
    value: function abort() {
      this.aborted = true;
    }
  }], [{
    key: "bind",
    value: function bind(context) {
      var _this12 = this;
      return function () {
        for (var _len21 = arguments.length, data = new Array(_len21), _key21 = 0; _key21 < _len21; _key21++) {
          data[_key21] = arguments[_key21];
        }
        return new Promise( /*#__PURE__*/function () {
          var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19(success, error) {
            var _Runtime, dispatch, getState, action;
            return _regenerator["default"].wrap(function _callee19$(_context20) {
              while (1) switch (_context20.prev = _context20.next) {
                case 0:
                  _Runtime = (0, _Runtime2["default"])('store'), dispatch = _Runtime.dispatch, getState = _Runtime.getState;
                  action = new _this12(_objectSpread({
                    success: success,
                    error: error
                  }, context));
                  action.setState.apply(action, data);
                  action.run.apply(action, data)(dispatch, getState);
                case 4:
                case "end":
                  return _context20.stop();
              }
            }, _callee19);
          }));
          return function (_x14, _x15) {
            return _ref10.apply(this, arguments);
          };
        }());
      };
    }
  }]);
  return Action;
}(_Smart2["default"]);
(0, _defineProperty2["default"])(Action, "actionCreators", {});
(0, _defineProperty2["default"])(Action, "type", false);
(0, _defineProperty2["default"])(Action, "safeguard", false);
(0, _defineProperty2["default"])(Action, "tracked", false);
(0, _defineProperty2["default"])(Action, "defaults", function (options) {
  return {
    context: options
  };
});
(0, _defineProperty2["default"])(Action, "reducer", false);
(0, _defineProperty2["default"])(Action, "cache", false);
var _default = Action;
exports["default"] = _default;