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

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  /**
   * @param {Array} classNames - The pageNode's classNames.
   * @param {string} test - The className to check against the pageNode's classNames.
   * @returns {boolean}
   */
  function hasClass() {
    var classNames = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
    var test = arguments[1];

    if (!Array.isArray(classNames) || typeof test !== 'string') return false;
    return classNames.filter(function (i) {
      return i === test;
    }).length > 0;
  }

  /**
   * @param {string} test - The specified selector.
   * @returns {boolean}
   */
  function hasElement(test) {
    if (typeof test !== 'string') return false;
    return document.querySelectorAll(test).length > 0;
  }

  /**
   * @class Page
   * @param {string} - A DOM string signifying the pageNode against which to check CSS classes.
   */

  var ThisPage = function () {

    /**
     * @param {string} pageNode - the DOM node to test is and isNot against.
     */

    function ThisPage() {
      var pageNode = arguments.length <= 0 || arguments[0] === undefined ? 'body' : arguments[0];

      _classCallCheck(this, ThisPage);

      this.reset(pageNode);
    }

    /**
     * @param {string} cssClass - A class against which to test the pageNode's class.
     * @returns {ThisPage}
     */


    _createClass(ThisPage, [{
      key: 'is',
      value: function is(cssClass) {
        this.isSelected = hasClass(this.cssClasses, cssClass);
        return this;
      }
    }, {
      key: 'isNot',
      value: function isNot(cssClass) {
        this.isSelected = !hasClass(this.cssClasses, cssClass);
        return this;
      }
    }, {
      key: 'has',
      value: function has(selector) {
        this.isSelected = hasElement(selector);
        return this;
      }
    }, {
      key: 'hasNot',
      value: function hasNot(selector) {
        this.isSelected = !hasElement(selector);
        return this;
      }
    }, {
      key: 'run',
      value: function run(callback) {
        if (this.isSelected === true) document.addEventListener('DOMContentLoaded', callback);
        return this;
      }
    }, {
      key: 'reset',
      value: function reset(pageNode) {
        this.pageNode = pageNode || this.pageNode || 'body';
        this.isSelected = true;
        this.cssClasses = document.querySelector(this.pageNode).className.split(' ');
        return this;
      }
    }]);

    return ThisPage;
  }();

  exports.default = ThisPage;
});
