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

// Basic setup - no authentication (config optional)
const smithers = new Smithers('http://jenkinsurl.com', config);

// Username & password auth (config optional)
const smithers = new Smithers('http://username:password@jenkinsurl.com', config);

// Username & token auth (config optional)
const smithers = new Smithers('http://username:token@jenkinsurl.com', config);
```

### Configuration
Configuration can be either passed when Smithers is instantiated or when a method is called.  The configuration is forwaded to the `axios` calls so look at the [axios documentation](https://github.com/mzabriskie/axios#request-config) to see the different options.


### Methods

#### `smithers.info([config])`
The info method retrieves all data from the `/api/json` endpoint.
```javascript
smithers.info().then((response) => {
    console.log(response);
}).catch((error) => {
    console.log(error);
});
```

#### `smithers.jobInfo(name, [config])`
The jobInfo method retrieves all data from a specific job
```javascript
smithers.jobInfo(name).then((response) => {
    console.log(response);
}).catch((error) => {
    console.log(error);
});
```

#### `smithers.latestBuildInfo(name, [config])`
The latestBuildInfo method retrieves all data from the latest build of a specifc job
```javascript
smithers.latestBuildInfo(name).then((response) => {
    console.log(response);
}).catch((error) => {
    console.log(error);
});
```
