"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _remove4 = _interopRequireDefault(require("lodash/remove"));
var _concat2 = _interopRequireDefault(require("lodash/concat"));
var _compact2 = _interopRequireDefault(require("lodash/compact"));
var _redux = require("redux");
var _reduxThunk = _interopRequireDefault(require("redux-thunk"));
var _Smart2 = _interopRequireDefault(require("./Smart"));
var _log = _interopRequireDefault(require("./helpers/log"));
var _InternalReducer = _interopRequireDefault(require("./internal/InternalReducer"));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var Store = /*#__PURE__*/function (_Smart) {
  (0, _inherits2["default"])(Store, _Smart);
  var _super = _createSuper(Store);
  function Store() {
    var _this;
    (0, _classCallCheck2["default"])(this, Store);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "pendingActions", []);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "dispatch", function (action) {
      _this.internal.dispatch(action);
      return _this.main.dispatch(action);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "subscribe", function (listener) {
      return _this.main.subscribe(listener);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "replaceReducer", function (nextReducer) {
      return _this.main.replaceReducer(nextReducer);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "getState", function () {
      return _this.main.getState();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "getInternalState", function () {
      return _this.internal.getState();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_dispatch", function (action) {
      return _this.internal.dispatch(action);
    });
    return _this;
  }
  (0, _createClass2["default"])(Store, [{
    key: "initialize",
    value: function initialize(_ref) {
      var reducer = _ref.reducer,
        name = _ref.name,
        customMiddlewares = _ref.customMiddlewares;
      this.internal = this._createInternalStore(name);
      this.main = this._createMainStore(customMiddlewares, reducer, name);
      if (process.env.NODE_ENV !== 'production') Object.assign(this, {
        pendingActions: []
      });
    }
  }, {
    key: "_createInternalStore",
    value: function _createInternalStore(name) {
      var enhancer = this._getEnhancer(name, true);
      var internalReducer = _InternalReducer["default"]["export"]();
      return (0, _redux.createStore)(internalReducer, false, enhancer);
    }
  }, {
    key: "_createMainStore",
    value: function _createMainStore(customMiddlewares) {
      var reducer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.reducer;
      var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var enhancer = this._getEnhancer(name, false, customMiddlewares);
      return (0, _redux.createStore)(reducer, false, enhancer);
    }
  }, {
    key: "_getEnhancer",
    value: function _getEnhancer(name) {
      var internal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var customMiddlewares = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var composer = this._getComposer(name, internal);
      var middlewares = this._getMiddlewares(customMiddlewares, internal);
      return composer(middlewares);
    }
  }, {
    key: "_getComposer",
    value: function _getComposer() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var internal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (process.env.NODE_ENV !== 'production' && global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
        return global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          name: internal ? "Kawax@".concat(name) : name,
          latency: 1000,
          maxAge: 25
        });
      }
      return _redux.compose;
    }
  }, {
    key: "_getMiddlewares",
    value: function _getMiddlewares() {
      var customMiddlewares = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var internal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var middlewares = (0, _compact2["default"])((0, _concat2["default"])(_reduxThunk["default"], customMiddlewares));
      if (process.env.NODE_ENV !== 'production' && !internal) {
        middlewares.push(this._logger.bind(this));
      }
      return _redux.applyMiddleware.apply(void 0, middlewares);
    }
  }, {
    key: "_withCustomLogger",
    value: function _withCustomLogger(next, action) {
      var duration = null;
      if (action.status === 'pending') {
        this.pendingActions.push({
          id: action.id,
          startTime: performance.now()
        });
      }
      var payload = next(action);
      if (action.status !== 'pending') {
        var _remove2 = (0, _remove4["default"])(this.pendingActions, function (pendingAction) {
            return pendingAction.id === action.id;
          }),
          _remove3 = (0, _slicedToArray2["default"])(_remove2, 1),
          initialAction = _remove3[0];
        duration = performance.now() - (initialAction ? initialAction.startTime : 0);
      }
      if (action.log) {
        var output = this._formatLog(action, duration);
        if (action.status === 'error') {
          _log["default"].error.apply(_log["default"], output.concat(['Action:', action]));
        } else if (action.status === 'success') {
          _log["default"].debug.apply(_log["default"], output.concat(['\n ', action]));
        }
      }
      return payload;
    }
  }, {
    key: "_withSimpleLogger",
    value: function _withSimpleLogger(next, action) {
      var output = this._formatLog(_objectSpread({
        status: 'success',
        "class": next.constructor.name
      }, action), false);
      var payload = next(action);
      _log["default"].debug.apply(_log["default"], output.concat(['\n', action]));
      return payload;
    }
  }, {
    key: "_logger",
    value: function _logger() {
      var _this2 = this;
      return function (next) {
        return function (action) {
          if (process.env.NODE_ENV !== 'production') {
            if (action.id && action.status) {
              return _this2._withCustomLogger(next, action);
            }
            return _this2._withSimpleLogger(next, action);
          }
          return next(action);
        };
      };
    }
  }, {
    key: "_isDarkModeEnabled",
    value: function _isDarkModeEnabled() {
      return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, {
    key: "_getStyle",
    value: function _getStyle(status) {
      var darkMode = this._isDarkModeEnabled();
      var isError = status === 'error';
      if (darkMode) {
        return isError ? 'color: #fd4146; font-weight: bold;' : 'color: white; font-weight: bold;';
      }
      return isError ? 'color: #ff443a; font-weight: bold;' : 'color: black; font-weight: bold;';
    }
  }, {
    key: "_formatLog",
    value: function _formatLog(action, duration) {
      var className = String(action["class"]);
      var header = String(action.type);
      var status = action.status ? "".concat(action.status) : 'no-status';
      var style = this._getStyle(action.status);
      var time = duration ? "".concat(duration >= 1000 ? "".concat((duration / 1000).toFixed(2), "s") : "".concat(duration.toFixed(0), "ms")) : 'synchronous';
      return action.status === 'error' ? ["".concat(className, ": ").concat(status, " (").concat(header, ") (").concat(time, ")")] : ["%c".concat(className, ": ").concat(status, " (").concat(header, ") (").concat(time, ")"), style];
    }
  }]);
  return Store;
}(_Smart2["default"]);
var _default = Store;
exports["default"] = _default;