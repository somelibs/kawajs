"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _construct2 = _interopRequireDefault(require("@babel/runtime/helpers/construct"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireDefault(require("react"));
var _reactDom = require("react-dom");
var _reactRedux = require("react-redux");
var _Smart2 = _interopRequireDefault(require("./Smart"));
var _Store = _interopRequireDefault(require("./Store"));
var _Router = _interopRequireDefault(require("./instance/Router"));
var _Context = _interopRequireDefault(require("./instance/Context"));
var _Runtime = require("./instance/Runtime");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var Core = /*#__PURE__*/function (_Smart) {
  (0, _inherits2["default"])(Core, _Smart);
  var _super = _createSuper(Core);
  function Core() {
    (0, _classCallCheck2["default"])(this, Core);
    return _super.apply(this, arguments);
  }
  (0, _createClass2["default"])(Core, [{
    key: "initialize",
    value: function initialize(env) {
      var htmlRoot = document.getElementById(this.htmlRoot) || document.body;
      var ReactContext = this._providerRenderer();
      (0, _reactDom.render)(ReactContext, htmlRoot);
    }
  }, {
    key: "_providerRenderer",
    value: function _providerRenderer() {
      return /*#__PURE__*/_react["default"].createElement(_reactRedux.Provider, {
        store: this.store.internal
      }, /*#__PURE__*/_react["default"].createElement(_reactRedux.Provider, {
        store: this.store
      }, this._routerRenderer()));
    }
  }, {
    key: "_routerRenderer",
    value: function _routerRenderer() {
      var ReactRouter = this.router;
      if (this.withRouter === true) {
        return /*#__PURE__*/_react["default"].createElement(ReactRouter, {
          history: this.history,
          historyHook: this.historyHook
        }, /*#__PURE__*/_react["default"].createElement(this.root));
      }
      return /*#__PURE__*/_react["default"].createElement(this.root);
    }
  }], [{
    key: "init",
    value: function init() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return (0, _construct2["default"])(this, args);
    }
  }]);
  return Core;
}(_Smart2["default"]);
(0, _defineProperty2["default"])(Core, "defaults", function (options) {
  return (0, _Runtime.setRuntime)(_objectSpread(_objectSpread({}, options), {}, {
    context: options.context || _Context["default"],
    name: options.name || 'App',
    history: options.history || undefined,
    historyHook: options.historyHook || undefined,
    htmlRoot: options.htmlRoot || false,
    reducer: options.reducer || function (state) {
      return state;
    },
    root: options.root || function () {
      return /*#__PURE__*/_react["default"].createElement('div', null, 'It works!');
    },
    router: options.router || _Router["default"],
    store: new _Store["default"]({
      name: options.name,
      reducer: options.reducer,
      customMiddlewares: options.customMiddlewares
    }),
    withRouter: options.withRouter !== false
  }));
});
var _default = Core;
exports["default"] = _default;