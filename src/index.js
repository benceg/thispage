/**
 * @param {Array} classNames - The pageNode's classNames.
 * @param {string} test - The className to check against the pageNode's classNames.
 * @returns {boolean}
 */
function hasClass(classNames = [], test) {
  if (!Array.isArray(classNames) || typeof test !== 'string') return false
  return (classNames.filter(i => (i === test)).length > 0)
}

/**
 * @param {string} test - The specified selector.
 * @returns {boolean}
 */
function hasElement(test) {
  if (typeof test !== 'string') return false
  return (document.querySelectorAll(test).length > 0)
}

/**
 * @class Page
 * @param {string} - A DOM string signifying the pageNode against which to check CSS classes.
 */
export default class ThisPage {

  /**
   * @param {string} pageNode - the DOM node to test is and isNot against.
   */
  constructor(pageNode = 'body') {
    this.reset(pageNode)
  }

  /**
   * @param {string} cssClass - A class against which to test the pageNode's class.
   * @returns {ThisPage}
   */
  is(cssClass) {
    this.isSelected = hasClass(this.cssClasses, cssClass)
    return this
  }

  /**
   * @param {string} cssClass - A class against which to test the pageNode's class.
   * @returns {ThisPage}
   */
  isNot(cssClass) {
    this.isSelected = !hasClass(this.cssClasses, cssClass)
    return this
  }

  /**
   * @param {string} selector - A CSS selector to pass to querySelectorAll to test for matches.
   * @returns {ThisPage}
   */
  has(selector) {
    this.isSelected = hasElement(selector)
    return this
  }

  /**
   * @param {string} selector - A CSS selector to pass to querySelectorAll to test for matches.
   * @returns {ThisPage}
   */
  hasNot(selector) {
    this.isSelected = !hasElement(selector)
    return this
  }

  /**
   * @param {Function} callback - A callback function to execute.
   * @returns {ThisPage}
   */
  run(callback) {
    if (this.isSelected === true) document.addEventListener('DOMContentLoaded', callback)
    return this
  }

  /**
   * @param {Function} pageNode - A callback function to execute.
   * @returns {ThisPage}
   */
  reset(pageNode) {
    this.pageNode = pageNode || this.pageNode || 'body'
    this.isSelected = true
    this.cssClasses = document.querySelector(this.pageNode).className.split(' ')
    return this
  }

}
