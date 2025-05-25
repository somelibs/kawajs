"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _construct2 = _interopRequireDefault(require("@babel/runtime/helpers/construct"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));
var _each2 = _interopRequireDefault(require("lodash/each"));
var _camelCase2 = _interopRequireDefault(require("lodash/camelCase"));
var _snakeCase2 = _interopRequireDefault(require("lodash/snakeCase"));
var _uniqueId2 = _interopRequireDefault(require("lodash/uniqueId"));
var _Smart2 = _interopRequireDefault(require("./Smart"));
var _ResourceCall = _interopRequireDefault(require("./internal/ResourceCall"));
exports.ResourceCall = _ResourceCall["default"];
var _resolve = _interopRequireDefault(require("./helpers/resolve"));
var _excluded = ["payload"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var Resource = /*#__PURE__*/function (_Smart) {
  (0, _inherits2["default"])(Resource, _Smart);
  var _super = _createSuper(Resource);
  function Resource() {
    var _this;
    (0, _classCallCheck2["default"])(this, Resource);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "uniqueId", "".concat(_this.constructor.name, "#").concat((0, _uniqueId2["default"])()));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_getResolver", function (payload, base, runtime, context) {
      return function (key) {
        var call = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var parsedOption;
        var options = _objectSpread(_objectSpread(_objectSpread({}, context), runtime), {}, {
          payload: payload
        });
        var resolver = call ? _resolve["default"] : function (value) {
          return value;
        };
        var priorityStack = [runtime, context, base, _this.props];
        (0, _each2["default"])(priorityStack, function (scope) {
          parsedOption = resolver(scope[key], options);
          if (!(0, _isUndefined2["default"])(parsedOption)) return false;
        });
        return parsedOption;
      };
    });
    return _this;
  }
  (0, _createClass2["default"])(Resource, [{
    key: "_optionsParser",
    value: function _optionsParser(resolver, base, runtime, context) {
      return {
        uniqueId: this.uniqueId,
        resourceName: this.constructor.name,
        mock: resolver('mock', false) || false,
        path: resolver('path', false),
        cache: resolver('cache') || true,
        baseUrl: resolver('baseUrl', false),
        method: resolver('method') || 'GET',
        allowCors: resolver('allowCors') || false,
        filter: resolver('filter', false) || false,
        formData: resolver('formData') || false,
        paginate: resolver('paginate', false) || false,
        credentials: resolver('credentials') || 'same-origin',
        headers: resolver('headers', false),
        reader: resolver('reader') || 'json',
        noContent: resolver('noContent') || false,
        collection: resolver('collection') || false,
        entityParser: resolver('entityParser', false) || false,
        payloadParser: resolver('payloadParser', false) || false,
        errorParser: resolver('errorParser', false) || function (payload) {
          return payload;
        },
        responseParser: resolver('responseParser', false) || function (response, body) {
          return body;
        },
        requestTransform: resolver('requestTransform') === false ? false : _snakeCase2["default"],
        responseTransform: resolver('responseTransform') === false ? false : _camelCase2["default"],
        collectionParser: resolver('collectionParser', false) || function (payload) {
          return payload.collection;
        },
        metaParser: resolver('metaParser', false) || function (payload) {
          return payload.pagination;
        },
        resourceClass: this.constructor.name || 'Resource',
        schemaParser: resolver('schemaParser', false) || false,
        schema: resolver('schema') || {},
        onSuccess: resolver('onSuccess', false) || false,
        onError: resolver('onError', false) || false,
        hook: resolver('hook', false) || false,
        debug: resolver('debug') || false,
        expiry: resolver('expiry') || false,
        context: _objectSpread(_objectSpread(_objectSpread({}, resolver('context')), context), runtime)
      };
    }
  }, {
    key: "define",
    value: function define() {
      var _this2 = this;
      var base = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return function () {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          payload = _ref.payload,
          runtime = (0, _objectWithoutProperties2["default"])(_ref, _excluded);
        var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var resolver = _this2._getResolver(payload, base, runtime, context);
        var options = _this2._optionsParser(resolver, base, runtime, context);
        var resource = new _ResourceCall["default"](options);
        return resource.call(payload);
      };
    }
  }], [{
    key: "export",
    value: function _export() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      return (0, _construct2["default"])(this, args);
    }
  }]);
  return Resource;
}(_Smart2["default"]);
var _default = Resource;
exports["default"] = _default;