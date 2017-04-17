# Smithers
Promise-based Node Jenkins API

[![Build Status](https://img.shields.io/travis/clementallen/smithers.svg?style=flat-square)](https://travis-ci.org/clementallen/smithers)
[![Coverage Status](https://img.shields.io/coveralls/clementallen/smithers.svg?style=flat-square)](https://coveralls.io/github/clementallen/smithers?branch=master)
[![Code Climate](https://img.shields.io/codeclimate/github/clementallen/smithers.svg?style=flat-square)](https://codeclimate.com/github/clementallen/smithers)
[![dependencies Status](https://img.shields.io/david/clementallen/smithers.svg?style=flat-square)](https://david-dm.org/clementallen/smithers)
[![devDependencies Status](https://img.shields.io/david/dev/clementallen/smithers.svg?style=flat-square)](https://david-dm.org/clementallen/smithers?type=dev)

## Install

### Yarn
```
yarn add smithers
```

### NPM
```
npm install --save smithers
```

## Usage

### Setup
``` javascript
import Smithers from 'smithers';

// Basic setup - no authentication
const smithers = new Smithers('http://jenkinsurl.com');

// Username & password auth
const smithers = new Smithers('http://username:password@jenkinsurl.com');

// Username & token auth
const smithers = new Smithers('http://username:token@jenkinsurl.com');
```

### `smithers.info()`
The info method retrieves all data from the jenkins `/api/json` endpoint.
```javascript
smithers.info().then((response) => {
    console.log(response);
}).catch((error) => {
    console.log(error);
});
```
