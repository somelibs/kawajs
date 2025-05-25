"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.css = exports.StyleSheet = void 0;
var _flattenDeep2 = _interopRequireDefault(require("lodash/flattenDeep"));
var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));
var _each2 = _interopRequireDefault(require("lodash/each"));
var _noImportant = require("aphrodite/no-important");
var _Aphrodite$extend = _noImportant.StyleSheet.extend([{
    selectorHandler: function selectorHandler(selector, baseSelector, generateSubtreeStyles) {
      var nestedTags = [];
      var selectors = selector.split(',');
      (0, _each2["default"])(selectors, function (subselector, key) {
        if (selector[0] === '&') {
          var tag = key === 0 ? subselector.slice(1) : subselector;
          var nestedTag = generateSubtreeStyles("".concat(baseSelector, " ").concat(tag).replace(/ +(?= )/g, ''));
          nestedTags.push(nestedTag);
        }
      });
      return (0, _isEmpty2["default"])(nestedTags) ? null : (0, _flattenDeep2["default"])(nestedTags);
    }
  }]),
  StyleSheet = _Aphrodite$extend.StyleSheet,
  css = _Aphrodite$extend.css;
exports.css = css;
exports.StyleSheet = StyleSheet;