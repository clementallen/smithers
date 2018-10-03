# Smithers

Async Jenkins API client for browsers and node

[![npm version](https://badge.fury.io/js/smithers.svg)](https://badge.fury.io/js/smithers)
[![Build Status](https://travis-ci.org/clementallen/smithers.svg?branch=master)](https://travis-ci.org/clementallen/smithers)
[![Coverage Status](https://coveralls.io/repos/github/clementallen/smithers/badge.svg?branch=master)](https://coveralls.io/github/clementallen/smithers?branch=master)
[![dependencies Status](https://david-dm.org/clementallen/smithers/status.svg)](https://david-dm.org/clementallen/smithers)
[![devDependencies Status](https://david-dm.org/clementallen/smithers/dev-status.svg)](https://david-dm.org/clementallen/smithers?type=dev)
[![Black Duck Security Risk](https://copilot.blackducksoftware.com/github/repos/clementallen/smithers/branches/master/badge-risk.svg)](https://copilot.blackducksoftware.com/github/repos/clementallen/smithers/branches/master)
[![Greenkeeper badge](https://badges.greenkeeper.io/clementallen/smithers.svg)](https://greenkeeper.io/)

## Install

```bash
$ npm install --save smithers
```

## Usage

### Setup

#### Basic setup - no authentication (config optional)
```javascript
import Smithers from 'smithers';

const smithers = new Smithers('https://jenkinsurl.com', config);
```

#### Username & password auth (config.auth required)
```javascript
import Smithers from 'smithers';

const smithers = new Smithers('https://jenkinsurl.com', {
    auth: {
        username: 'username',
        password: 'password'
    }
});
```

#### Username & token auth (config.auth required)
```javascript
import Smithers from 'smithers';

const smithers = new Smithers('https://jenkinsurl.com', {
    auth: {
        username: 'username',
        password: 'token'
    }
);
```


### Configuration
Configuration can be either passed when Smithers is instantiated or when a method is called.  The configuration is forwarded to the `axios` calls so look at the [axios documentation](https://github.com/mzabriskie/axios#request-config) to see the different options.

- **crumbIssuer** *(Boolean, default: false)*: Enables CSRF crumb support for post requests
- **timeout** *(Int, default: 5000)*: Request timeout in milliseconds


### Methods

*Note: These examples are using `async/await` but work perfectly with `.then` and `.catch` as well*

#### info([config])
Retrieves all data from the `/api/json` endpoint.
```javascript
await smithers.info();
```

#### job(name, [config])
Retrieves all data from a specific job
```javascript
await smithers.job(name);
```

#### build(name, [config])
Triggers a build for the specific job
```javascript
await smithers.build(name);
```

#### lastBuild(name, [config])
Retrieves all data from the latest build of a specifc job
```javascript
await smithers.lastBuild(name);
```

#### lastSuccessfulBuild(name, [config])
Retrieves all data from the latest successful build of a specifc job
```javascript
await smithers.lastSuccessfulBuild(name);
```

#### lastStableBuild(name, [config])
Retrieves all data from the latest stable build of a specifc job
```javascript
await smithers.lastStableBuild(name);
```

#### lastUnsuccessfulBuild(name, [config])
Retrieves all data from the latest unsuccessful build of a specifc job
```javascript
await smithers.lastUnsuccessfulBuild(name);
```

#### specificBuild(name, buildNumber, [config])
Retrieves all data for a specific build of a specifc job
```javascript
await smithers.specificBuild(name, buildNumber);
```

#### configXML(name, [config])
Retrieves the XML config of a specifc job
```javascript
await smithers.configXML(name);
```

#### overallLoad([config])
Retrieves statistics of the entire system (busy executors, queue length, etc...)
```javascript
await smithers.overallLoad();
```

#### queue([config])
Retrieves all data about the current queue
```javascript
await smithers.queue();
```
