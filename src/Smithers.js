import createPath from './utils/createPath';
import paths from './utils/paths';
import Caller from './Caller';

export default class Smithers {
    constructor(url, config) {
        this.url = url;
        this.config = config || {};
        this.caller = new Caller(this.url, this.config);
    }

    info(config) {
        return this.caller.get(paths.info, config);
    }

    jobInfo(name, config) {
        const requestUrl = createPath(paths.jobInfo, { name });
        return this.caller.get(requestUrl, config);
    }

    latestBuildInfo(name, config) {
        const requestUrl = createPath(paths.latestBuildInfo, { name });
        return this.caller.get(requestUrl, config);
    }
}
