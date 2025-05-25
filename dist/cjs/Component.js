"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = Component;
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));
var _mapValues2 = _interopRequireDefault(require("lodash/mapValues"));
var _get2 = _interopRequireDefault(require("lodash/get"));
var _reject2 = _interopRequireDefault(require("lodash/reject"));
var _omit2 = _interopRequireDefault(require("lodash/omit"));
var _isPlainObject2 = _interopRequireDefault(require("lodash/isPlainObject"));
var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));
var _uniqueId2 = _interopRequireDefault(require("lodash/uniqueId"));
var _pickBy2 = _interopRequireDefault(require("lodash/pickBy"));
var _assign2 = _interopRequireDefault(require("lodash/assign"));
var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));
var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));
var _each2 = _interopRequireDefault(require("lodash/each"));
var _isObject2 = _interopRequireDefault(require("lodash/isObject"));
var _map2 = _interopRequireDefault(require("lodash/map"));
var _compact2 = _interopRequireDefault(require("lodash/compact"));
var _includes2 = _interopRequireDefault(require("lodash/includes"));
var _omitBy2 = _interopRequireDefault(require("lodash/omitBy"));
var _keys2 = _interopRequireDefault(require("lodash/keys"));
var _uniq2 = _interopRequireDefault(require("lodash/uniq"));
var _react = _interopRequireDefault(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _warning = _interopRequireDefault(require("warning"));
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _classnames = _interopRequireDefault(require("classnames"));
var _aphrodite = require("./helpers/aphrodite");
var _Context = _interopRequireDefault(require("./instance/Context"));
var _Runtime3 = _interopRequireDefault(require("./instance/Runtime"));
var _ActionStack = _interopRequireDefault(require("./internal/ActionStack"));
var _resolve = _interopRequireDefault(require("./helpers/resolve"));
var _select = _interopRequireDefault(require("./helpers/select"));
var _excluded = ["instanceKey"],
  _excluded2 = ["instanceKey"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function Component(Pure) {
  if (!Pure.prototype.isReactComponent) (0, _warning["default"])(Pure, 'should be a class based React Component');
  var persistActionStack = Pure.persistActionStack || false;

  /* -------------------------------------------------------------------------------------------- *\
  |*                                          Instance                                            *|
  \* -------------------------------------------------------------------------------------------- */

  var instanceKeys = [];
  var composedProps = ['instanceKey', 'select', 'actions', 'dispatch', 'children', 'ownActions', 'ownClassNames'];
  function updateComposedProps(props) {
    composedProps = (0, _uniq2["default"])([].concat(composedProps, (0, _keys2["default"])(props)));
    return composedProps;
  }

  /* -------------------------------------------------------------------------------------------- *\
  |*                                         Pure props                                           *|
  \* -------------------------------------------------------------------------------------------- */

  Pure.prototype.getPureProps = function getPureProps() {
    return (0, _omitBy2["default"])(this.props, function (value, key) {
      return (0, _includes2["default"])(composedProps, key);
    });
  };
  Pure.prototype.getForwardProps = function getForwardProps() {
    /* eslint-disable-next-line react/forbid-foreign-prop-types */
    var ownProps = (0, _keys2["default"])(Pure.propTypes);
    return (0, _omitBy2["default"])(this.props, function (value, key) {
      return (0, _includes2["default"])(ownProps, key) || (0, _includes2["default"])(composedProps, key);
    });
  };

  /* -------------------------------------------------------------------------------------------- *\
  |*                                        Display Name                                          *|
  \* -------------------------------------------------------------------------------------------- */

  var displayName = Pure.name || 'Functionnal';

  /* -------------------------------------------------------------------------------------------- *\
  |*                                  Props, Context & Instance                                   *|
  \* -------------------------------------------------------------------------------------------- */

  var componentInstance;
  /* eslint-disable-next-line no-unused-vars */
  var prevProps = {};
  var prevContext = {};

  /* -------------------------------------------------------------------------------------------- *\
  |*                                            Mixins                                            *|
  \* -------------------------------------------------------------------------------------------- */

  function aggregateStaticWithMixins(key) {
    return (0, _compact2["default"])([Pure[key] || {}].concat((0, _map2["default"])(Pure.mixins, function (mixin) {
      return (0, _isObject2["default"])(mixin.props) && mixin.props[key];
    })));
  }
  function resolveStaticWithMixins(key) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var resolved = {};
    var staticMap = aggregateStaticWithMixins(key);
    (0, _each2["default"])(staticMap, function (mixin) {
      var mixinResult = _resolve["default"].call(componentInstance, mixin, options);
      Object.assign(resolved, mixinResult);
    });
    return resolved;
  }
  function bindMixin(mixin) {
    if ((0, _isFunction2["default"])(mixin)) return mixin.bind(componentInstance);
    if ((0, _isObject2["default"])(mixin) && !(0, _isUndefined2["default"])(mixin.call)) {
      return function () {
        (0, _assign2["default"])(mixin, componentInstance);
        return mixin.call.apply(mixin, arguments);
      };
    }
    return mixin;
  }
  function getMixins() {
    var mixins = {};
    if (Pure.mixins) {
      (0, _each2["default"])(Pure.mixins, function (mixin, key) {
        mixins[key] = bindMixin(mixin);
      });
    }
    return mixins;
  }

  /* -------------------------------------------------------------------------------------------- *\
  |*                                        Action Stack                                          *|
  \* -------------------------------------------------------------------------------------------- */

  /* eslint-disable-next-line no-mixed-operators */
  var actionStack = {};
  function getActionStack(instanceKey) {
    var key = persistActionStack === true ? '__persistent__' : instanceKey;
    actionStack[key] = actionStack[key] || new _ActionStack["default"]();
    return actionStack[key];
  }
  function clearActionStack() {
    return _clearActionStack.apply(this, arguments);
  }
  /* -------------------------------------------------------------------------------------------- *\
  |*                                           Wrapper                                            *|
  \* -------------------------------------------------------------------------------------------- */
  /* eslint-disable-next-line react/no-multi-comp */
  function _clearActionStack() {
    _clearActionStack = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var keys,
        store,
        _args3 = arguments;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            keys = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : actionStack.keys;
            store = (0, _Runtime3["default"])('store');
            actionStack = (0, _pickBy2["default"])(actionStack, /*#__PURE__*/function () {
              var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(instance, key) {
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) switch (_context2.prev = _context2.next) {
                    case 0:
                      if (!(0, _includes2["default"])(keys, key)) {
                        _context2.next = 6;
                        break;
                      }
                      _context2.next = 3;
                      return instance.abort();
                    case 3:
                      store._dispatch({
                        type: '@@CLEAR_ACTION',
                        payload: key
                      });
                      _context2.next = 7;
                      break;
                    case 6:
                      return _context2.abrupt("return", true);
                    case 7:
                    case "end":
                      return _context2.stop();
                  }
                }, _callee2);
              }));
              return function (_x, _x2) {
                return _ref4.apply(this, arguments);
              };
            }());
          case 3:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return _clearActionStack.apply(this, arguments);
  }
  var contextWrapper = function contextWrapper(component) {
    var _class;
    return _class = /*#__PURE__*/function (_React$Component) {
      (0, _inherits2["default"])(Wrapper, _React$Component);
      var _super = _createSuper(Wrapper);
      function Wrapper() {
        var _this;
        (0, _classCallCheck2["default"])(this, Wrapper);
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this = _super.call.apply(_super, [this].concat(args));
        (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "instanceKey", "".concat(displayName, "Component").concat((0, _uniqueId2["default"])()));
        return _this;
      }
      (0, _createClass2["default"])(Wrapper, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          instanceKeys.push(this.instanceKey);
        }
      }, {
        key: "render",
        value: function render() {
          var ownProps = this.props;
          var instanceKey = this.instanceKey;
          var contextToProps = aggregateStaticWithMixins('contextToProps');
          if (!(0, _isEmpty2["default"])(contextToProps) || Pure.propsToContext) {
            return /*#__PURE__*/_react["default"].createElement(_Context["default"].Consumer, null, function (context) {
              prevContext = context;
              var contextProps = resolveStaticWithMixins('contextToProps', {
                context: context,
                ownProps: ownProps
              });
              updateComposedProps(contextProps);
              if (!(0, _isEmpty2["default"])(contextProps)) {
                return /*#__PURE__*/_react["default"].createElement(component, _objectSpread(_objectSpread(_objectSpread({}, contextProps), ownProps), {}, {
                  instanceKey: instanceKey
                }));
              }
              return /*#__PURE__*/_react["default"].createElement(component, _objectSpread(_objectSpread({}, ownProps), {}, {
                instanceKey: instanceKey
              }));
            });
          }
          return /*#__PURE__*/_react["default"].createElement(component, _objectSpread(_objectSpread({}, ownProps), {}, {
            instanceKey: instanceKey
          }));
        }
      }]);
      return Wrapper;
    }(_react["default"].Component), (0, _defineProperty2["default"])(_class, "displayName", "Wrapper(".concat(displayName, ")")), _class;
  };

  /* -------------------------------------------------------------------------------------------- *\
  |*                                     CSS Helpers Vars                                         *|
  \* -------------------------------------------------------------------------------------------- */

  var defaultClassName = Pure.className || false;
  var previousClassName = false;
  var uniqClassName = false;
  function mapSelectors(selectors) {
    var applyWildcard = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var specialChars = ['*', '&', ':', '@'];
    var mappedSelectors = {};
    (0, _each2["default"])(selectors, function (selector, key) {
      var _native = !!(0, _includes2["default"])(specialChars, key[0]);
      var newKey = !_native ? "&".concat(key) : key;
      if ((0, _isPlainObject2["default"])(selector) && !_native) {
        mappedSelectors[newKey] = mapSelectors(selector);
      } else {
        mappedSelectors[key] = selector;
      }
    });
    return mappedSelectors;
  }
  function mapNestedStyle(stylesheet) {
    (0, _each2["default"])(stylesheet, function (item, selectorKey) {
      var selectors = item._definition;
      stylesheet[selectorKey]._definition = mapSelectors(selectors, true);
    });
    return stylesheet;
  }
  function getCssClasses(props, state) {
    if ((0, _isFunction2["default"])(Pure.css) || uniqClassName === false) {
      var componentStyle = (0, _resolve["default"])(Pure.css, props, state);
      if (componentStyle) {
        var className = Pure.name || 'Component';
        var stylesheet = _aphrodite.StyleSheet.create((0, _defineProperty2["default"])({}, className, componentStyle));
        var styleWithNesting = mapNestedStyle(stylesheet);
        if (uniqClassName) previousClassName = uniqClassName;
        uniqClassName = (0, _aphrodite.css)(styleWithNesting[className]);
        return [defaultClassName, uniqClassName];
      }
      return [defaultClassName];
    }
    return [defaultClassName, uniqClassName];
  }

  /* -------------------------------------------------------------------------------------------- *\
  |*                                          Helpers                                             *|
  \* -------------------------------------------------------------------------------------------- */

  function omitProps(props) {
    var omitted = Pure.omitProps || ['staticContext'];
    return (0, _omit2["default"])(props, omitted);
  }
  function getSelect(state) {
    return function helper() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      return _select["default"].apply(void 0, [state].concat(args));
    };
  }

  /* -------------------------------------------------------------------------------------------- *\
  |*                                      Component Wrapper                                       *|
  \* -------------------------------------------------------------------------------------------- */

  /* eslint-disable-next-line react/no-multi-comp */
  var PureReflection = /*#__PURE__*/function (_React$Component2) {
    (0, _inherits2["default"])(PureReflection, _React$Component2);
    var _super2 = _createSuper(PureReflection);
    function PureReflection() {
      var _this2;
      (0, _classCallCheck2["default"])(this, PureReflection);
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      _this2 = _super2.call.apply(_super2, [this].concat(args));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this2), "state", {
        initialized: false
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this2), "getClassNames", function (currentClassNames) {
        /* eslint-disable react/prop-types */
        var current = currentClassNames ? currentClassNames.split(' ') : false;
        var currentClass = current ? (0, _reject2["default"])(current, function (i) {
          return i === previousClassName;
        }) : false;
        var computedClass = getCssClasses(_this2.fullProps, _this2.state) || false;
        var uniq = (0, _uniq2["default"])([].concat(currentClass, computedClass));
        return (0, _classnames["default"])((0, _compact2["default"])(uniq));
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this2), "componentDidUpdate", function () {
        _this2.mapCssClasses();
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this2), "componentDidMount", function () {
        _this2.mapCssClasses();
      });
      return _this2;
    }
    (0, _createClass2["default"])(PureReflection, [{
      key: "mapCssClasses",
      value: function mapCssClasses() {
        /* eslint-disable react/no-find-dom-node */
        if (Pure.className || Pure.css) {
          var className = this.fullProps.className;
          var cssClasses = getCssClasses(this.fullProps, this.state);
          var fiber = (0, _get2["default"])(componentInstance, '_reactInternalFiber');
          var sibling = (0, _get2["default"])(fiber, 'child.sibling');
          var node = _reactDom["default"].findDOMNode(fiber.stateNode);
          if (node && (className || cssClasses)) {
            if (sibling) {
              var parent = node ? node.parentNode : false;
              if (parent) {
                this.classNames = this.getClassNames(parent.className);
                parent.className = this.classNames;
              }
            } else {
              this.classNames = this.getClassNames(node.className);
              node.className = this.classNames;
            }
          }
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function () {
        var _componentWillUnmount = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
          var instanceKey;
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                if (!(!persistActionStack === true)) {
                  _context.next = 4;
                  break;
                }
                instanceKey = this.props.instanceKey;
                _context.next = 4;
                return clearActionStack([instanceKey]);
              case 4:
              case "end":
                return _context.stop();
            }
          }, _callee, this);
        }));
        function componentWillUnmount() {
          return _componentWillUnmount.apply(this, arguments);
        }
        return componentWillUnmount;
      }()
    }, {
      key: "computeContext",
      value: function computeContext(ownProps) {
        var _Runtime = (0, _Runtime3["default"])('store'),
          getState = _Runtime.getState;
        var state = getState();
        var select = getSelect(state);
        var mixins = getMixins();
        return resolveStaticWithMixins('propsToContext', {
          ownProps: ownProps,
          mixins: mixins,
          select: select
        });
      }
    }, {
      key: "renderComponent",
      value: function renderComponent() {
        var ownProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var ownClassNames = this.classNames || String();
        this.fullProps = _objectSpread(_objectSpread(_objectSpread({}, ownProps), this.props), {}, {
          ownClassNames: ownClassNames
        });
        return /*#__PURE__*/_react["default"].createElement(Pure, _objectSpread(_objectSpread({}, this.fullProps), {}, {
          ref: function ref(reference) {
            componentInstance = reference || componentInstance;
          }
        }));
      }
    }, {
      key: "render",
      value: function render() {
        var ownProps = omitProps(this.props);
        if (Pure.propsToContext) {
          var propsToContext = this.computeContext(ownProps);
          if (propsToContext) {
            updateComposedProps(_objectSpread(_objectSpread({}, prevContext), propsToContext));
            return /*#__PURE__*/_react["default"].createElement(_Context["default"].Provider, {
              value: _objectSpread(_objectSpread({}, prevContext), propsToContext)
            }, this.renderComponent(ownProps));
          }
        }
        return this.renderComponent(ownProps);
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function getDerivedStateFromProps(props, state) {
        prevProps = props;
        return state;
      }
    }]);
    return PureReflection;
  }(_react["default"].Component);
  /* -------------------------------------------------------------------------------------------- *\
  |*                                           Redux                                              *|
  \* -------------------------------------------------------------------------------------------- */
  (0, _defineProperty2["default"])(PureReflection, "displayName", "Component(".concat(displayName, ")"));
  // eslint-disable-next-line react/forbid-foreign-prop-types
  (0, _defineProperty2["default"])(PureReflection, "propTypes", Pure.propTypes);
  (0, _defineProperty2["default"])(PureReflection, "defaultProps", Pure.defaultProps);
  (0, _defineProperty2["default"])(PureReflection, "contextTypes", {
    store: _propTypes["default"].shape({
      getState: _propTypes["default"].func.isRequired,
      subscribe: _propTypes["default"].func.isRequired
    }),
    history: _propTypes["default"].shape({
      listen: _propTypes["default"].func.isRequired,
      location: _propTypes["default"].object.isRequired,
      push: _propTypes["default"].func.isRequired
    })
  });
  var bindedActionCreators = {};
  function createActions(actionConstructors, _ref) {
    var instanceKey = _ref.instanceKey,
      props = (0, _objectWithoutProperties2["default"])(_ref, _excluded);
    return (0, _mapValues2["default"])(actionConstructors, function (actionConstructor, key) {
      if ((0, _isFunction2["default"])(actionConstructor)) {
        return function () {
          var _Runtime2 = (0, _Runtime3["default"])('store'),
            getState = _Runtime2.getState,
            dispatch = _Runtime2.dispatch;
          var instance = actionConstructor({
            origin: instanceKey,
            tracked: true,
            props: props
          });
          var id = instance.run.apply(instance, arguments)(dispatch, getState);
          var actions = getActionStack(instanceKey);
          actions.push({
            id: id,
            key: key,
            instance: instance
          });
          return id;
        };
      }
    });
  }
  function bindActionCreators(_ref2) {
    var state = _ref2.state,
      actions = _ref2.actions,
      nextProps = _ref2.nextProps,
      select = _ref2.select;
    var actionCreators = Pure.actionCreators || {};
    var actionConstructors = (0, _resolve["default"])(actionCreators, {
      nextProps: nextProps
    }) || {};
    var actionsMap = createActions(actionConstructors, nextProps);
    updateComposedProps(actionsMap);
    return actionsMap;
  }
  function wrapStateToProps() {
    return function (state, _ref3) {
      var instanceKey = _ref3.instanceKey,
        props = (0, _objectWithoutProperties2["default"])(_ref3, _excluded2);
      var select = getSelect(state);
      var ownProps = omitProps(props);
      var mixins = getMixins();
      var actions = getActionStack(instanceKey);
      var stateProps = resolveStaticWithMixins('stateToProps', {
        state: state,
        actions: actions,
        ownProps: ownProps,
        mixins: mixins,
        select: select
      });
      updateComposedProps(stateProps);
      var ownActions = (0, _isEmpty2["default"])(actions) ? {} : actions.own();
      var nextProps = _objectSpread(_objectSpread(_objectSpread({}, ownProps), stateProps), {}, {
        actions: actions,
        instanceKey: instanceKey,
        ownActions: ownActions
      });
      bindedActionCreators = bindActionCreators({
        state: state,
        actions: actions,
        nextProps: nextProps,
        select: select
      });
      return _objectSpread({
        actions: actions,
        instanceKey: instanceKey,
        ownActions: ownActions
      }, stateProps);
    };
  }
  function wrapDispatchToProps() {
    var dispatchToProps = Pure.dispatchToProps || {};
    if ((0, _isFunction2["default"])(dispatchToProps)) {
      return function (dispatch, ownProps) {
        var actionCreators = bindedActionCreators;
        var plainActions = (0, _resolve["default"])(dispatchToProps, {
          dispatch: dispatch,
          ownProps: ownProps,
          actionCreators: actionCreators
        }) || {};
        var actions = _objectSpread(_objectSpread({}, actionCreators), plainActions);
        updateComposedProps(actions);
        return actions;
      };
    }
    return function (dispatch) {
      var actions = _objectSpread(_objectSpread({}, bindedActionCreators), dispatchToProps);
      updateComposedProps(actions);
      return actions;
    };
  }
  function mergeConnectProps() {
    return Pure.mergeConnectProps || null;
  }
  function getConnectOptions() {
    return Pure.connectOptions || {};
  }
  var mapStateToProps = wrapStateToProps();
  var mapDispatchToProps = wrapDispatchToProps();
  var mergeProps = mergeConnectProps();
  var options = getConnectOptions();

  /* -------------------------------------------------------------------------------------------- *\
  |*                                      Compose and Render                                      *|
  \* -------------------------------------------------------------------------------------------- */

  var strictCompare = function strictCompare(next, prev) {
    return prev === next;
  };
  var shallowCompare = function shallowCompare(next, prev) {
    return (0, _isEqual2["default"])(next, prev);
  };
  var reduxConnect = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps, mergeProps, _objectSpread({
    areStatesEqual: function areStatesEqual(next, prev) {
      return strictCompare(next, prev);
    },
    areStatePropsEqual: function areStatePropsEqual(next, prev) {
      return shallowCompare(next, prev);
    },
    areMergedPropsEqual: function areMergedPropsEqual(next, prev) {
      return shallowCompare(next, prev);
    }
  }, options));
  var component = (0, _redux.compose)(contextWrapper, reduxConnect)(PureReflection);

  /* -------------------------------------------------------------------------------------------- *\
  |*                                       Static helpers                                         *|
  \* -------------------------------------------------------------------------------------------- */

  component.clearActionStack = function () {
    clearActionStack();
  };
  return component;
}