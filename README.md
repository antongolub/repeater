# repeater
Helper for creating repetitive functions

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![buildStatus](https://img.shields.io/travis/antongolub/repeater.svg?maxAge=60000&branch=master)](https://travis-ci.org/antongolub/repeater)
[![Coveralls](https://img.shields.io/coveralls/antongolub/repeater.svg?maxAge=60000)](https://coveralls.io/github/antongolub/repeater)
[![dependencyStatus](https://img.shields.io/david/antongolub/repeater.svg?maxAge=60000)](https://david-dm.org/antongolub/repeater)
[![devDependencyStatus](https://img.shields.io/david/dev/antongolub/repeater.svg?maxAge=60000)](https://david-dm.org/antongolub/repeater)

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

