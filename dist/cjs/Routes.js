"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _identity2 = _interopRequireDefault(require("lodash/identity"));
var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));
var _pickBy2 = _interopRequireDefault(require("lodash/pickBy"));
var _map2 = _interopRequireDefault(require("lodash/map"));
var _flatten2 = _interopRequireDefault(require("lodash/flatten"));
var _compact2 = _interopRequireDefault(require("lodash/compact"));
var _find2 = _interopRequireDefault(require("lodash/find"));
var _each2 = _interopRequireDefault(require("lodash/each"));
var _Smart2 = _interopRequireDefault(require("./Smart"));
var _resolve = _interopRequireDefault(require("./helpers/resolve"));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var Routes = /*#__PURE__*/function (_Smart) {
  (0, _inherits2["default"])(Routes, _Smart);
  var _super = _createSuper(Routes);
  function Routes() {
    (0, _classCallCheck2["default"])(this, Routes);
    return _super.apply(this, arguments);
  }
  (0, _createClass2["default"])(Routes, [{
    key: "initialize",
    value: function initialize() {
      var routes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this._mount = (0, _resolve["default"])(routes) || {};
    }
  }, {
    key: "scope",
    value: function scope(_scope) {
      if (_scope) {
        var node = this._getNode();
        var match = null;
        var routes = node.routes;
        var paths = _scope.split('/');
        (0, _each2["default"])(paths, function (path) {
          var next = (0, _find2["default"])(routes, {
            path: path
          });
          if (next) {
            match = next;
            routes = next.routes;
          } else {
            match = null;
          }
        });
        return match;
      }
    }
  }, {
    key: "draw",
    value: function draw(scope) {
      var node = scope ? this._getNode(scope) : this._mount;
      return this._parseNode(node, scope);
    }
  }, {
    key: "extends",
    value: function _extends(scope) {
      var node = this.scope(scope);
      return node.routes;
    }
  }, {
    key: "_parseNode",
    value: function _parseNode(node, scope) {
      var parentProviders = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var parentContext = arguments.length > 3 ? arguments[3] : undefined;
      var routes = (0, _resolve["default"])(node.routes, this);
      var context = _objectSpread(_objectSpread({}, parentContext), node.context);
      var providers = (0, _compact2["default"])([].concat(parentProviders, [node.provider]));
      var subRoutes = (0, _flatten2["default"])(this._mapNode(routes, scope, providers, context));
      var currentRoute = this._getRoute(node, scope, providers, context, true);
      return (0, _compact2["default"])([].concat((0, _flatten2["default"])(subRoutes), [currentRoute]));
    }
  }, {
    key: "_mapNode",
    value: function _mapNode(routes, scope) {
      var _this = this;
      var providers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var context = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      return (0, _map2["default"])(routes, function (node, key) {
        if (node.routes) {
          return _this._parseNode(node, "".concat(scope, "/").concat(node.path), providers, context);
        }
        return _this._getRoute(node, scope, providers, context);
      });
    }
  }, {
    key: "_getScopedPath",
    value: function _getScopedPath(path, scope) {
      return scope ? "".concat(scope, "/").concat(path) : path;
    }
  }, {
    key: "_getRoute",
    value: function _getRoute(route, scope) {
      var providers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var context = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var node = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      return route.component && (0, _pickBy2["default"])(_objectSpread(_objectSpread({}, route), {}, {
        path: "/".concat(node ? scope : this._getScopedPath(route.path, scope)),
        providers: !(0, _isEmpty2["default"])(providers) && providers,
        component: route.component || false,
        resource: route.resource || false,
        context: context
      }), _identity2["default"]);
    }
  }, {
    key: "_getNode",
    value: function _getNode() {
      var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      return scope ? this.scope(scope) : this._mount;
    }
  }]);
  return Routes;
}(_Smart2["default"]);
var _default = Routes;
exports["default"] = _default;