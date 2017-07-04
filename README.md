# Smithers

Promise-based Node Jenkins API

[![npm version](https://badge.fury.io/js/smithers.svg)](https://badge.fury.io/js/smithers)
[![Build Status](https://travis-ci.org/clementallen/smithers.svg?branch=master)](https://travis-ci.org/clementallen/smithers)
[![Coverage Status](https://coveralls.io/repos/github/clementallen/smithers/badge.svg?branch=master)](https://coveralls.io/github/clementallen/smithers?branch=master)
[![dependencies Status](https://david-dm.org/clementallen/smithers/status.svg)](https://david-dm.org/clementallen/smithers)
[![devDependencies Status](https://david-dm.org/clementallen/smithers/dev-status.svg)](https://david-dm.org/clementallen/smithers?type=dev)
[![Black Duck Security Risk](https://copilot.blackducksoftware.com/github/repos/clementallen/smithers/branches/master/badge-risk.svg)](https://copilot.blackducksoftware.com/github/repos/clementallen/smithers/branches/master)
[![Greenkeeper badge](https://badges.greenkeeper.io/clementallen/smithers.svg)](https://greenkeeper.io/)

## Install

Using yarn:
```bash
$ yarn add smithers
```

Using npm:
```bash
$ npm install --save smithers
```

## Usage

### Setup

#### Basic setup - no authentication (config optional)
``` javascript
import Smithers from 'smithers';

const smithers = new Smithers('http://jenkinsurl.com', config);
```

#### Username & password auth (config.auth required)
``` javascript
import Smithers from 'smithers';

const smithers = new Smithers('http://jenkinsurl.com', {
    auth: {
        username: 'username',
        password: 'password'
    }
});
```

#### Username & token auth (config.auth required)
```javascript
import Smithers from 'smithers';

const smithers = new Smithers('http://jenkinsurl.com', {
    auth: {
        username: 'username',
        password: 'token'
    }
);
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

#### `smithers.build(name, [config])`
Triggers a build for the specific job
```javascript
smithers.build(name).then((response) => {
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

#### `smithers.configXML(name, [config])`
Retrieves the XML config of a specifc job
```javascript
smithers.configXML(name).then((response) => {
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
