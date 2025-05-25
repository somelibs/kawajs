"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _includes2 = _interopRequireDefault(require("lodash/includes"));
var _compact2 = _interopRequireDefault(require("lodash/compact"));
var _clone2 = _interopRequireDefault(require("lodash/clone"));
var _isObject2 = _interopRequireDefault(require("lodash/isObject"));
var _concat2 = _interopRequireDefault(require("lodash/concat"));
var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));
var _isPlainObject2 = _interopRequireDefault(require("lodash/isPlainObject"));
var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));
var _get2 = _interopRequireDefault(require("lodash/get"));
var _each2 = _interopRequireDefault(require("lodash/each"));
var _cloneDeep2 = _interopRequireDefault(require("lodash/cloneDeep"));
var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));
var _remove2 = _interopRequireDefault(require("lodash/remove"));
var _isArray2 = _interopRequireDefault(require("lodash/isArray"));
var _Smart2 = _interopRequireDefault(require("./Smart"));
var _resolve = _interopRequireDefault(require("./helpers/resolve"));
var _excluded = ["depth"];
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function ReducerDelegate(instance) {
  this._reduce = function (state, action) {
    return instance.call(state, action);
  };
}
function ForceAssignment(callback) {
  this._reduce = function (current, path) {
    return callback(current, path);
  };
}
var Reducer = /*#__PURE__*/function (_Smart) {
  (0, _inherits2["default"])(Reducer, _Smart);
  var _super = _createSuper(Reducer);
  function Reducer() {
    var _this;
    (0, _classCallCheck2["default"])(this, Reducer);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "unionKey", 'id');
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onPending", function (pointer) {
      return function (state, action) {
        return _this._matchWithStatus(['pending'], pointer)(state, action);
      };
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onSuccess", function (pointer) {
      return function (state, action) {
        return _this._matchWithStatus(['success'], pointer)(state, action);
      };
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onError", function (pointer) {
      return function (state, action) {
        return _this._matchWithStatus(['error'], pointer)(state, action);
      };
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onDone", function (pointer) {
      return function (state, action) {
        return _this._matchWithStatus(['success', 'error'], pointer)(state, action);
      };
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "matchPending", function (map) {
      return _this.onPending(_this.match(map));
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "matchSuccess", function (map) {
      return _this.onSuccess(_this.match(map));
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "matchError", function (map) {
      return _this.onError(_this.match(map));
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "matchDone", function (map) {
      return _this.onDone(_this.match(map));
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "replace", function (next) {
      return _this.shallow(next, -1);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "assign", function (state, _ref) {
      var payload = _ref.payload;
      return payload;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "assignItem", function (state, _ref2) {
      var payload = _ref2.payload;
      return (0, _isArray2["default"])(state) ? [payload] : payload;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "removeItem", function (predicate) {
      return _this._forceAssign(function (current) {
        (0, _remove2["default"])(current, predicate);
        return current;
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "mergeBy", function (unionKey, next) {
      return function (prev, action) {
        return _this._forceAssign(function (current, path) {
          return _this._parseArray(prev, next, action, path, -1, unionKey);
        });
      };
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "shallow", function (next) {
      var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      return _this._forceAssign(function (current, action, path) {
        if (!path) {
          return _this._reduce(current, next, action, path, depth);
        }
        return next;
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "matchOn", function (statuses) {
      return function (state, action) {
        var next = state;
        (0, _each2["default"])(statuses, function (map, status) {
          // eslint-disable-next-line default-case
          switch (status) {
            case 'success':
              next = _this.matchSuccess(map)(next, action);
              break;
            case 'error':
              next = _this.matchError(map)(next, action);
              break;
            case 'pending':
              next = _this.matchPending(map)(next, action);
              break;
          }
        });
        return next;
      };
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_forceAssign", function (helper) {
      return new ForceAssignment(helper);
    });
    return _this;
  }
  (0, _createClass2["default"])(Reducer, [{
    key: "call",
    value: function call(state, _ref3) {
      var _ref3$depth = _ref3.depth,
        depth = _ref3$depth === void 0 ? 0 : _ref3$depth,
        action = (0, _objectWithoutProperties2["default"])(_ref3, _excluded);
      var path = [];
      var current = (0, _isEmpty2["default"])(state) ? this._getInitialState(path) : (0, _cloneDeep2["default"])(state);
      action.depth = depth + 1;
      var baseState = this._embeddedReducer(current, action) || current;
      var resolvedState = _resolve["default"].call(this, this.state, baseState, action);
      var next = resolvedState === undefined ? current : resolvedState;
      return this._reduce(current, next, action, path);
    }
  }, {
    key: "match",
    value: function match(map) {
      var _this2 = this;
      return function (state, action) {
        var next = state;
        var type = action.type;
        (0, _each2["default"])(map, function (pointer, match) {
          var regex = new RegExp("(^[^.]?|[.])".concat(match), 'g');
          if (type && type.match(regex)) {
            var resolvedState = _resolve["default"].call(_this2, pointer, state, action);
            next = _this2._reduce(next, resolvedState, action);
          }
        });
        return next;
      };
    }
  }, {
    key: "_embeddedReducer",
    value: function _embeddedReducer(state, action) {
      if (this.props.applyEmbeddedReducer && action.reducer && action.depth === 1) {
        var reducerCallback = _resolve["default"].call(this, action.reducer, action) || {};
        var bundledState = _resolve["default"].call(this, reducerCallback, this) || {};
        return this._reduce(state, bundledState, action);
      }
    }
  }, {
    key: "_shouldDelegate",
    value: function _shouldDelegate(next, path) {
      var initialState = (0, _get2["default"])(this.constructor.initialState, path);
      if (initialState && initialState instanceof ReducerDelegate) {
        return true;
      }
      if (next && next instanceof ReducerDelegate) {
        return true;
      }
      return false;
    }
  }, {
    key: "_reduce",
    value: function _reduce(current, next, action) {
      var path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var depth = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : -1;
      var state;
      var shouldDelegate = this._shouldDelegate(next, path);
      if (!(0, _isEqual2["default"])(current, next) && !shouldDelegate) {
        state = this._parseState(current, next, action, path, depth);
      } else if (shouldDelegate === true) {
        state = this._delegateState(current, next, action, path);
      }
      return state === undefined ? this._assignNext(current, next) : state;
    }
  }, {
    key: "_delegateState",
    value: function _delegateState(current, next, action, path) {
      if (next && next instanceof ReducerDelegate) {
        return next._reduce(current, action);
      }
      if (next === null) {
        var initialState = (0, _get2["default"])(this.constructor.initialState, path);
        return initialState._reduce(next, action);
      }
    }
  }, {
    key: "_parseState",
    value: function _parseState(current, next, action, path) {
      var depth = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : -1;
      if ((0, _isPlainObject2["default"])(next)) {
        return this._parsePlainObject(current, next, action, path, depth);
      }
      if ((0, _isArray2["default"])(next) && !path) {
        return this._parseArray(current, next, action, path, depth);
      }
      if ((0, _isFunction2["default"])(next)) {
        var resolvedState = _resolve["default"].call(this, next, current, action);
        var reducedState = this._reduce(current, resolvedState, action, path);
        return this._assignNext(current, reducedState);
      }
      if (next === null && path) {
        return this._getInitialState(path);
      }
      if (next && next instanceof ForceAssignment) {
        return next._reduce(current, path);
      }
    }
  }, {
    key: "_parsePlainObject",
    value: function _parsePlainObject(current, next, action, path) {
      var _this3 = this;
      var depth = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : -1;
      var state = {};
      (0, _each2["default"])(next, function (nextItem, key) {
        var currentPath = path ? (0, _concat2["default"])(path, key) : false;
        var currentItem = (0, _isObject2["default"])(current) ? current[key] : null;
        var nextDepth = depth < 0 || depth > 1 ? (0, _clone2["default"])(depth) - 1 : false;
        state[key] = nextDepth && nextItem ? _this3._reduce(currentItem, nextItem, action, currentPath, nextDepth) : nextItem;
      });
      return this._assignNext(current, state);
    }
  }, {
    key: "_parseArray",
    value: function _parseArray(current, next, action, path) {
      var _this4 = this;
      var depth = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : -1;
      var unionKey = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : this.unionKey;
      var union = [];
      var nextItems = [].concat(next);
      (0, _each2["default"])(current, function (currentItem, key) {
        var currentPath = path ? (0, _concat2["default"])(path, key) : false;
        var nextDepth = depth < 0 || depth > 1 ? (0, _clone2["default"])(depth) - 1 : false;
        if (currentItem) {
          union[key] = currentItem;
          (0, _each2["default"])(nextItems, function (nextItem, nextKey) {
            var matchKey = nextItem && nextItem[unionKey] ? nextItem[unionKey] : false;
            if (matchKey && currentItem[unionKey] === matchKey) {
              union[key] = nextDepth ? _this4._reduce(currentItem, nextItem, action, currentPath, nextDepth) : nextItem;
              nextItems[nextKey] = null;
            }
          });
        }
      });
      return (0, _compact2["default"])([].concat(union, nextItems));
    }
  }, {
    key: "_assignNext",
    value: function _assignNext(current, next) {
      if ((0, _isPlainObject2["default"])(current) && (0, _isPlainObject2["default"])(next)) {
        return Object.assign({}, current, next);
      }
      return next === undefined ? current : next;
    }
  }, {
    key: "_getInitialState",
    value: function _getInitialState(path) {
      var initialState = this.constructor.initialState;
      var state = initialState ? this._reduce({}, this.constructor.initialState, {
        type: '@@kawax/INIT'
      }, []) : null;
      return (0, _isEmpty2["default"])(path) ? state : (0, _get2["default"])(state, path);
    }
  }, {
    key: "_matchWithStatus",
    value: function _matchWithStatus(statuses, callback) {
      var _this5 = this;
      return function (state, action) {
        return (0, _includes2["default"])(statuses, action.status) ? _resolve["default"].call(_this5, callback, state, action) : state;
      };
    }
  }], [{
    key: "delegate",
    value: function delegate(options) {
      var instance = new this(options);
      return new ReducerDelegate(instance);
    }
  }]);
  return Reducer;
}(_Smart2["default"]);
(0, _defineProperty2["default"])(Reducer, "initialState", null);
(0, _defineProperty2["default"])(Reducer, "applyEmbeddedReducer", true);
var _default = Reducer;
exports["default"] = _default;