import asyncWrapper from './utils/asyncWrapper';
import throwIfMissing from './utils/throwIfMissing';
import crumbIssuer from './utils/crumbIssuer';
import createPath from './utils/createPath';
import paths from './utils/paths';
import Caller from './Caller';

class Smithers {
    constructor(url, config) {
        this.url = url;
        this.config = config || {};

        if (this.config.crumbIssuer) {
            this.config.headers = this.config.headers || {};
            this.init = new Promise((resolve, reject) => {
                crumbIssuer(this.url, this.config).then((crumbResponse) => {
                    const { crumb, crumbRequestField } = crumbResponse;
                    this.config.headers[crumbRequestField] = crumb;
                    this.caller = new Caller(this.url, this.config);
                    resolve();
                }).catch((error) => {
                    reject(error);
                });
            });
        } else {
            this.init = Promise.resolve();
            this.caller = new Caller(this.url, this.config);
        }
    }

    getInfo(config) {
        return this.caller.get(paths.getInfo, config);
    }

    getJobInfo(name = throwIfMissing('name'), config) {
        const requestUrl = createPath(paths.getJobInfo, { name });
        return this.caller.get(requestUrl, config);
    }

    startBuild(name = throwIfMissing('name'), config) {
        const requestUrl = createPath(paths.startBuild, { name });
        return this.caller.post(requestUrl, config);
    }

    stopBuild(name = throwIfMissing('name'), buildNumber = throwIfMissing('buildNumber'), config) {
        const requestUrl = createPath(paths.stopBuild, { name, buildNumber });
        return this.caller.post(requestUrl, config);
    }

    getLastBuild(name = throwIfMissing('name'), config) {
        const requestUrl = createPath(paths.getLastBuild, { name });
        return this.caller.get(requestUrl, config);
    }

    getLastSuccessfulBuild(name = throwIfMissing('name'), config) {
        const requestUrl = createPath(paths.getLastSuccessfulBuild, { name });
        return this.caller.get(requestUrl, config);
    }

    getLastStableBuild(name = throwIfMissing('name'), config) {
        const requestUrl = createPath(paths.getLastStableBuild, { name });
        return this.caller.get(requestUrl, config);
    }

    getLastUnsuccessfulBuild(name = throwIfMissing('name'), config) {
        const requestUrl = createPath(paths.getLastUnsuccessfulBuild, { name });
        return this.caller.get(requestUrl, config);
    }

    getLastFailedBuild(name = throwIfMissing('name'), config) {
        const requestUrl = createPath(paths.getLastFailedBuild, { name });
        return this.caller.get(requestUrl, config);
    }

    getSpecificBuild(name = throwIfMissing('name'), buildNumber = throwIfMissing('buildNumber'), config) {
        const requestUrl = createPath(paths.getSpecificBuild, { name, buildNumber });
        return this.caller.get(requestUrl, config);
    }

    getConfigXML(name = throwIfMissing('name'), config) {
        const requestUrl = createPath(paths.getConfigXML, { name });
        return this.caller.get(requestUrl, config);
    }

    getOverallLoad(config) {
        return this.caller.get(paths.getOverallLoad, config);
    }

    getQueue(config) {
        return this.caller.get(paths.getQueue, config);
    }

    getView(view = 'All', config) {
        const requestUrl = createPath(paths.getView, { view });
        return this.caller.get(requestUrl, config);
    }

    restart(config) {
        return this.caller.post(paths.restart, config);
    }

    safeRestart(config) {
        return this.caller.post(paths.safeRestart, config);
    }

    startQuietDown(config) {
        return this.caller.post(paths.startQuietDown, config);
    }

    stopQuietDown(config) {
        return this.caller.post(paths.stopQuietDown, config);
    }

    getWhoAmI(config) {
        return this.caller.get(paths.getWhoAmI, config);
    }
}

export default asyncWrapper(Smithers);
