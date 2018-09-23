import asyncWrapper from './utils/asyncWrapper';
import crumbIssuer from './utils/crumbIssuer';
import createPath from './utils/createPath';
import paths from './utils/paths';
import Caller from './Caller';

class Smithers {
    constructor(url, config) {
        this.url = url;
        this.config = config || {};

        if (this.config.crumbIssuer) {
            this.config.headers = {};
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

    info(config) {
        return this.caller.get(paths.info, config);
    }

    job(name, config) {
        const requestUrl = createPath(paths.job, { name });
        return this.caller.get(requestUrl, config);
    }

    build(name, config) {
        const requestUrl = createPath(paths.build, { name });
        return this.caller.post(requestUrl, config);
    }

    lastBuild(name, config) {
        const requestUrl = createPath(paths.lastBuild, { name });
        return this.caller.get(requestUrl, config);
    }

    lastSuccessfulBuild(name, config) {
        const requestUrl = createPath(paths.lastSuccessfulBuild, { name });
        return this.caller.get(requestUrl, config);
    }

    lastStableBuild(name, config) {
        const requestUrl = createPath(paths.lastStableBuild, { name });
        return this.caller.get(requestUrl, config);
    }

    lastUnsuccessfulBuild(name, config) {
        const requestUrl = createPath(paths.lastUnsuccessfulBuild, { name });
        return this.caller.get(requestUrl, config);
    }

    lastFailedBuild(name, config) {
        const requestUrl = createPath(paths.lastFailedBuild, { name });
        return this.caller.get(requestUrl, config);
    }

    specificBuild(name, buildNumber, config) {
        const requestUrl = createPath(paths.specificBuild, { name, buildNumber });
        return this.caller.get(requestUrl, config);
    }

    configXML(name, config) {
        const requestUrl = createPath(paths.configXML, { name });
        return this.caller.get(requestUrl, config);
    }

    overallLoad(config) {
        return this.caller.get(paths.overallLoad, config);
    }

    queue(config) {
        return this.caller.get(paths.queue, config);
    }
}

export default asyncWrapper(Smithers);
