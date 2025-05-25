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
var _map2 = _interopRequireDefault(require("lodash/map"));
var _uniqueId2 = _interopRequireDefault(require("lodash/uniqueId"));
var _each2 = _interopRequireDefault(require("lodash/each"));
var _get2 = _interopRequireDefault(require("lodash/get"));
var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _component = _interopRequireDefault(require("@loadable/component"));
var _reactRouter = require("react-router");
var _Component = _interopRequireDefault(require("../Component"));
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var Junction = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Junction, _React$Component);
  var _super = _createSuper(Junction);
  function Junction() {
    var _this;
    (0, _classCallCheck2["default"])(this, Junction);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      match: undefined
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "setRef", function (route) {
      return function (reference) {
        if (reference) {
          _this.setState({
            route: route,
            location: (0, _get2["default"])(reference, 'props.location'),
            match: (0, _get2["default"])(reference, 'props.computedMatch')
          });
        }
      };
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "renderComponent", function () {});
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "getFullPath", function (path) {
      var basePath = _this.props.basePath;
      return basePath ? "/".concat(basePath).concat(path) : path;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "renderWithProviders", function (screen, providers) {
      return function (props) {
        var renderer = /*#__PURE__*/_react["default"].createElement(screen, props);
        (0, _each2["default"])(providers, function (Provider) {
          renderer = /*#__PURE__*/_react["default"].createElement(Provider, props, renderer);
        });
        return renderer;
      };
    });
    return _this;
  }
  (0, _createClass2["default"])(Junction, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      var basePath = this.props.basePath;
      var match = this.state.match;
      var shouldUpdate = !(0, _isEqual2["default"])(match, nextState.match) || !(0, _isEqual2["default"])(basePath, nextProps.basePath);
      return shouldUpdate;
    }
  }, {
    key: "getScope",
    value: function getScope() {
      var _this$props = this.props,
        routes = _this$props.routes,
        scope = _this$props.scope;
      return routes.scope(scope);
    }
  }, {
    key: "getRoutes",
    value: function getRoutes() {
      var _this$props2 = this.props,
        routes = _this$props2.routes,
        scope = _this$props2.scope;
      return routes.draw(scope);
    }
  }, {
    key: "renderRoute",
    value: function renderRoute(route) {
      var key = "route-".concat((0, _uniqueId2["default"])());
      var fullPath = this.getFullPath(route.path);
      var screen = (0, _component["default"])(route.component);
      if (route.providers) {
        var providers = (0, _map2["default"])(route.providers, function (provider) {
          return (0, _component["default"])(provider);
        });
        return /*#__PURE__*/_react["default"].createElement(_reactRouter.Route, {
          key: key,
          path: fullPath,
          ref: this.setRef(route),
          render: this.renderWithProviders(screen, providers)
        });
      }
      return /*#__PURE__*/_react["default"].createElement(_reactRouter.Route, {
        key: key,
        path: fullPath,
        component: screen,
        ref: this.setRef(route)
      });
    }
  }, {
    key: "renderRoutes",
    value: function renderRoutes() {
      var _this2 = this;
      var routes = this.getRoutes();
      return /*#__PURE__*/_react["default"].createElement(_reactRouter.Switch, null, (0, _map2["default"])(routes, function (route) {
        return _this2.renderRoute(route);
      }));
    }
  }, {
    key: "renderWrapper",
    value: function renderWrapper() {
      var scope = this.getScope();
      var routes = this.renderRoutes();
      var _this$state = this.state,
        match = _this$state.match,
        location = _this$state.location,
        route = _this$state.route;
      if (scope.layout) {
        var Layout = (0, _component["default"])(scope.layout);
        return /*#__PURE__*/_react["default"].createElement(Layout, {
          location: location,
          match: match,
          route: route
        }, routes);
      }
      return routes;
    }
  }, {
    key: "render",
    value: function render() {
      return this.renderWrapper();
    }
  }]);
  return Junction;
}(_react["default"].Component);
(0, _defineProperty2["default"])(Junction, "propTypes", {
  scope: _propTypes["default"].string,
  basePath: _propTypes["default"].string,
  routes: _propTypes["default"].object.isRequired
});
(0, _defineProperty2["default"])(Junction, "defaultProps", {
  scope: undefined,
  basePath: undefined
});
var _default = (0, _Component["default"])(Junction);
exports["default"] = _default;