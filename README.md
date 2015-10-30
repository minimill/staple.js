pin.js
===========================

`pin.js` allows you to easily pin an element to be fixed at a certain height from the top of the viewport.

## Quick Start

`pin.js` is easy to use. Add the script to your page, create a `new Pin()`, and pass in the right configurations.

#### Step 0: Install

[Download the latest release][download].

#### Step 1: Add the `pin.min.js` file

```html
<script src="pin.min.js"></script>
```

#### Step 2: Create your markup

```html
<div id="pin-wrapper">
  <div id="pin">
    <!-- Everything in here gets pinned! -->
  </div>
</div>
```

#### Step 3: Create a new Pin

```javascript
var pin = new Pin({
  offset: 40 // pixels
}).enable();
```

## API

### Pin([_options_])

The `Pin` constructor will setup the new Pin. You can customize the instance by passing the `options` parameter. The example below uses all options and their defaults:

```javascript
var opts = {
  pinId: "pin",
  wrapperId: "pin-wrapper",
  offset: 0,
  pinnedClass: "pinned",
  mobileWidth: 640,
};
var sub = new Pin(opts).enable();
```

### Options

| Option | Description | Defualt |
|--------|-------------|---------|
| `pinId` | Id of the element to pin | `"pin"` |
| `wrapperId` | Id of an element wrapping the pin | `"pin-wrapper"` |
| `offset` | Pixels between the pin and the top of the viewport | `0` |
| `pinnedClass` | The class to give the pin when pinned | `"pinned"` |
| `mobileWidth` | A width below which the pin won't pin. | `640` |

### enable()

Adds the scroll listeners that will pin the element appropriately.

### disable()

Unpins any pins, and removes the scroll listeners that will pin the element.

[download]: https://github.com/minimill/pin.js/releases/download/v0.1/pin.min.js