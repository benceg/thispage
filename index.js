(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.index = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = thisPage;

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  /**
   * @param {Array} classNames - The pageNode's classNames.
   * @param {string} test - The className to check against the pageNode's classNames.
   * @returns {boolean}
   */
  function hasClass() {
    var classNames = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
    var test = arguments[1];

    return !Array.isArray(classNames) || typeof test !== 'string' ? false : classNames.filter(function (i) {
      return i === test;
    }).length > 0;
  }

  /**
   * @param {string} test - The specified selector.
   * @returns {boolean}
   */
  function hasElement(test) {
    return typeof test !== 'string' ? false : document.querySelectorAll(test).length > 0;
  }

  /**
   * @class Page
   * @param {string} - A DOM string signifying the pageNode against which to check CSS classes.
   */
  var thisPageObj = {

    isSelected: true,

    /**
     * @param {string} cssClass - A class against which to test the pageNode's class.
     * @returns {ThisPage}
     */
    is: function is(cssClass) {
      this.isSelected = this.isSelected === false ? false : hasClass(this.cssClasses, cssClass);
      return this;
    },

    /**
     * @param {string} cssClass - A class against which to test the pageNode's class.
     * @returns {ThisPage}
     */
    isNot: function isNot(cssClass) {
      this.isSelected = this.isSelected === false ? false : !hasClass(this.cssClasses, cssClass);
      return this;
    },

    /**
     * @param {string} selector - A CSS selector to pass to querySelectorAll to test for matches.
     * @returns {ThisPage}
     */
    has: function has(selector) {
      this.isSelected = this.isSelected === false ? false : hasElement(selector);
      return this;
    },

    /**
     * @param {string} selector - A CSS selector to pass to querySelectorAll to test for matches.
     * @returns {ThisPage}
     */
    hasNot: function hasNot(selector) {
      this.isSelected = this.isSelected === false ? false : !hasElement(selector);
      return this;
    },

    /**
     * @param {Function} callback - A callback function to execute.
     * @returns {ThisPage}
     */
    run: function run(callback) {
      if (this.isSelected === true) document.addEventListener('DOMContentLoaded', callback);
      return this;
    },

    end: function end() {
      return this.isSelected;
    }

  };

  function thisPage() {
    var selector = arguments.length <= 0 || arguments[0] === undefined ? 'body' : arguments[0];

    var pageNode = document.querySelector(selector);
    var cssClasses = pageNode.className.trim().split(' ');
    return _extends({ pageNode: pageNode, cssClasses: cssClasses }, thisPageObj);
  }
});
