![staple.js logo](staplejs-logo-github.png "staple.js logo")

staple.js
===========================

`staple.js` allows you to easily pin an element to be fixed at a certain height from the top of the viewport.

## Demo

Download [`index.html`][index.html] and, open it in your browser to see `staple.js` in action.

You can read its [`index.html`][index.html] source-code example to know how to activate `staple.js`.

![Demo staple.js](https://cloud.githubusercontent.com/assets/1556583/19682970/75f8a4c0-9a86-11e6-8291-c085786ec6bb.gif)

## Quick Start

`staple.js` is easy to use. Add the script to your page, create a `new Staple()`, and pass in the right configurations.

#### Step 0: Install

[Download the latest release][download].

#### Step 1: Add the `staple.min.js` file

```html
<script src="staple.min.js"></script>
```

#### Step 2: Create your markup

```html
<div id="staple-wrapper">
  <div id="staple">
    <!-- Everything in here gets stapled! -->
  </div>
</div>
```

#### Step 3: Create a new Staple

```javascript
var staple = new Staple({
  offset: 40 // pixels
}).enable();
```

## API

### Staple([_options_])

The `Staple` constructor will setup the new Staple. You can customize the instance by passing the `options` parameter. The example below uses all options and their defaults:

```javascript
var opts = {
  stapleId: "staple",
  wrapperId: "staple-wrapper",
  offset: 0,
  stapledClass: "stapled",
  mobileWidth: 640,
};
var sub = new Staple(opts).enable();
```

### Options

| Option | Description | Defualt |
|--------|-------------|---------|
| `stapleId` | Id of the element to staple | `"staple"` |
| `wrapperId` | Id of an element wrapping the staple | `"staple-wrapper"` |
| `offset` | Pixels between the staple and the top of the viewport | `0` |
| `stapledClass` | The class to give the staple when stapled | `"stapled"` |
| `mobileWidth` | A width below which the staple won't staple. | `640` |

### enable()

Adds the scroll listeners that will staple the element appropriately.

### disable()

Unstaples any staples, and removes the scroll listeners that will staple the element.

[download]: https://github.com/minimill/staple.js/releases/download/v0.1.1/staple.min.js
[index.html]: https://github.com/minimill/staple.js/blob/master/test/index.html
