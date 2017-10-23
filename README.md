# Smithers
Promise-based Node Jenkins API

[![Build Status](https://img.shields.io/travis/clementallen/smithers.svg?style=flat-square)](https://travis-ci.org/clementallen/smithers)
[![Coverage Status](https://img.shields.io/coveralls/clementallen/smithers.svg?style=flat-square)](https://coveralls.io/github/clementallen/smithers?branch=master)
[![Code Climate](https://img.shields.io/codeclimate/github/clementallen/smithers.svg?style=flat-square)](https://codeclimate.com/github/clementallen/smithers)
[![dependencies Status](https://img.shields.io/david/clementallen/smithers.svg?style=flat-square)](https://david-dm.org/clementallen/smithers)
[![devDependencies Status](https://img.shields.io/david/dev/clementallen/smithers.svg?style=flat-square)](https://david-dm.org/clementallen/smithers?type=dev)
[![Black Duck Security Risk](https://copilot.blackducksoftware.com/github/repos/clementallen/smithers/branches/master/badge-risk.svg)](https://copilot.blackducksoftware.com/github/repos/clementallen/smithers/branches/master)

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

// Username & password auth (config.auth required)
const config = {
    auth: {
        username: 'username',
        password: 'password'
    }
};
const smithers = new Smithers('http://jenkinsurl.com', config);

// Username & token auth (config.auth required)
const config = {
    auth: {
        username: 'username',
        password: 'token'
    }
};
const smithers = new Smithers('http://jenkinsurl.com', config);
```

### Configuration
Configuration can be either passed when Smithers is instantiated or when a method is called.  The configuration is forwarded to the `axios` calls so look at the [axios documentation](https://github.com/mzabriskie/axios#request-config) to see the different options.


### Methods

#### `smithers.info([config])`
Retrieves all data from the `/api/json` endpoint.
```javascript
smithers.info().then((response) => {
    console.log(response);
}).catch((error) => {
    console.log(error);
});
```

#### `smithers.job(name, [config])`
Retrieves all data from a specific job
```javascript
smithers.job(name).then((response) => {
    console.log(response);
}).catch((error) => {
    console.log(error);
});
```

#### `smithers.lastBuild(name, [config])`
Retrieves all data from the latest build of a specifc job
```javascript
smithers.lastBuild(name).then((response) => {
    console.log(response);
}).catch((error) => {
    console.log(error);
});
```

#### `smithers.lastSuccessfulBuild(name, [config])`
Retrieves all data from the latest successful build of a specifc job
```javascript
smithers.lastSuccessfulBuild(name).then((response) => {
    console.log(response);
}).catch((error) => {
    console.log(error);
});
```

#### `smithers.lastStableBuild(name, [config])`
Retrieves all data from the latest stable build of a specifc job
```javascript
smithers.lastStableBuild(name).then((response) => {
    console.log(response);
}).catch((error) => {
    console.log(error);
});
```

#### `smithers.lastUnsuccessfulBuild(name, [config])`
Retrieves all data from the latest unsuccessful build of a specifc job
```javascript
smithers.lastUnsuccessfulBuild(name).then((response) => {
    console.log(response);
}).catch((error) => {
    console.log(error);
});
```

#### `smithers.specificBuild(name, buildNumber, [config])`
Retrieves all data for a specific build of a specifc job
```javascript
smithers.specificBuild(name, buildNumber).then((response) => {
    console.log(response);
}).catch((error) => {
    console.log(error);
});
```

#### `smithers.overallLoad([config])`
Retrieves statistics of the entire system (busy executors, queue length, etc...)
```javascript
smithers.overallLoad().then((response) => {
    console.log(response);
}).catch((error) => {
    console.log(error);
});
```

#### `smithers.queue([config])`
Retrieves all data about the current queue
```javascript
smithers.queue().then((response) => {
    console.log(response);
}).catch((error) => {
    console.log(error);
});
```
