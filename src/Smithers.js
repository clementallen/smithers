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
}
