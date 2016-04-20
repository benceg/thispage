# this-page

[![npm version](https://badge.fury.io/js/this-page.svg)](https://www.npmjs.com/package/this-page)

## The tiny, flexible, chainable switchboard library for server-rendered pages.

Tiny (~0.5KB minified & gzipped), dependency-free and built with ES2015. Made for browser use only.

---

> Notice: There have been some breaking API changes since v1.0.0 was released, on April 19th. Please read the documentation through.

---

`this-page` is ideal for CMS-driven websites. It is declarative and chainable and allows you to determine, in a very granular way, what JavaScript to run on any given page of your site.

It does so by checking CSS classes assigned to an element of your choice, and/or by looking up _any_ elements that may or may not be in the page's DOM. You can chain the functions `is`, `isNot`, `has`, `hasNot`, `run` and `reset` indefinitely to produce a clean, easy to reason about switchboard for calling JavaScript functions throughout your site.

When chained with the `run` command, thisPage will add a listener to the `DOMContentLoaded` event and run any callback(s) you pass to it. Think of it as `$(document).ready()` on steroids. When not chained with `run`, it will tell you whether the current page matches the criteria given to it.

```js
import thisPage from 'this-page'
```

#### Use it as a switchboard, to run functions on certain pages

```js
const func = () => {}

thisPage().is('single').run(func)
thisPage().is('single').is('contact').run(func)
thisPage().is('single').is('contact').isNot('order-form').run(func)
thisPage().is('entry-form').has('input[type="date"]').run(func)
```

#### Use it to determine where you are, or what's on the page

```js
thisPage().is('single').end() // true or false
thisPage().has('input[type="text"]').end() // true or false
```

#### Bonus: Identical calls to the same function on the same page will not fire twice. Calling the same function with different arguments will fire for each call.

This is because functions are added to the `DOMContentLoaded` event bus and duplicate calls are automatically discarded.

---

## Installation

1. Install from npm - `npm install this-page --save`.
2. Use with [Webpack](https://webpack.github.io/) or the CommonJS module loader of your choice.

---

## API

### `thisPage(pageNode: string)`

- Sets the node whose classes are examined during `is` and `isNot` calls.
- Accepts a single pageNode argument, which defaults to `'body'`.
- All `has` and `hasNot` calls are determined from inside the pageNode, _not_ the document element by default.

#### Example 1

```html
<body class="single"></body>
```

```js
thisPage().is('single').end() // true
```

#### Example 2

```html
<html class="touch-enabled"></html>
```

```js
thisPage('html').is('touch-enabled').end() // true
```

---

### `end()`

- Outputs the boolean result of the conditions fed to `thisPage()`.
- See above example.

---

### `is(cssClass: string)`

- Accepts a single className.
- Determines whether the pageNode contains the specified className.

#### Example

```html
<body class="single contact"></body>
```

```js
const callback = () => {}

thisPage().is('single').end() // true
thisPage().is('single').is('contact').end() // true
thisPage().is('single').run(callback) // calls the `callback` function on DOMContentLoaded
```

---

### `isNot(cssClass: string)`

- Accepts a single className.
- Determines whether the pageNode does not have the specified className.

#### Example

```html
<body class="single"></body>
```

```js
const callback = () => {}

thisPage().isNot('single').end() // false
thisPage().isNot('contact').end() // true
thisPage().is('single').isNot('contact').end() // true
thisPage().is('single').run(callback) // calls the `callback` function on DOMContentLoaded
```

---

### `has(selector: string)`

- Accepts a single selector string.
- Selector is searched for inside current pageNode DOM tree.

#### Example

```html
<body class="single contact">
  <div id="this-div"></div>
</body>
```

```js
const callback = () => {}

thisPage().has('#this-div').end() // true
thisPage().has('#this-div').run(callback) // calls the `callback` function on DOMContentLoaded if `#this-div` is found
```

---

### `hasNot(selector: string)`

- Accepts a single selector string.
- Selector is searched for inside current pageNode DOM tree.

#### Example

```html
<body class="single contact">
  <div id="this-div"></div>
</body>
```

```js
const callback = () => {}

thisPage().hasNot('#this-div').end() // false
thisPage().hasNot('input[type="text"]').run(callback) // calls the `callback` function on DOMContentLoaded if `<input type="text">` is found
```

---

### `run(callback: Function)`

- Accepts a function as its only argument.
- Calls the function inside a DOMContentLoaded event listener to ensure document is ready.
- Calls the function if the conditions specified by the chain are met.
- Is also chainable.

#### Example

```js
const callback = () => {}

thisPage().run(callback) // calls `func` on all pages
thisPage().is('single').has('input[type="text"]').run(func) // calls `func`
```
