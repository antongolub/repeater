# repeater
Helper for creating repetitive functions.

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![buildStatus](https://img.shields.io/travis/antongolub/repeater.svg?maxAge=3600&branch=master)](https://travis-ci.org/antongolub/repeater)
[![Coveralls](https://img.shields.io/coveralls/antongolub/repeater.svg?maxAge=3600)](https://coveralls.io/github/antongolub/repeater)
[![dependencyStatus](https://img.shields.io/david/antongolub/repeater.svg?maxAge=3600)](https://david-dm.org/antongolub/repeater)
[![devDependencyStatus](https://img.shields.io/david/dev/antongolub/repeater.svg?maxAge=3600)](https://david-dm.org/antongolub/repeater)

##### Usage
```javascript
    import repeater from '@antongolub/repeater'
    
    const context = {
      i: 0
    }
    const delay = 1000
    function target (step) {
      this.i += step
    }

    const rep = repeater(target, delay, context)
    
    rep(2)
    
    // ~10 seconds later
    console.log(context.i) // 20
```

Repeater is just a wrapper around the target function. It exposes several util props:
* delay — interval in ms
* timeout — TimeoutID
* target — ref for original target function
* context — optional scope
* args — arguments for the last invocation

So, anytime you're let to interrupt the repetitive call by clearing timeout:
```javascript
    clearTimeout(rep.timeout)
``` 

