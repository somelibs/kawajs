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
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRouter = require("react-router");
var _Component = _interopRequireDefault(require("../Component"));
var _History = _interopRequireDefault(require("./History"));
var _Runtime = _interopRequireDefault(require("./Runtime"));
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var Router = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Router, _React$Component);
  var _super = _createSuper(Router);
  function Router(props, state) {
    var _this;
    (0, _classCallCheck2["default"])(this, Router);
    _this = _super.call(this, props, state);
    var _this$props = _this.props,
      history = _this$props.history,
      historyHook = _this$props.historyHook;
    _this.toggleHistory = history.listen(function (location, action) {
      historyHook({
        location: location,
        action: action
      });
    });
    return _this;
  }
  (0, _createClass2["default"])(Router, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.toggleHistory();
    }
  }, {
    key: "render",
    value: function render() {
      _reactRouter.Router.displayName = 'ReactRouter';
      return /*#__PURE__*/_react["default"].createElement(_reactRouter.Router, this.props);
    }
  }]);
  return Router;
}(_react["default"].Component);
(0, _defineProperty2["default"])(Router, "stateToProps", function (_ref) {
  var ownProps = _ref.ownProps;
  var Store = (0, _Runtime["default"])('store');
  var state = Store.getInternalState();
  return {
    events: state.router
  };
});
(0, _defineProperty2["default"])(Router, "actionCreators", function (_ref2) {
  var nextProps = _ref2.nextProps;
  var historyHook = nextProps.historyHook;
  return {
    historyHook: historyHook || false
  };
});
(0, _defineProperty2["default"])(Router, "dispatchToProps", function (_ref3) {
  var dispatch = _ref3.dispatch,
    actionCreators = _ref3.actionCreators;
  var historyHook = actionCreators.historyHook;
  return {
    historyHook: historyHook || function (payload) {
      return dispatch({
        type: '@@NAVIGATE',
        payload: payload
      });
    }
  };
});
(0, _defineProperty2["default"])(Router, "propTypes", {
  history: _propTypes["default"].object,
  historyHook: _propTypes["default"].func.isRequired
});
(0, _defineProperty2["default"])(Router, "defaultProps", {
  history: _History["default"]
});
(0, _defineProperty2["default"])(Router, "propsToContext", function (_ref4) {
  var ownProps = _ref4.ownProps;
  return {
    location: ownProps.history.location,
    history: ownProps.history
  };
});
var _default = (0, _Component["default"])(Router);
exports["default"] = _default;