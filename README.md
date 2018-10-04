# Smithers

Async Jenkins API client for browsers and node

[![npm version](https://badge.fury.io/js/smithers.svg)](https://badge.fury.io/js/smithers)
[![Build Status](https://travis-ci.org/clementallen/smithers.svg?branch=master)](https://travis-ci.org/clementallen/smithers)
[![Coverage Status](https://coveralls.io/repos/github/clementallen/smithers/badge.svg?branch=master)](https://coveralls.io/github/clementallen/smithers?branch=master)
[![dependencies Status](https://david-dm.org/clementallen/smithers/status.svg)](https://david-dm.org/clementallen/smithers)
[![devDependencies Status](https://david-dm.org/clementallen/smithers/dev-status.svg)](https://david-dm.org/clementallen/smithers?type=dev)
[![Black Duck Security Risk](https://copilot.blackducksoftware.com/github/repos/clementallen/smithers/branches/master/badge-risk.svg)](https://copilot.blackducksoftware.com/github/repos/clementallen/smithers/branches/master)
[![Greenkeeper badge](https://badges.greenkeeper.io/clementallen/smithers.svg)](https://greenkeeper.io/)

### **Note:** This package is under active development and while the version is less than 1.x.x all releases should be treated as containing breaking changes.

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

#### Username & password/token auth (config.auth required)
```javascript
import Smithers from 'smithers';

const smithers = new Smithers('https://jenkinsurl.com', {
    auth: {
        username: 'username',
        password: 'password/token'
    }
});
```


### Configuration
Configuration can be either passed when Smithers is instantiated or when a method is called.  The configuration is forwarded to the `axios` calls so look at the [axios documentation](https://github.com/mzabriskie/axios#request-config) to see the different options.

- **crumbIssuer** *(Boolean, default: false)*: Enables CSRF crumb support for post requests
- **timeout** *(Int, default: 5000)*: Request timeout in milliseconds


### Methods

*Note: These examples are using `async/await` but work perfectly with `.then` and `.catch` as well*

#### getInfo([config])
Retrieves all data from the `/api/json` endpoint.
```javascript
await smithers.getInfo();
```

#### getJobInfo(name, [config])
Retrieves all data from a specific job
```javascript
await smithers.getJobInfo(name);
```

#### startBuild(name, [config])
Triggers a build for the specific job
```javascript
await smithers.startBuild(name);
```

#### getLastBuild(name, [config])
Retrieves all data from the latest build of a specifc job
```javascript
await smithers.getLastBuild(name);
```

#### getLastSuccessfulBuild(name, [config])
Retrieves all data from the latest successful build of a specifc job
```javascript
await smithers.getLastSuccessfulBuild(name);
```

#### getLastStableBuild(name, [config])
Retrieves all data from the latest stable build of a specifc job
```javascript
await smithers.getLastStableBuild(name);
```

#### getLastUnsuccessfulBuild(name, [config])
Retrieves all data from the latest unsuccessful build of a specifc job
```javascript
await smithers.getLastUnsuccessfulBuild(name);
```

#### getLastFailedBuild(name, [config])
Retrieves all data from the latest unsuccessful build of a specifc job
```javascript
await smithers.getLastFailedBuild(name);
```

#### getSpecificBuild(name, buildNumber, [config])
Retrieves all data for a specific build of a specifc job
```javascript
await smithers.getSpecificBuild(name, buildNumber);
```

#### getConfigXML(name, [config])
Retrieves the XML config of a specifc job
```javascript
await smithers.getConfigXML(name);
```

#### getOverallLoad([config])
Retrieves statistics of the entire system (busy executors, queue length, etc...)
```javascript
await smithers.getOverallLoad();
```

#### getQueue([config])
Retrieves all data about the current queue
```javascript
await smithers.getQueue();
```
