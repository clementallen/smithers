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

    job(name, config) {
        const requestUrl = createPath(paths.job, { name });
        return this.caller.get(requestUrl, config);
    }

    lastBuild(name, config) {
        const requestUrl = createPath(paths.lastBuild, { name });
        return this.caller.get(requestUrl, config);
    }
}
