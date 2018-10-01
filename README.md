[![Build Status](https://secure.travis-ci.org/MorganConrad/parse-retry-after.png)](http://travis-ci.org/MorganConrad/parse-retry-after)
[![License](http://img.shields.io/badge/license-MIT-A31F34.svg)](https://github.com/MorganConrad/parse-retry-after)
[![NPM Downloads](http://img.shields.io/npm/dm/parse-retry-after.svg)](https://www.npmjs.org/package/parse-retry-after)
[![Known Vulnerabilities](https://snyk.io/test/github/morganconrad/parse-retry-after/badge.svg)](https://snyk.io/test/github/morganconrad/parse-retry-after)
[![Coverage Status](https://coveralls.io/repos/github/MorganConrad/parse-retry-after/badge.svg)](https://coveralls.io/github/MorganConrad/parse-retry-after)



# parse-retry-after

### Parses an HTTP Retry-After header and returns delay time in seconds.

- If there is no Retry-After header, returns 0
- If there is, returns **seconds** to delay, rounding up, **minimum 1**
- If Retry-After header is not an integer or a Date, (should not happen) throws an Error.

### Usage  (very rough, your code will differ!)

    const parse_retry_after = require('parse-retry-after');  // or import...
    
    fetch(URL, init)
      .then(function(response) {
        // probably want to save response somewhere somehow...
        // check response.status
        if (mightBeARetry) {
           let delaySeconds = parse_retry_after(response);
           if (delaySeconds) {
              //delay and call fetch again...
           }
        }
        else {
          // normal "happy path" code
        }
      })
      

### Todos

 1. Currently uses `module.exports`, should probably use ES6 `export`
 