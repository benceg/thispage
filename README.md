# this-page

[![npm version](https://badge.fury.io/js/this-page.svg)](https://www.npmjs.com/package/this-page)

## The tiny, flexible, chainable switchboard library for server-rendered pages.

Dependency-free and built with ES2015. Made for browser use only.

---

`this-page` is ideal for CMS-driven websites. It is declarative and chainable and allows you to determine, in a very granular way, what JavaScript to run on any given page of your site.

It does so by checking CSS classes assigned to an element of your choice, and/or by looking up _any_ elements that may or may not be in the page's DOM. You can chain the functions `is`, `isNot`, `has`, `hasNot`, `run` and `reset` indefinitely to produce a clean, easy to reason about switchboard for calling JavaScript functions throughout your site.

When chained with the `run` command, ThisPage will add a listener to the `DOMContentLoaded` event and run any callback(s) you pass to it. Think of it as `$(document).ready()` on steroids. When not chained with `run`, it will tell you whether the current page matches the criteria given to it.

```js
import ThisPage from 'this-page'

const thisPage = new ThisPage() // default: check <body> classes
const thisDocument = new ThisPage('html') // check <html> classes
```

#### Use it as a switchboard, to run functions on certain pages

```js
thisPage.is('single').run(...)
thisPage.is('single').is('contact').run(...)
thisPage.is('single').is('contact').isNot('order-form').run(...)
thisPage.is('entry-form').has('input[type="date"]').run(...)
```

#### Use it to determine where you are, or what's on the page

```js
thisPage.is('single') // true or false
thisPage.has('input[type="text"]') // true or false
```

---

## Installation

1. Install from npm - `npm install this-page --save`.
2. Use with [Webpack](https://webpack.github.io/) or the module loader of your choice.

---

## API

### `new ThisPage(pageNode: string)`

- Class constructor.
- Sets the node whose classes are examined during `is` and `isNot` calls.
- All `has` and `hasNot` calls are determined from inside the pageNode, _not_ the document element by default.
- Accepts only one argument, which defaults to `body`.
- Calls the `reset` method immediately.

#### Example

```html
<body class="single"></body>
```

```js
var thisPage = new ThisPage()

thisPage.is('single') // true
```

---

### `is(cssClass: string)`

- Accepts a single className.
- Determines whether the pageNode contains the specified className.
- Returns `true` if the class is found, and `false` if not.
- Can be chained with `run` to execute a function.

#### Example

```html
<body class="single contact"></body>
```

```js
thisPage.is('single') // true
thisPage.is('single').is('contact') // true, chained
thisPage.is('single').run(callback) // calls the `callback` function on DOMContentLoaded
```

---

### `isNot(cssClass: string)`

- Accepts a single className.
- Determines whether the pageNode does not have the specified className.
- Returns `true` if the class is not found, and `false` if it is.
- Can be chained with `run` to execute a function.

#### Example

```html
<body class="single"></body>
```

```js
thisPage.isNot('single') // false
thisPage.isNot('contact') // true
thisPage.is('single').isNot('contact') // true
thisPage.is('single').run(callback) // calls the `callback` function on DOMContentLoaded
```

---

### `has(selector: string)`

- Accepts a single selector string.
- Selector is searched for inside current pageNode DOM tree.
- Returns `true` if the selector is found, and `false` if not.
- Can be chained with `run` to execute a function.

#### Example

```html
<body class="single contact">
  <div id="this-div"></div>
</body>
```

```js
thisPage.has('#this-div') // true
thisPage.has('#this-div').run(callback) // calls the `callback` function on DOMContentLoaded
```

---

### `hasNot(selector: string)`

- Accepts a single selector string.
- Selector is searched for inside current pageNode DOM tree.
- Returns `true` if the selector is not found, and `false` if it is.
- Can be chained with `run` to execute a function.

#### Example

```html
<body class="single contact">
  <div id="this-div"></div>
</body>
```

```js
thisPage.hasNot('#this-div') // false
thisPage.hasNot('input[type="text"]').run(callback) // calls the `callback` function on DOMContentLoaded
```

---

### `run(callback: Function)`

- Accepts a function as its only argument.
- Calls the function inside a DOMContentLoaded event listener to ensure document is ready.
- Calls the function if the conditions specified by the chain are met.
- Is also chainable.

#### Example

```js
function func() { ... }

thisPage.run(func) // calls `func` on all pages
thisPage.is('single').has('input[type="text"]').run(func) // calls `func`
```

---

### `reset(pageNode: string)`

- Accepts a single optional pageNode argument.
- Changes the pageNode for all future chained methods, if pageNode is specified.
- Resets the 'selected' status of the page previously attained via `is`, `isNot`, `has` and `hasNot`.
- Not generally recommended as a chained method except in the simplest circumstances due to its capability to make code difficult to reason about. Use multiple `thisPage` calls instead.
- Should only be used where multiple object instantiation is undesirable.

#### Example

```js
thisPage.is('single').run(func).reset('html').is('touch-enabled').run(func2)
```
