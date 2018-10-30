# Smithers

Async Jenkins API client for browsers and node

[![npm version](https://badge.fury.io/js/smithers.svg)](https://badge.fury.io/js/smithers)
[![Build Status](https://travis-ci.org/clementallen/smithers.svg?branch=master)](https://travis-ci.org/clementallen/smithers)
[![Coverage Status](https://coveralls.io/repos/github/clementallen/smithers/badge.svg?branch=master)](https://coveralls.io/github/clementallen/smithers?branch=master)
[![dependencies Status](https://david-dm.org/clementallen/smithers/status.svg)](https://david-dm.org/clementallen/smithers)
[![devDependencies Status](https://david-dm.org/clementallen/smithers/dev-status.svg)](https://david-dm.org/clementallen/smithers?type=dev)
[![Black Duck Security Risk](https://copilot.blackducksoftware.com/github/repos/clementallen/smithers/branches/master/badge-risk.svg)](https://copilot.blackducksoftware.com/github/repos/clementallen/smithers/branches/master)
[![Greenkeeper badge](https://badges.greenkeeper.io/clementallen/smithers.svg)](https://greenkeeper.io/)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fclementallen%2Fsmithers.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fclementallen%2Fsmithers?ref=badge_shield)

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

- **crumbIssuer** `Boolean` `default=false`: Enables CSRF crumb support for post requests
- **timeout** `Number` `default=5000`: Request timeout in milliseconds


### Methods

*Note: These examples are using `async/await` but work perfectly with `.then` and `.catch` as well*

#### getInfo()
* **config** `Object` optional

Retrieves all data from the `/api/json` endpoint.
```javascript
await smithers.getInfo([config]);
```

#### getJobInfo()
* **jobName** `String` **required**
* **config** `Object` optional

Retrieves all data from a specific job
```javascript
await smithers.getJobInfo(jobName, [config]);
```

#### startBuild()
* **jobName** `String` **required**
* **config** `Object` optional

Triggers a build for the specific job
```javascript
await smithers.startBuild(jobName, [config]);
```

#### stopBuild()
* **jobName** `String` **required**
* **buildNumber** `Number` **required**
* **config** `Object` optional

Stops the build of a specifc job
```javascript
await smithers.stopBuild(jobName, buildNumber, [config]);
```

#### getLastBuild()
* **jobName** `String` **required**
* **config** `Object` optional

Retrieves all data from the latest build of a specifc job
```javascript
await smithers.getLastBuild(jobName, [config]);
```

#### getLastSuccessfulBuild()
* **jobName** `String` **required**
* **config** `Object` optional

Retrieves all data from the latest successful build of a specifc job
```javascript
await smithers.getLastSuccessfulBuild(jobName, [config]);
```

#### getLastStableBuild()
* **jobName** `String` **required**
* **config** `Object` optional

Retrieves all data from the latest stable build of a specifc job
```javascript
await smithers.getLastStableBuild(jobName, [config]);
```

#### getLastUnsuccessfulBuild()
* **jobName** `String` **required**
* **config** `Object` optional

Retrieves all data from the latest unsuccessful build of a specifc job
```javascript
await smithers.getLastUnsuccessfulBuild(jobName, [config]);
```

#### getLastFailedBuild()
* **jobName** `String` **required**
* **config** `Object` optional

Retrieves all data from the latest unsuccessful build of a specifc job
```javascript
await smithers.getLastFailedBuild(jobName, [config]);
```

#### getSpecificBuild()
* **jobName** `String` **required**
* **buildNumber** `Number` **required**
* **config** `Object` optional

Retrieves all data for a specific build of a specifc job
```javascript
await smithers.getSpecificBuild(jobName, buildNumber, [config]);
```

#### getConfigXML()
* **jobName** `String` **required**
* **config** `Object` optional

Retrieves the XML config of a specifc job
```javascript
await smithers.getConfigXML(jobName, [config]);
```

#### getOverallLoad()
* **config** `Object` optional

Retrieves statistics of the entire system (busy executors, queue length, etc...)
```javascript
await smithers.getOverallLoad([config]);
```

#### getQueue()
* **config** `Object` optional

Retrieves all data about the current queue
```javascript
await smithers.getQueue([config]);
```

#### getView()
* **viewName** `String` `default='All'` optional
* **config** `Object` optional

Retrieves all data about a specific view or the default view of 'All'
```javascript
await smithers.getView(viewName, [config]);
```

#### restart()
* **config** `Object` optional

Restarts Jenkins
```javascript
await smithers.restart([config]);
```

#### safeRestart()
* **config** `Object` optional

Restarts Jenkins once no jobs are running
```javascript
await smithers.safeRestart([config]);
```

#### startQuietDown()
* **config** `Object` optional

Starts "quiet down" mode
```javascript
await smithers.startQuietDown([config]);
```

#### stopQuietDown()
* **config** `Object` optional

Stops "quiet down" mode
```javascript
await smithers.stopQuietDown([config]);
```


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fclementallen%2Fsmithers.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fclementallen%2Fsmithers?ref=badge_large)