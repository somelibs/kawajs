"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _compact2 = _interopRequireDefault(require("lodash/compact"));
var _snakeCase2 = _interopRequireDefault(require("lodash/snakeCase"));
var _get2 = _interopRequireDefault(require("lodash/get"));
var _Reducer2 = _interopRequireDefault(require("../Reducer"));
var _excluded = ["props"];
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var InternalReducer = /*#__PURE__*/function (_Reducer) {
  (0, _inherits2["default"])(InternalReducer, _Reducer);
  var _super = _createSuper(InternalReducer);
  function InternalReducer() {
    var _this;
    (0, _classCallCheck2["default"])(this, InternalReducer);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "clearAction", function (state, _ref) {
      var origin = _ref.payload;
      return _this.removeItem(function (action) {
        return action.origin === origin;
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", _this.match({
      '.': {
        actions: _this.logAction
      },
      '@@CLEAR_ACTION': {
        actions: _this.clearAction
      },
      '@@ROUTER_EVENT': {
        router: _this.routerEvent
      },
      '@@RESOURCE_CALL': {
        resources: _this.mapResource
      }
    }));
    return _this;
  }
  (0, _createClass2["default"])(InternalReducer, [{
    key: "logAction",
    value: function logAction(state, _ref2) {
      var id = _ref2.id,
        type = _ref2.type,
        status = _ref2.status,
        origin = _ref2.origin,
        tracked = _ref2.tracked,
        timestamp = _ref2.timestamp,
        className = _ref2["class"],
        _ref2$context = _ref2.context,
        _ref2$context2 = _ref2$context === void 0 ? {} : _ref2$context,
        props = _ref2$context2.props,
        context = (0, _objectWithoutProperties2["default"])(_ref2$context2, _excluded);
      if (id && status && tracked) {
        return [{
          id: id,
          status: status,
          timestamp: timestamp,
          className: className,
          origin: origin,
          type: type,
          context: context
        }];
      }
    }
  }, {
    key: "mapResource",
    value: function mapResource(state, _ref3) {
      var payload = _ref3.payload;
      var pageNo = (0, _get2["default"])(payload, 'meta.currentPage');
      var url = payload.url && (0, _snakeCase2["default"])(payload.url);
      var sort = payload.sort && (0, _snakeCase2["default"])(payload.sort);
      var order = payload.order && (0, _snakeCase2["default"])(payload.order);
      var search = payload.search && (0, _snakeCase2["default"])(payload.search);
      var resourceMap = (0, _compact2["default"])([payload.resourceId, url, sort, order, search]);
      var resourceKey = resourceMap.join('#');
      if (pageNo) {
        return (0, _defineProperty2["default"])({}, resourceKey, {
          actionIds: [payload.actionId],
          totalPages: (0, _get2["default"])(payload, 'meta.totalPages'),
          pages: (0, _defineProperty2["default"])({}, pageNo, {
            itemIds: payload.itemIds,
            timestamp: (0, _get2["default"])(payload, 'meta.timestamp')
          })
        });
      }
    }
  }, {
    key: "routerEvent",
    value: function routerEvent(state, _ref5) {
      var payload = _ref5.payload;
      return payload;
    }
  }]);
  return InternalReducer;
}(_Reducer2["default"]);
(0, _defineProperty2["default"])(InternalReducer, "applyEmbeddedReducer", false);
(0, _defineProperty2["default"])(InternalReducer, "initialState", {
  actions: [],
  router: [],
  resources: {}
});
var _default = InternalReducer;
exports["default"] = _default;