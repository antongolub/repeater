# repeater
> Helper for creating auto-calling functions

[![Build Status](https://app.travis-ci.com/antongolub/repeater.svg?branch=master)](https://app.travis-ci.com/antongolub/repeater)
[![npm (tag)](https://img.shields.io/npm/v/@antongolub/repeater/latest.svg)](https://www.npmjs.com/package/@antongolub/repeater)
[![Maintainability](https://api.codeclimate.com/v1/badges/c63a84dc4cda2e67e2c3/maintainability)](https://codeclimate.com/github/antongolub/repeater/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/c63a84dc4cda2e67e2c3/test_coverage)](https://codeclimate.com/github/antongolub/repeater/test_coverage)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

## Motivation
The wheel was invented a long time ago: [repeat](https://www.npmjs.com/package/repeat).
What's the diff?
* Repeater stores the last call params and uses them for next invocations.
* Inherits target's iface.
* Allows to combine `manual` and `automated` calls.

## Usage
```javascript
    import repeater from '@antongolub/repeater'
    
    const target = step => { this.i += step }
    const context = { i: 0 }
    const delay = 1000
    const rep = repeater(target, delay, context)
    
    rep(2)
    
    // Imagine, 5 seconds later new 'manual' call occurs
    setTimeout(() => rep(1), 5000)

    // ~10 seconds after start: 
    setTimeout(() => console.log(context.i), 10000) // 15
```

Repeater is just a wrapper around the target function. It exposes several util props:

| Prop      | Description                             |
|-----------|-----------------------------------------|
| `delay`   | interval in ms                          |
| `timeout` | TimeoutID                               |
| `target`  | ref for original target function        |
| `context` | optional scope                          |
| `limit`   | optional remainder of calls             |
| `args`    | arguments of the last invocation        |

So, anytime you're let to interrupt the repetitive call by clearing timeout:
```javascript
    clearTimeout(rep.timeout)
``` 

### Parametrization

```javascript
    const rep1 = repeater(target, delay, context, limit)
    const rep2 = repeater({target, delay, context, limit})
```

## License
[MIT](./LICENSE)
