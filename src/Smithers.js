import createPath from './utils/createPath';
import paths from './utils/paths';
import Caller from './Caller';

export default class Smithers {
    constructor(url, config = {}) {
        this.url = url;
        this.config = config;
        this.Caller = new Caller(this.url);
    }

    info() {
        return new Promise((resolve, reject) => {
            this.Caller.receive(paths.info).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    jobInfo(name) {
        return new Promise((resolve, reject) => {
            const requestUrl = createPath(paths.jobInfo, { name });
            this.Caller.receive(requestUrl).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            })
        })
    }
}
