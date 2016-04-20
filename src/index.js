/**
 * @param {Array} classNames - The pageNode's classNames.
 * @param {string} test - The className to check against the pageNode's classNames.
 * @returns {boolean}
 */
function hasClass(classNames = [], test) {
  return (!Array.isArray(classNames) || typeof test !== 'string') ? false : (classNames.filter(i => (i === test)).length > 0)
}

/**
 * @param {string} test - The specified selector.
 * @returns {boolean}
 */
function hasElement(test) {
  return (typeof test !== 'string') ? false : (document.querySelectorAll(test).length > 0)
}

/**
 * @class Page
 * @param {string} - A DOM string signifying the pageNode against which to check CSS classes.
 */
const thisPageObj = {

  isSelected: true,

  /**
   * @param {string} cssClass - A class against which to test the pageNode's class.
   * @returns {ThisPage}
   */
  is: function(cssClass) {
    this.isSelected = (this.isSelected === false) ? false : hasClass(this.cssClasses, cssClass)
    return this
  },

  /**
   * @param {string} cssClass - A class against which to test the pageNode's class.
   * @returns {ThisPage}
   */
  isNot: function(cssClass) {
    this.isSelected = (this.isSelected === false) ? false : !hasClass(this.cssClasses, cssClass)
    return this
  },

  /**
   * @param {string} selector - A CSS selector to pass to querySelectorAll to test for matches.
   * @returns {ThisPage}
   */
  has: function(selector) {
    this.isSelected = (this.isSelected === false) ? false : hasElement(selector)
    return this
  },

  /**
   * @param {string} selector - A CSS selector to pass to querySelectorAll to test for matches.
   * @returns {ThisPage}
   */
  hasNot: function(selector) {
    this.isSelected = (this.isSelected === false) ? false : !hasElement(selector)
    return this
  },

  /**
   * @param {Function} callback - A callback function to execute.
   * @returns {ThisPage}
   */
  run: function(callback) {
    if (this.isSelected === true) document.addEventListener('DOMContentLoaded', callback)
    return this
  },

  end: function() {
    return this.isSelected
  }

}

export default function thisPage(selector = 'body') {
  const pageNode = document.querySelector(selector)
  const cssClasses = pageNode.className.trim().split(' ')
  return Object.assign({ pageNode, cssClasses }, thisPageObj)
}
