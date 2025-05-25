"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _compact2 = _interopRequireDefault(require("lodash/compact"));
var _find2 = _interopRequireDefault(require("lodash/find"));
var _map2 = _interopRequireDefault(require("lodash/map"));
var _mapValues2 = _interopRequireDefault(require("lodash/mapValues"));
var _groupBy2 = _interopRequireDefault(require("lodash/groupBy"));
var _last2 = _interopRequireDefault(require("lodash/last"));
var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));
var _each2 = _interopRequireDefault(require("lodash/each"));
var _includes2 = _interopRequireDefault(require("lodash/includes"));
var _filter2 = _interopRequireDefault(require("lodash/filter"));
var _first2 = _interopRequireDefault(require("lodash/first"));
var _isArray2 = _interopRequireDefault(require("lodash/isArray"));
var _Smart2 = _interopRequireDefault(require("../Smart"));
var _Runtime = _interopRequireDefault(require("../instance/Runtime"));
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var argsToArray = function argsToArray() {
  var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return (0, _isArray2["default"])((0, _first2["default"])(keys)) ? (0, _first2["default"])(keys) : keys;
};
var ActionStack = /*#__PURE__*/function (_Smart) {
  (0, _inherits2["default"])(ActionStack, _Smart);
  var _super = _createSuper(ActionStack);
  function ActionStack() {
    var _this;
    (0, _classCallCheck2["default"])(this, ActionStack);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "keys", {});
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "stack", []);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "persisted", []);
    return _this;
  }
  (0, _createClass2["default"])(ActionStack, [{
    key: "push",
    value: function push(_ref) {
      var id = _ref.id,
        key = _ref.key,
        instance = _ref.instance;
      this.stack.push({
        id: id,
        key: key,
        instance: instance
      });
    }
  }, {
    key: "watch",
    value: function watch(key, id) {
      this.push({
        id: id,
        key: key
      });
    }
  }, {
    key: "clear",
    value: function clear() {
      var _this2 = this;
      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.stack = force ? [] : (0, _filter2["default"])(this.stack, function (item) {
        return (0, _includes2["default"])(_this2.persisted, item.key);
      });
    }
  }, {
    key: "clearExcept",
    value: function clearExcept() {
      var _this3 = this;
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      var preserve = argsToArray(args);
      this.stack = (0, _filter2["default"])(this.stack, function (item) {
        return (0, _includes2["default"])(_this3.persisted, item.key) || (0, _includes2["default"])(preserve, item.key);
      });
    }
  }, {
    key: "clearSome",
    value: function clearSome() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      var actions = argsToArray(args);
      this.stack = (0, _filter2["default"])(this.stack, function (item) {
        return !(0, _includes2["default"])(actions, item.key);
      });
    }
  }, {
    key: "clearOnChange",
    value: function clearOnChange() {
      var _this4 = this;
      var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var keys = argsToArray(args);
      (0, _each2["default"])(this.keys, function (value, key) {
        if (!(0, _isEmpty2["default"])(_this4.keys) && value !== keys[key]) {
          _this4.clear(true);
        }
      });
      this.keys = keys;
    }
  }, {
    key: "persist",
    value: function persist() {
      var _this$persisted;
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      var keys = argsToArray(args);
      (_this$persisted = this.persisted).push.apply(_this$persisted, keys);
    }
  }, {
    key: "find",
    value: function find(key) {
      var map = this.groups();
      return map[key] || [];
    }
  }, {
    key: "findLast",
    value: function findLast() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var stack = key ? this.find(key) : this.own();
      return (0, _last2["default"])(stack);
    }
  }, {
    key: "getErrors",
    value: function getErrors() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var stack = key ? this.find(key) : this.own();
      return (0, _filter2["default"])(stack, function (action) {
        return action && action.status === 'error';
      });
    }
  }, {
    key: "getLastError",
    value: function getLastError() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var action = this.findLast(key);
      return action && action.status === 'error' ? action.payload : false;
    }
  }, {
    key: "isError",
    value: function isError() {
      var _this5 = this;
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      var keys = argsToArray(args);
      var success;
      (0, _each2["default"])(keys, function (key) {
        var actions = _this5.find(key);
        (0, _each2["default"])(actions, function (action) {
          success = success === false ? success : action && action.status === 'error';
        });
      });
      return !!success;
    }
  }, {
    key: "isSuccess",
    value: function isSuccess() {
      var _this6 = this;
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }
      var keys = argsToArray(args);
      var success;
      (0, _each2["default"])(keys, function (key) {
        var actions = _this6.find(key);
        (0, _each2["default"])(actions, function (action) {
          success = success === false ? success : action && action.status === 'success';
        });
      });
      return !!success;
    }
  }, {
    key: "lastSucceeded",
    value: function lastSucceeded() {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }
      var keys = argsToArray(args);
      return this.lastOf(keys, 'success');
    }
  }, {
    key: "isDone",
    value: function isDone() {
      var _this7 = this;
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }
      var keys = argsToArray(args);
      var done;
      (0, _each2["default"])(keys, function (key) {
        var actions = _this7.find(key);
        (0, _each2["default"])(actions, function (action) {
          done = done === false ? done : !(!action || action.status === 'pending');
        });
      });
      return !!done;
    }
  }, {
    key: "wasDoneOnce",
    value: function wasDoneOnce() {
      var _this8 = this;
      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }
      var keys = argsToArray(args);
      var done;
      (0, _each2["default"])(keys, function (key) {
        var actions = _this8.find(key);
        var keyDone;
        (0, _each2["default"])(actions, function (action) {
          keyDone = keyDone || !(!action || action.status === 'pending');
        });
        done = done === false ? done : keyDone;
      });
      return !!done;
    }
  }, {
    key: "isPending",
    value: function isPending() {
      for (var _len10 = arguments.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        args[_key10] = arguments[_key10];
      }
      var keys = argsToArray(args);
      return this.anyOf(keys, 'pending');
    }
  }, {
    key: "anyOf",
    value: function anyOf() {
      var _this9 = this;
      var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var status = arguments.length > 1 ? arguments[1] : undefined;
      var anyOf = false;
      (0, _each2["default"])(keys, function (key) {
        var actions = _this9.find(key);
        (0, _each2["default"])(actions, function (action) {
          anyOf = anyOf || !!(action && action.status === status);
        });
      });
      return !!anyOf;
    }
  }, {
    key: "lastOf",
    value: function lastOf() {
      var _this10 = this;
      var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var status = arguments.length > 1 ? arguments[1] : undefined;
      var lastOf;
      (0, _each2["default"])(keys, function (key) {
        var action = (0, _last2["default"])(_this10.find(key));
        lastOf = lastOf === false ? lastOf : action && action.status === status;
      });
      return !!lastOf;
    }
  }, {
    key: "any",
    value: function any(status) {
      var any = false;
      var actions = this.own();
      (0, _each2["default"])(actions, function (action) {
        any = any || !!(action && action.status === status);
      });
      return !!any;
    }
  }, {
    key: "groups",
    value: function groups() {
      var store = (0, _Runtime["default"])('store');
      var state = store.getInternalState();
      var actions = state.actions;
      var groups = (0, _groupBy2["default"])(this.stack, 'key');
      return (0, _mapValues2["default"])(groups, function (stack) {
        return (0, _map2["default"])(stack, function (item) {
          var stackId = item.id;
          return (0, _find2["default"])(actions, function (action) {
            return stackId === action.id;
          });
        });
      });
    }
  }, {
    key: "own",
    value: function own() {
      var Store = (0, _Runtime["default"])('store');
      var state = Store.getInternalState();
      var actions = state.actions;
      var map = (0, _map2["default"])(this.stack, function (item) {
        var stackId = item.id;
        return (0, _find2["default"])(actions, function (action) {
          return stackId === action.id;
        });
      });
      return (0, _compact2["default"])(map);
    }
  }, {
    key: "all",
    value: function all() {
      var Store = (0, _Runtime["default"])('store');
      var state = Store.getInternalState();
      return state.actions;
    }
  }, {
    key: "getMetaPer",
    value: function getMetaPer(key) {
      var action = this.findLast(key);
      if (action) {
        var Store = (0, _Runtime["default"])('store');
        var state = Store.getInternalState();
        var resources = state.resources;
        return (0, _find2["default"])(resources, function (meta) {
          return (0, _includes2["default"])(meta.actionIds, action.id);
        });
      }
    }
  }, {
    key: "getInstances",
    value: function getInstances(key) {
      var groups = (0, _groupBy2["default"])(this.stack, 'key');
      return (0, _isArray2["default"])(groups[key]) ? groups[key].map(function (item) {
        return item.instance;
      }) : [];
    }
  }, {
    key: "abort",
    value: function () {
      var _abort = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              (0, _each2["default"])(this.stack, function (_ref2) {
                var instance = _ref2.instance;
                if (instance) {
                  instance.abort();
                }
              });
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function abort() {
        return _abort.apply(this, arguments);
      }
      return abort;
    }()
  }]);
  return ActionStack;
}(_Smart2["default"]);
var _default = ActionStack;
exports["default"] = _default;