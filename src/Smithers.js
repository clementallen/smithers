import createPath from './utils/createPath';
import paths from './utils/paths';
import Caller from './Caller';

export default class Smithers {
    constructor(url, config) {
        this.url = url;
        this.config = config || {};
        this.Caller = new Caller(this.url, this.config);
    }

    info(config) {
        return new Promise((resolve, reject) => {
            this.Caller.get(paths.info, config).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    jobInfo(name, config) {
        return new Promise((resolve, reject) => {
            const requestUrl = createPath(paths.jobInfo, { name });
            this.Caller.get(requestUrl, config).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    latestBuildInfo(name, config) {
        return new Promise((resolve, reject) => {
            const requestUrl = createPath(paths.latestBuildInfo, { name });
            this.Caller.get(requestUrl, config).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}
